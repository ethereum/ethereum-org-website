---
title: "Khởi chạy nút Ethereum của riêng bạn"
description: "Giới thiệu chung về việc chạy phiên bản máy khách Ethereum của riêng bạn."
lang: vi
sidebarDepth: 2
---

Việc chạy nút của riêng bạn mang lại nhiều lợi ích, mở ra những khả năng mới và giúp hỗ trợ hệ sinh thái. Trang này sẽ hướng dẫn bạn cách khởi chạy nút của riêng mình và tham gia vào việc xác thực các giao dịch [Ethereum](/).

Lưu ý rằng sau [The Merge](/roadmap/merge), cần có hai máy khách để chạy một nút Ethereum; một máy khách **lớp thực thi (EL)** và một ứng dụng khách **lớp đồng thuận (CL)**. Trang này sẽ chỉ cho bạn cách cài đặt, cấu hình và kết nối hai máy khách này để chạy một nút Ethereum.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu nút Ethereum là gì và tại sao bạn có thể muốn chạy một máy khách. Điều này được đề cập trong phần [Nút và máy khách](/developers/docs/nodes-and-clients/).

Nếu bạn mới làm quen với chủ đề chạy một nút hoặc đang tìm kiếm một lộ trình ít mang tính kỹ thuật hơn, chúng tôi khuyên bạn trước tiên nên xem phần giới thiệu thân thiện với người dùng của chúng tôi về [việc chạy một nút Ethereum](/run-a-node).

## Chọn một phương pháp tiếp cận {#choosing-approach}

Bước đầu tiên trong việc khởi chạy nút của bạn là chọn phương pháp tiếp cận. Dựa trên các yêu cầu và nhiều khả năng khác nhau, bạn phải chọn việc triển khai máy khách (của cả máy khách thực thi và ứng dụng khách đồng thuận), môi trường (phần cứng, hệ thống) và các tham số cho cài đặt máy khách.

Trang này sẽ hướng dẫn bạn qua các quyết định này và giúp bạn tìm ra cách phù hợp nhất để chạy phiên bản Ethereum của mình.

Để chọn từ các triển khai máy khách, hãy xem tất cả các [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients), [ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients) đã sẵn sàng cho Mạng chính và tìm hiểu về [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity).

Quyết định xem có nên chạy phần mềm trên [phần cứng của riêng bạn hay trên đám mây](#local-vs-cloud), có tính đến các [yêu cầu](#requirements) của máy khách.

Sau khi chuẩn bị môi trường, hãy cài đặt các máy khách đã chọn bằng [giao diện thân thiện với người mới bắt đầu](#automatized-setup) hoặc [thủ công](#manual-setup) bằng cách sử dụng terminal với các tùy chọn nâng cao.

Khi nút đang chạy và đồng bộ hóa, bạn đã sẵn sàng để [sử dụng nó](#using-the-node), nhưng hãy đảm bảo để mắt đến việc [bảo trì](#operating-the-node) nó.

![Client setup](./diagram.png)

### Môi trường và phần cứng {#environment-and-hardware}

#### Cục bộ hoặc đám mây {#local-vs-cloud}

Các máy khách Ethereum có thể chạy trên các máy tính cấp độ người tiêu dùng và không yêu cầu bất kỳ phần cứng đặc biệt nào, ví dụ như máy khai thác. Do đó, bạn có nhiều tùy chọn khác nhau để triển khai nút dựa trên nhu cầu của mình.
Để đơn giản hóa, hãy nghĩ về việc chạy một nút trên cả máy vật lý cục bộ và máy chủ đám mây:

- Đám mây
  - Các nhà cung cấp cung cấp thời gian hoạt động của máy chủ cao và địa chỉ IP công cộng tĩnh
  - Việc có được máy chủ chuyên dụng hoặc máy chủ ảo có thể thoải mái hơn so với việc tự xây dựng
  - Sự đánh đổi là phải tin tưởng vào bên thứ ba - nhà cung cấp máy chủ
  - Do kích thước lưu trữ cần thiết cho nút đầy đủ, giá của một máy chủ thuê có thể trở nên cao
- Phần cứng riêng
  - Phương pháp tiếp cận không cần tin cậy và có chủ quyền hơn
  - Đầu tư một lần
  - Một tùy chọn để mua các máy đã được cấu hình sẵn
  - Bạn phải chuẩn bị vật lý, bảo trì và có khả năng khắc phục sự cố cho máy và mạng lưới

Cả hai tùy chọn đều có những ưu điểm khác nhau được tóm tắt ở trên. Nếu bạn đang tìm kiếm một giải pháp đám mây, ngoài nhiều nhà cung cấp điện toán đám mây truyền thống, còn có các dịch vụ tập trung vào việc triển khai các nút. Hãy xem [nút như một dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service/) để biết thêm các tùy chọn về các nút được lưu trữ.

#### Phần cứng {#hardware}

Tuy nhiên, một mạng lưới phi tập trung, chống kiểm duyệt không nên phụ thuộc vào các nhà cung cấp đám mây. Thay vào đó, việc chạy nút trên phần cứng cục bộ của riêng bạn sẽ lành mạnh hơn cho hệ sinh thái. Các [ước tính](https://www.ethernodes.org/networkType/cl/Hosting) cho thấy một tỷ lệ lớn các nút chạy trên đám mây, điều này có thể trở thành một điểm lỗi duy nhất.

Các máy khách Ethereum có thể chạy trên máy tính, máy tính xách tay, máy chủ hoặc thậm chí là máy tính bo mạch đơn của bạn. Mặc dù có thể chạy các máy khách trên máy tính cá nhân của bạn, nhưng việc có một máy chuyên dụng chỉ dành cho nút của bạn có thể nâng cao đáng kể hiệu suất và tính bảo mật của nó trong khi giảm thiểu tác động đến máy tính chính của bạn.

Việc sử dụng phần cứng của riêng bạn có thể rất dễ dàng. Có nhiều tùy chọn đơn giản cũng như các thiết lập nâng cao cho những người am hiểu kỹ thuật hơn. Vì vậy, hãy xem xét các yêu cầu và phương tiện để chạy các máy khách Ethereum trên máy của bạn.

#### Yêu cầu {#requirements}

Yêu cầu phần cứng khác nhau tùy theo máy khách nhưng nhìn chung không quá cao vì nút chỉ cần duy trì đồng bộ hóa. Đừng nhầm lẫn nó với việc khai thác, vốn đòi hỏi nhiều sức mạnh tính toán hơn. Tuy nhiên, thời gian đồng bộ hóa và hiệu suất sẽ cải thiện với phần cứng mạnh mẽ hơn.

Trước khi cài đặt bất kỳ máy khách nào, vui lòng đảm bảo máy tính của bạn có đủ tài nguyên để chạy nó. Bạn có thể tìm thấy các yêu cầu tối thiểu và được khuyến nghị bên dưới.

Nút thắt cổ chai đối với phần cứng của bạn chủ yếu là dung lượng ổ đĩa. Việc đồng bộ hóa Chuỗi khối Ethereum đòi hỏi rất nhiều thao tác đọc/ghi (input/output) và cần nhiều dung lượng. Tốt nhất là có một **ổ cứng thể rắn (SSD)** với hàng trăm GB dung lượng trống để dự phòng ngay cả sau khi đồng bộ hóa.

Kích thước của cơ sở dữ liệu và tốc độ đồng bộ hóa ban đầu phụ thuộc vào máy khách được chọn, cấu hình của nó và [chiến lược đồng bộ hóa](/developers/docs/nodes-and-clients/#sync-modes).

Ngoài ra, hãy đảm bảo kết nối internet của bạn không bị giới hạn bởi [giới hạn băng thông](https://wikipedia.org/wiki/Data_cap). Bạn nên sử dụng kết nối không giới hạn dung lượng vì quá trình đồng bộ hóa ban đầu và dữ liệu được phát sóng lên mạng lưới có thể vượt quá giới hạn của bạn.

##### Hệ điều hành
Tất cả các máy khách đều hỗ trợ các hệ điều hành chính - Linux, macOS, Windows. Điều này có nghĩa là bạn có thể chạy các nút trên máy tính để bàn hoặc máy chủ thông thường với hệ điều hành (OS) phù hợp với bạn nhất. Đảm bảo hệ điều hành của bạn được cập nhật để tránh các sự cố tiềm ẩn và lỗ hổng bảo mật.

##### Yêu cầu tối thiểu
- CPU có 2 lõi trở lên
- 8 GB RAM
- SSD 2TB
- Băng thông 10+ MBit/s

##### Thông số kỹ thuật được khuyến nghị
- CPU nhanh có 4 lõi trở lên
- 16 GB+ RAM
- SSD nhanh có 2+TB
- Băng thông 25+ MBit/s

Chế độ đồng bộ hóa và máy khách bạn chọn sẽ ảnh hưởng đến yêu cầu về dung lượng, nhưng chúng tôi đã ước tính dung lượng ổ đĩa bạn sẽ cần cho mỗi máy khách bên dưới.

| Máy khách  | Kích thước ổ đĩa (đồng bộ hóa snap) | Kích thước ổ đĩa (lưu trữ đầy đủ) |
| ---------- | ----------------------------------- | --------------------------------- |
| Besu       | 800GB+                              | 12TB+                             |
| Erigon     | N/A                                 | 2.5TB+                            |
| Geth       | 500GB+                              | 12TB+                             |
| Nethermind | 500GB+                              | 12TB+                             |
| Reth       | N/A                                 | 2.2TB+                            |

- Lưu ý: Erigon và Reth không cung cấp đồng bộ hóa snap, nhưng có thể Cắt tỉa Đầy đủ (Full Pruning) (\~2TB cho Erigon, ~1.2TB cho Reth)

Đối với các ứng dụng khách đồng thuận, yêu cầu về dung lượng cũng phụ thuộc vào việc triển khai máy khách và các tính năng được bật (ví dụ: người cắt giảm trình xác thực) nhưng nhìn chung cần thêm 200GB cho dữ liệu beacon. Với số lượng lớn các trình xác thực, tải băng thông cũng tăng lên. Bạn có thể tìm thấy [chi tiết về các yêu cầu của ứng dụng khách đồng thuận trong phân tích này](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Các giải pháp cắm và chạy (Plug-and-play) {#plug-and-play}

Tùy chọn dễ nhất để chạy một nút với phần cứng của riêng bạn là sử dụng các hộp cắm và chạy. Các máy được cấu hình sẵn từ các nhà cung cấp mang lại trải nghiệm đơn giản nhất: đặt hàng, kết nối, chạy. Mọi thứ đều được cấu hình sẵn và chạy tự động với hướng dẫn trực quan và bảng điều khiển để theo dõi và kiểm soát phần mềm.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum trên máy tính bo mạch đơn {#ethereum-on-a-single-board-computer}

Một cách dễ dàng và rẻ tiền để chạy một nút Ethereum là sử dụng máy tính bo mạch đơn, ngay cả với kiến trúc ARM như Raspberry Pi. [Ethereum trên ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) cung cấp các hình ảnh dễ chạy của nhiều máy khách thực thi và ứng dụng khách đồng thuận cho Raspberry Pi và các bo mạch ARM khác.

Các thiết bị nhỏ, giá cả phải chăng và hiệu quả như thế này rất lý tưởng để chạy một nút tại nhà nhưng hãy ghi nhớ hiệu suất hạn chế của chúng.

## Khởi chạy nút {#spinning-up-node}

Việc thiết lập máy khách thực tế có thể được thực hiện bằng các trình khởi chạy tự động hoặc thủ công, thiết lập phần mềm máy khách trực tiếp.

Đối với những người dùng ít kinh nghiệm hơn, phương pháp được khuyến nghị là sử dụng trình khởi chạy, phần mềm hướng dẫn bạn qua quá trình cài đặt và tự động hóa quá trình thiết lập máy khách. Tuy nhiên, nếu bạn có một số kinh nghiệm sử dụng terminal, các bước thiết lập thủ công sẽ rất dễ làm theo.

### Thiết lập có hướng dẫn {#automatized-setup}

Nhiều dự án thân thiện với người dùng nhằm mục đích cải thiện trải nghiệm thiết lập máy khách. Các trình khởi chạy này cung cấp cài đặt và cấu hình máy khách tự động, với một số thậm chí còn cung cấp giao diện đồ họa để thiết lập có hướng dẫn và theo dõi các máy khách.

Dưới đây là một vài dự án có thể giúp bạn cài đặt và kiểm soát các máy khách chỉ với vài cú nhấp chuột:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode không chỉ đi kèm với một máy từ nhà cung cấp. Phần mềm, trình khởi chạy nút thực tế và trung tâm điều khiển với nhiều tính năng có thể được sử dụng trên phần cứng tùy ý.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Cách nhanh nhất và dễ nhất để thiết lập một nút đầy đủ. Công cụ thiết lập một dòng lệnh và TUI quản lý nút. Miễn phí. Mã nguồn mở. Hàng hóa công cộng cho Ethereum bởi những người đặt cọc độc lập. Hỗ trợ ARM64 và AMD64.
- [eth-docker](https://eth-docker.net/) - Thiết lập tự động sử dụng Docker tập trung vào việc đặt cọc dễ dàng và an toàn, yêu cầu kiến thức cơ bản về terminal và Docker, được khuyến nghị cho những người dùng nâng cao hơn một chút.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Trình khởi chạy để cài đặt các máy khách trên máy chủ từ xa thông qua kết nối SSH với hướng dẫn thiết lập GUI, trung tâm điều khiển và nhiều tính năng khác.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Công cụ thiết lập nút tự động tạo cấu hình Docker bằng trình hướng dẫn CLI. Được viết bằng Go bởi Nethermind.
- [Chainstack Self-Hosted](https://docs.chainstack.com/docs/self-hosted/introduction) - Web UI và CLI để triển khai các máy khách thực thi và ứng dụng khách đồng thuận trên Kubernetes. Bao gồm khởi động Snapshot và giám sát tích hợp. Miễn phí. Không yêu cầu tài khoản Chainstack. Được xây dựng bởi Chainstack.

### Thiết lập máy khách thủ công {#manual-setup}

Tùy chọn khác là tải xuống, xác minh và cấu hình phần mềm máy khách theo cách thủ công. Ngay cả khi một số máy khách cung cấp giao diện đồ họa, việc thiết lập thủ công vẫn yêu cầu các kỹ năng cơ bản với terminal nhưng mang lại tính linh hoạt cao hơn nhiều.

Như đã giải thích trước đó, việc thiết lập nút Ethereum của riêng bạn sẽ yêu cầu chạy một cặp ứng dụng khách đồng thuận và máy khách thực thi. Một số máy khách có thể bao gồm một máy khách nhẹ của loại kia và đồng bộ hóa mà không cần bất kỳ phần mềm nào khác. Tuy nhiên, việc xác minh không cần tin cậy đầy đủ yêu cầu cả hai triển khai.

#### Lấy phần mềm máy khách {#getting-the-client}

Đầu tiên, bạn cần lấy phần mềm [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) và [ứng dụng khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients) ưa thích của mình.

Bạn có thể chỉ cần tải xuống một ứng dụng thực thi hoặc gói cài đặt phù hợp với hệ điều hành và kiến trúc của mình. Luôn xác minh chữ ký và tổng kiểm tra (checksum) của các gói đã tải xuống. Một số máy khách cũng cung cấp các kho lưu trữ hoặc hình ảnh Docker để cài đặt và cập nhật dễ dàng hơn. Tất cả các máy khách đều là mã nguồn mở, vì vậy bạn cũng có thể xây dựng chúng từ mã nguồn. Đây là một phương pháp nâng cao hơn, nhưng trong một số trường hợp, nó có thể được yêu cầu.

Hướng dẫn cài đặt từng máy khách được cung cấp trong tài liệu được liên kết trong danh sách máy khách ở trên.

Dưới đây là các trang phát hành của các máy khách nơi bạn có thể tìm thấy các tệp nhị phân được tạo sẵn của chúng hoặc hướng dẫn cài đặt:

##### Máy khách thực thi
- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Cũng cần lưu ý rằng sự đa dạng máy khách là một [vấn đề trên lớp thực thi](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Độc giả được khuyến nghị nên xem xét việc chạy một máy khách thực thi thiểu số.

##### Ứng dụng khách đồng thuận
- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Không cung cấp tệp nhị phân được tạo sẵn, chỉ có hình ảnh Docker hoặc phải được xây dựng từ mã nguồn)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity/) rất quan trọng đối với các nút đồng thuận chạy các trình xác thực. Nếu phần lớn các trình xác thực đang chạy một triển khai máy khách duy nhất, bảo mật mạng lưới sẽ gặp rủi ro. Do đó, bạn nên xem xét việc chọn một máy khách thiểu số.

[Xem mức sử dụng máy khách mạng lưới mới nhất](https://clientdiversity.org/) và tìm hiểu thêm về [sự đa dạng máy khách](/developers/docs/nodes-and-clients/client-diversity).

##### Xác minh phần mềm
Khi tải xuống phần mềm từ internet, bạn nên xác minh tính toàn vẹn của nó. Bước này là tùy chọn nhưng đặc biệt với phần cơ sở hạ tầng quan trọng như máy khách Ethereum, điều quan trọng là phải nhận thức được các vectơ tấn công tiềm ẩn và tránh chúng. Nếu bạn đã tải xuống một tệp nhị phân được tạo sẵn, bạn cần phải tin tưởng nó và có nguy cơ kẻ tấn công có thể hoán đổi tệp thực thi bằng một tệp độc hại.

Các nhà phát triển ký các tệp nhị phân được phát hành bằng khóa PGP của họ để bạn có thể xác minh bằng mật mã rằng bạn đang chạy chính xác phần mềm mà họ đã tạo. Bạn chỉ cần lấy các khóa công khai được sử dụng bởi các nhà phát triển, có thể tìm thấy trên các trang phát hành máy khách hoặc trong tài liệu. Sau khi tải xuống bản phát hành máy khách và chữ ký của nó, bạn có thể sử dụng một triển khai PGP, ví dụ: [GnuPG](https://gnupg.org/download/index.html) để dễ dàng xác minh chúng. Hãy xem hướng dẫn về cách xác minh phần mềm mã nguồn mở bằng cách sử dụng `gpg` trên [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) hoặc [Windows/macOS](https://freedom.press/training/verifying-open-source-software/).

Một hình thức xác minh khác là đảm bảo rằng mã băm, một dấu vân tay mật mã duy nhất, của phần mềm bạn đã tải xuống khớp với mã băm do các nhà phát triển cung cấp. Điều này thậm chí còn dễ dàng hơn việc sử dụng PGP và một số máy khách chỉ cung cấp tùy chọn này. Chỉ cần chạy hàm băm trên phần mềm đã tải xuống và so sánh nó với hàm băm từ trang phát hành. Ví dụ:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Thiết lập máy khách {#client-setup}

Sau khi cài đặt, tải xuống hoặc biên dịch phần mềm máy khách, bạn đã sẵn sàng để chạy nó. Điều này chỉ có nghĩa là nó phải được thực thi với cấu hình phù hợp. Các máy khách cung cấp các tùy chọn cấu hình phong phú, có thể kích hoạt nhiều tính năng khác nhau.

Hãy bắt đầu với các tùy chọn có thể ảnh hưởng đáng kể đến hiệu suất máy khách và việc sử dụng dữ liệu. [Các chế độ đồng bộ hóa](/developers/docs/nodes-and-clients/#sync-modes) đại diện cho các phương pháp khác nhau để tải xuống và xác thực dữ liệu Chuỗi khối. Trước khi bắt đầu nút, bạn nên quyết định sử dụng mạng lưới và chế độ đồng bộ hóa nào. Những điều quan trọng nhất cần xem xét là dung lượng ổ đĩa và thời gian đồng bộ hóa mà máy khách sẽ cần. Hãy chú ý đến tài liệu của máy khách để xác định chế độ đồng bộ hóa nào là mặc định. Nếu điều đó không phù hợp với bạn, hãy chọn một chế độ khác dựa trên mức độ bảo mật, dữ liệu có sẵn và chi phí. Ngoài thuật toán đồng bộ hóa, bạn cũng có thể thiết lập việc cắt tỉa các loại dữ liệu cũ khác nhau. Việc cắt tỉa cho phép xóa dữ liệu lỗi thời, tức là loại bỏ các nút trie trạng thái không thể truy cập được từ các khối gần đây.

Các tùy chọn cấu hình cơ bản khác là, ví dụ: chọn mạng lưới - Mạng chính hoặc các mạng thử nghiệm, bật điểm cuối HTTP cho RPC hoặc WebSockets, v.v. Bạn có thể tìm thấy tất cả các tính năng và tùy chọn trong tài liệu của máy khách. Các cấu hình máy khách khác nhau có thể được thiết lập bằng cách thực thi máy khách với các cờ tương ứng trực tiếp trong CLI hoặc tệp cấu hình. Mỗi máy khách có một chút khác biệt; vui lòng luôn tham khảo tài liệu chính thức hoặc trang trợ giúp của nó để biết chi tiết về các tùy chọn cấu hình.

Đối với mục đích thử nghiệm, bạn có thể muốn chạy một máy khách trên một trong các mạng thử nghiệm. [Xem tổng quan về các mạng lưới được hỗ trợ](/developers/docs/nodes-and-clients/#execution-clients).

Các ví dụ về việc chạy các máy khách thực thi với cấu hình cơ bản có thể được tìm thấy trong phần tiếp theo.

#### Khởi động máy khách thực thi {#starting-the-execution-client}

Trước khi khởi động phần mềm máy khách Ethereum, hãy thực hiện kiểm tra lần cuối xem môi trường của bạn đã sẵn sàng chưa. Ví dụ: đảm bảo:

- Có đủ dung lượng ổ đĩa khi xem xét mạng lưới và chế độ đồng bộ hóa đã chọn.
- Bộ nhớ và CPU không bị tạm dừng bởi các chương trình khác.
- Hệ điều hành được cập nhật lên phiên bản mới nhất.
- Hệ thống có ngày và giờ chính xác.
- Bộ định tuyến và tường lửa của bạn chấp nhận các kết nối trên các cổng lắng nghe. Theo mặc định, các máy khách Ethereum sử dụng cổng lắng nghe (TCP) và cổng khám phá (UDP), cả hai đều ở cổng 30303 theo mặc định.

Chạy máy khách của bạn trên một mạng thử nghiệm trước để giúp đảm bảo mọi thứ hoạt động chính xác.

Bạn cần khai báo bất kỳ cài đặt máy khách nào không phải là mặc định khi bắt đầu. Bạn có thể sử dụng các cờ hoặc tệp cấu hình để khai báo cấu hình ưa thích của mình. Tập hợp các tính năng và cú pháp cấu hình của mỗi máy khách là khác nhau. Hãy xem tài liệu của máy khách của bạn để biết chi tiết cụ thể.

Các máy khách thực thi và ứng dụng khách đồng thuận giao tiếp thông qua một điểm cuối được xác thực được chỉ định trong [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Để kết nối với một ứng dụng khách đồng thuận, máy khách thực thi phải tạo một [`jwtsecret`](https://jwt.io/) tại một đường dẫn đã biết. Vì lý do bảo mật và ổn định, các máy khách nên chạy trên cùng một máy và cả hai máy khách phải biết đường dẫn này vì nó được sử dụng để xác thực kết nối RPC cục bộ giữa chúng. Máy khách thực thi cũng phải xác định một cổng lắng nghe cho các API được xác thực.

Token này được tạo tự động bởi phần mềm máy khách, nhưng trong một số trường hợp, bạn có thể cần tự làm điều đó. Bạn có thể tạo nó bằng cách sử dụng [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Chạy một máy khách thực thi {#running-an-execution-client}

Phần này sẽ hướng dẫn bạn cách khởi động các máy khách thực thi. Nó chỉ đóng vai trò như một ví dụ về cấu hình cơ bản, sẽ khởi động máy khách với các cài đặt này:

- Chỉ định mạng lưới để kết nối, Mạng chính trong các ví dụ của chúng tôi
  - Thay vào đó, bạn có thể chọn [một trong các mạng thử nghiệm](/developers/docs/networks/) để kiểm tra sơ bộ thiết lập của mình
- Xác định thư mục dữ liệu, nơi tất cả dữ liệu bao gồm Chuỗi khối sẽ được lưu trữ
  - Đảm bảo thay thế đường dẫn bằng một đường dẫn thực, ví dụ: trỏ đến ổ đĩa ngoài của bạn
- Bật các giao diện để giao tiếp với máy khách
  - Bao gồm JSON-RPC và Engine API để giao tiếp với ứng dụng khách đồng thuận
- Xác định đường dẫn đến `jwtsecret` cho API được xác thực
  - Đảm bảo thay thế đường dẫn ví dụ bằng một đường dẫn thực có thể được truy cập bởi các máy khách, ví dụ: `/tmp/jwtsecret`

Xin lưu ý rằng đây chỉ là một ví dụ cơ bản, tất cả các cài đặt khác sẽ được đặt thành mặc định. Hãy chú ý đến tài liệu của từng máy khách để tìm hiểu về các giá trị mặc định, cài đặt và tính năng. Để biết thêm các tính năng, ví dụ như để chạy các trình xác thực, giám sát, v.v., vui lòng tham khảo tài liệu của máy khách cụ thể.

> Lưu ý rằng dấu gạch chéo ngược `\` trong các ví dụ chỉ nhằm mục đích định dạng; các cờ cấu hình có thể được xác định trong một dòng duy nhất.

##### Chạy Besu
Ví dụ này khởi động Besu trên Mạng chính, lưu trữ dữ liệu Chuỗi khối ở định dạng mặc định tại `/data/ethereum`, bật JSON-RPC và Engine RPC để kết nối ứng dụng khách đồng thuận. Engine API được xác thực bằng token `jwtsecret` và chỉ cho phép các lệnh gọi từ `localhost`.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu cũng đi kèm với một tùy chọn trình khởi chạy sẽ hỏi một loạt câu hỏi và tạo tệp cấu hình. Chạy trình khởi chạy tương tác bằng cách sử dụng:

```sh
besu --Xlauncher
```

[Tài liệu của Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) chứa các tùy chọn bổ sung và chi tiết cấu hình.

##### Chạy Erigon
Ví dụ này khởi động Erigon trên Mạng chính, lưu trữ dữ liệu Chuỗi khối tại `/data/ethereum`, bật JSON-RPC, xác định các không gian tên nào được phép và bật xác thực để kết nối ứng dụng khách đồng thuận được xác định bởi đường dẫn `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Theo mặc định, Erigon thực hiện đồng bộ hóa đầy đủ với ổ cứng 8GB, điều này sẽ dẫn đến hơn 2TB dữ liệu lưu trữ. Đảm bảo `datadir` đang trỏ đến ổ đĩa có đủ dung lượng trống hoặc xem xét cờ `--prune` có thể cắt tỉa các loại dữ liệu khác nhau. Kiểm tra `--help` của Erigon để tìm hiểu thêm.

##### Chạy Geth
Ví dụ này khởi động Geth trên Mạng chính, lưu trữ dữ liệu Chuỗi khối tại `/data/ethereum`, bật JSON-RPC và xác định các không gian tên nào được phép. Nó cũng bật xác thực để kết nối ứng dụng khách đồng thuận yêu cầu đường dẫn đến `jwtsecret` và cũng có tùy chọn xác định các kết nối nào được phép, trong ví dụ của chúng tôi chỉ từ `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Kiểm tra [tài liệu cho tất cả các tùy chọn cấu hình](https://geth.ethereum.org/docs/fundamentals/command-line-options) và tìm hiểu thêm về [việc chạy Geth với một ứng dụng khách đồng thuận](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Chạy Nethermind
Nethermind cung cấp nhiều [tùy chọn cài đặt](https://docs.nethermind.io/get-started/installing-nethermind) khác nhau. Gói này đi kèm với nhiều tệp nhị phân khác nhau, bao gồm một Trình khởi chạy với thiết lập có hướng dẫn, sẽ giúp bạn tạo cấu hình một cách tương tác. Ngoài ra, bạn có thể tìm thấy Runner là chính tệp thực thi và bạn chỉ cần chạy nó với các cờ cấu hình. JSON-RPC được bật theo mặc định.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Tài liệu của Nethermind cung cấp một [hướng dẫn đầy đủ](https://docs.nethermind.io/get-started/running-node/) về việc chạy Nethermind với ứng dụng khách đồng thuận.

Một máy khách thực thi sẽ khởi tạo các chức năng cốt lõi của nó, các điểm cuối đã chọn và bắt đầu tìm kiếm các nút ngang hàng. Sau khi khám phá thành công các nút ngang hàng, máy khách bắt đầu đồng bộ hóa. Máy khách thực thi sẽ chờ kết nối từ ứng dụng khách đồng thuận. Dữ liệu Chuỗi khối hiện tại sẽ có sẵn sau khi máy khách được đồng bộ hóa thành công với trạng thái hiện tại.

##### Chạy Reth
Ví dụ này khởi động Reth trên Mạng chính, sử dụng vị trí dữ liệu mặc định. Bật xác thực JSON-RPC và Engine RPC để kết nối ứng dụng khách đồng thuận được xác định bởi đường dẫn `jwtsecret`, với chỉ các lệnh gọi từ `localhost` được phép.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Xem [Cấu hình Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) để tìm hiểu thêm về các thư mục dữ liệu mặc định. [Tài liệu của Reth](https://reth.rs/run/mainnet.html) chứa các tùy chọn bổ sung và chi tiết cấu hình.

#### Khởi động ứng dụng khách đồng thuận {#starting-the-consensus-client}

Ứng dụng khách đồng thuận phải được khởi động với cấu hình cổng phù hợp để thiết lập kết nối RPC cục bộ với máy khách thực thi. Các ứng dụng khách đồng thuận phải được chạy với cổng máy khách thực thi được hiển thị dưới dạng đối số cấu hình.

Ứng dụng khách đồng thuận cũng cần đường dẫn đến `jwt-secret` của máy khách thực thi để xác thực kết nối RPC giữa chúng. Tương tự như các ví dụ thực thi ở trên, mỗi ứng dụng khách đồng thuận có một cờ cấu hình lấy đường dẫn tệp token jwt làm đối số. Điều này phải nhất quán với đường dẫn `jwtsecret` được cung cấp cho máy khách thực thi.

Nếu bạn dự định chạy một trình xác thực, hãy đảm bảo thêm một cờ cấu hình chỉ định địa chỉ Ethereum của người nhận phí. Đây là nơi tích lũy phần thưởng ether cho trình xác thực của bạn. Mỗi ứng dụng khách đồng thuận có một tùy chọn, ví dụ: `--suggested-fee-recipient=0xabcd1`, lấy một địa chỉ Ethereum làm đối số.

Khi khởi động một nút Beacon trên một mạng thử nghiệm, bạn có thể tiết kiệm đáng kể thời gian đồng bộ hóa bằng cách sử dụng một điểm cuối công khai cho [Đồng bộ hóa điểm kiểm tra](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Chạy một ứng dụng khách đồng thuận {#running-a-consensus-client}

##### Chạy Lighthouse
Trước khi chạy Lighthouse, hãy tìm hiểu thêm về cách cài đặt và cấu hình nó trong [Sách Lighthouse](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Chạy Lodestar
Cài đặt phần mềm Lodestar bằng cách biên dịch nó hoặc tải xuống hình ảnh Docker. Tìm hiểu thêm trong [tài liệu](https://chainsafe.github.io/lodestar/) và [hướng dẫn thiết lập](https://hackmd.io/@philknows/rk5cDvKmK) toàn diện hơn.

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Chạy Nimbus
Nimbus đi kèm với cả ứng dụng khách đồng thuận và máy khách thực thi. Nó có thể được chạy trên nhiều thiết bị khác nhau ngay cả với sức mạnh tính toán rất khiêm tốn.
Sau khi [cài đặt các phần phụ thuộc và chính Nimbus](https://nimbus.guide/quick-start.html), bạn có thể chạy ứng dụng khách đồng thuận của nó:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Chạy Prysm
Prysm đi kèm với tập lệnh cho phép cài đặt tự động dễ dàng. Chi tiết có thể được tìm thấy trong [tài liệu Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Chạy Teku
```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Khi một ứng dụng khách đồng thuận kết nối với máy khách thực thi để đọc hợp đồng tiền gửi và xác định các trình xác thực, nó cũng kết nối với các nút ngang hàng nút Beacon khác và bắt đầu đồng bộ hóa các khe đồng thuận từ khối nguyên thủy (genesis). Khi nút Beacon đạt đến Kỷ nguyên hiện tại, Beacon API sẽ trở nên khả dụng cho các trình xác thực của bạn. Tìm hiểu thêm về [Beacon Node APIs](https://ethereum.github.io/beacon-APIs).

### Thêm Trình xác thực {#adding-validators}

Một ứng dụng khách đồng thuận đóng vai trò như một nút Beacon để các trình xác thực kết nối. Mỗi ứng dụng khách đồng thuận có phần mềm trình xác thực riêng được mô tả chi tiết trong tài liệu tương ứng của nó.

Việc chạy trình xác thực của riêng bạn cho phép [đặt cọc độc lập](/staking/solo/), phương pháp có tác động lớn nhất và không cần tin cậy để hỗ trợ mạng lưới Ethereum. Tuy nhiên, điều này yêu cầu khoản tiền gửi là 32 ETH. Để chạy một trình xác thực trên nút của riêng bạn với số tiền nhỏ hơn, một nhóm phi tập trung với các nhà điều hành nút không cần cấp phép, chẳng hạn như [Rocket Pool](https://rocketpool.net/node-operators), có thể khiến bạn quan tâm.

Cách dễ nhất để bắt đầu với việc đặt cọc và tạo khóa trình xác thực là sử dụng [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org/), cho phép bạn kiểm tra thiết lập của mình bằng cách [chạy các nút trên Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Khi bạn đã sẵn sàng cho Mạng chính, bạn có thể lặp lại các bước này bằng cách sử dụng [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Xem [trang đặt cọc](/staking) để biết tổng quan về các tùy chọn đặt cọc.

### Sử dụng nút {#using-the-node}

Các máy khách thực thi cung cấp [các điểm cuối RPC API](/developers/docs/apis/json-rpc/) mà bạn có thể sử dụng để gửi giao dịch, tương tác với hoặc triển khai các hợp đồng thông minh trên mạng lưới Ethereum theo nhiều cách khác nhau:

- Gọi chúng theo cách thủ công bằng một giao thức phù hợp (ví dụ: sử dụng `curl`)
- Đính kèm một bảng điều khiển được cung cấp (ví dụ: `geth attach`)
- Triển khai chúng trong các ứng dụng bằng cách sử dụng các thư viện Web3, ví dụ: [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Các máy khách khác nhau có các triển khai khác nhau của các điểm cuối RPC. Nhưng có một JSON-RPC tiêu chuẩn mà bạn có thể sử dụng với mọi máy khách. Để có cái nhìn tổng quan, hãy [đọc tài liệu JSON-RPC](/developers/docs/apis/json-rpc/). Các ứng dụng cần thông tin từ mạng lưới Ethereum có thể sử dụng RPC này. Ví dụ: Ví phổ biến MetaMask cho phép bạn [kết nối với điểm cuối RPC của riêng bạn](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node), điều này mang lại lợi ích mạnh mẽ về quyền riêng tư và bảo mật.

Tất cả các ứng dụng khách đồng thuận đều hiển thị một [Beacon API](https://ethereum.github.io/beacon-APIs) có thể được sử dụng để kiểm tra trạng thái của ứng dụng khách đồng thuận hoặc tải xuống các khối và dữ liệu đồng thuận bằng cách gửi yêu cầu bằng các công cụ như [Curl](https://curl.se). Thông tin thêm về điều này có thể được tìm thấy trong tài liệu cho từng ứng dụng khách đồng thuận.

#### Tiếp cận RPC {#reaching-rpc}

Cổng mặc định cho JSON-RPC của máy khách thực thi là `8545` nhưng bạn có thể sửa đổi các cổng của các điểm cuối cục bộ trong cấu hình. Theo mặc định, giao diện RPC chỉ có thể truy cập được trên localhost của máy tính của bạn. Để làm cho nó có thể truy cập từ xa, bạn có thể muốn hiển thị nó ra công chúng bằng cách thay đổi địa chỉ thành `0.0.0.0`. Điều này sẽ làm cho nó có thể truy cập được qua mạng cục bộ và các địa chỉ IP công cộng. Trong hầu hết các trường hợp, bạn cũng sẽ cần thiết lập chuyển tiếp cổng trên bộ định tuyến của mình.

Hãy thận trọng khi tiếp cận việc hiển thị các cổng ra internet vì điều này sẽ cho phép bất kỳ ai trên internet kiểm soát nút của bạn. Các tác nhân độc hại có thể truy cập nút của bạn để đánh sập hệ thống của bạn hoặc đánh cắp tiền của bạn nếu bạn đang sử dụng máy khách của mình như một Ví.

Một cách để giải quyết vấn đề này là ngăn chặn các phương thức RPC có khả năng gây hại bị sửa đổi. Ví dụ: với Geth, bạn có thể khai báo các phương thức có thể sửa đổi bằng một cờ: `--http.api web3,eth,txpool`.

Quyền truy cập vào giao diện RPC có thể được mở rộng thông qua việc phát triển các API lớp biên hoặc các ứng dụng máy chủ web, như Nginx, và kết nối chúng với địa chỉ và cổng cục bộ của máy khách của bạn. Việc tận dụng một lớp trung gian cũng có thể cho phép các nhà phát triển khả năng thiết lập chứng chỉ cho các kết nối `https` an toàn đến giao diện RPC.

Việc thiết lập một máy chủ web, một proxy hoặc Rest API hướng ra bên ngoài không phải là cách duy nhất để cung cấp quyền truy cập vào điểm cuối RPC của nút của bạn. Một cách bảo vệ quyền riêng tư khác để thiết lập một điểm cuối có thể truy cập công khai là lưu trữ nút trên dịch vụ onion [Tor](https://www.torproject.org/) của riêng bạn. Điều này sẽ cho phép bạn tiếp cận RPC bên ngoài mạng cục bộ của mình mà không cần địa chỉ IP công cộng tĩnh hoặc các cổng đang mở. Tuy nhiên, việc sử dụng cấu hình này có thể chỉ cho phép điểm cuối RPC có thể truy cập được qua mạng lưới Tor, điều này không được tất cả các ứng dụng hỗ trợ và có thể dẫn đến các sự cố kết nối.

Để làm điều này, bạn phải tạo [dịch vụ onion](https://community.torproject.org/onion-services/) của riêng mình. Hãy xem [tài liệu](https://community.torproject.org/onion-services/setup/) về thiết lập dịch vụ onion để tự lưu trữ. Bạn có thể trỏ nó đến một máy chủ web có proxy đến cổng RPC hoặc chỉ trực tiếp đến RPC.

Cuối cùng, và một trong những cách phổ biến nhất để cung cấp quyền truy cập vào các mạng nội bộ là thông qua kết nối VPN. Tùy thuộc vào trường hợp sử dụng của bạn và số lượng người dùng cần truy cập vào nút của bạn, kết nối VPN an toàn có thể là một tùy chọn. [OpenVPN](https://openvpn.net/) là một SSL VPN đầy đủ tính năng triển khai tiện ích mở rộng mạng lưới an toàn lớp 2 hoặc 3 của OSI bằng cách sử dụng Giao thức SSL/TLS tiêu chuẩn ngành, hỗ trợ các phương pháp xác thực máy khách linh hoạt dựa trên chứng chỉ, thẻ thông minh và/hoặc thông tin xác thực tên người dùng/mật khẩu, và cho phép các chính sách kiểm soát truy cập dành riêng cho người dùng hoặc nhóm bằng cách sử dụng các quy tắc tường lửa được áp dụng cho giao diện ảo VPN.

### Vận hành nút {#operating-the-node}

Bạn nên thường xuyên theo dõi nút của mình để đảm bảo nó đang chạy bình thường. Bạn có thể cần phải bảo trì thỉnh thoảng.

#### Giữ cho một nút trực tuyến {#keeping-node-online}

Nút của bạn không nhất thiết phải trực tuyến mọi lúc, nhưng bạn nên giữ nó trực tuyến càng nhiều càng tốt để giữ cho nó đồng bộ hóa với mạng lưới. Bạn có thể tắt nó để khởi động lại, nhưng hãy ghi nhớ rằng:

- Việc tắt máy có thể mất vài phút nếu trạng thái gần đây vẫn đang được ghi trên ổ đĩa.
- Việc buộc tắt máy có thể làm hỏng cơ sở dữ liệu, yêu cầu bạn phải đồng bộ hóa lại toàn bộ nút.
- Máy khách của bạn sẽ mất đồng bộ hóa với mạng lưới và sẽ cần đồng bộ hóa lại khi bạn khởi động lại nó. Mặc dù nút có thể bắt đầu đồng bộ hóa từ nơi nó bị tắt lần cuối, quá trình này có thể mất thời gian tùy thuộc vào thời gian nó ngoại tuyến.

_Điều này không áp dụng cho các nút trình xác thực lớp đồng thuận._ Việc đưa nút của bạn ngoại tuyến sẽ ảnh hưởng đến tất cả các dịch vụ phụ thuộc vào nó. Nếu bạn đang chạy một nút cho mục đích _đặt cọc_, bạn nên cố gắng giảm thiểu thời gian ngừng hoạt động càng nhiều càng tốt.

#### Tạo các dịch vụ máy khách {#creating-client-services}

Hãy xem xét việc tạo một dịch vụ để chạy các máy khách của bạn tự động khi khởi động. Ví dụ: trên các máy chủ Linux, một thực tiễn tốt là tạo một dịch vụ, ví dụ: với `systemd`, thực thi máy khách với cấu hình phù hợp, dưới một người dùng có các đặc quyền hạn chế và tự động khởi động lại.

#### Cập nhật các máy khách {#updating-clients}

Bạn cần cập nhật phần mềm máy khách của mình với các bản vá bảo mật, tính năng và [EIP](/eips/) mới nhất. Đặc biệt là trước các [hard fork](/ethereum-forks/), hãy đảm bảo bạn đang chạy các phiên bản máy khách chính xác.

> Trước các bản cập nhật mạng lưới quan trọng, EF xuất bản một bài đăng trên [blog](https://blog.ethereum.org) của mình. Bạn có thể [đăng ký nhận các thông báo này](https://blog.ethereum.org/category/protocol#subscribe) để nhận thông báo qua thư khi nút của bạn cần cập nhật.

Việc cập nhật các máy khách rất đơn giản. Mỗi máy khách có các hướng dẫn cụ thể trong tài liệu của họ, nhưng quá trình này nhìn chung chỉ là tải xuống phiên bản mới nhất và khởi động lại máy khách với tệp thực thi mới. Máy khách sẽ tiếp tục từ nơi nó đã dừng lại, nhưng với các bản cập nhật được áp dụng.

Mỗi triển khai máy khách có một chuỗi phiên bản mà con người có thể đọc được sử dụng trong giao thức ngang hàng nhưng cũng có thể truy cập được từ dòng lệnh. Chuỗi phiên bản này cho phép người dùng kiểm tra xem họ đang chạy đúng phiên bản hay không và cho phép các trình khám phá khối và các công cụ phân tích khác quan tâm đến việc định lượng sự phân phối của các máy khách cụ thể trên mạng lưới. Vui lòng tham khảo tài liệu của từng máy khách để biết thêm thông tin về các chuỗi phiên bản.

#### Chạy các dịch vụ bổ sung {#running-additional-services}

Việc chạy nút của riêng bạn cho phép bạn sử dụng các dịch vụ yêu cầu quyền truy cập trực tiếp vào RPC của máy khách Ethereum. Đây là các dịch vụ được xây dựng trên Ethereum như [các giải pháp lớp 2 (l2)](/developers/docs/scaling/#layer-2-scaling), phần phụ trợ cho Ví, trình khám phá khối, công cụ dành cho nhà phát triển và cơ sở hạ tầng Ethereum khác.

#### Giám sát nút {#monitoring-the-node}

Để giám sát nút của bạn một cách hợp lý, hãy xem xét việc thu thập các số liệu. Các máy khách cung cấp các điểm cuối số liệu để bạn có thể nhận được dữ liệu toàn diện về nút của mình. Sử dụng các công cụ như [InfluxDB](https://www.influxdata.com/get-influxdb/) hoặc [Prometheus](https://prometheus.io/) để tạo cơ sở dữ liệu mà bạn có thể biến thành các hình ảnh trực quan và biểu đồ trong phần mềm như [Grafana](https://grafana.com/). Có nhiều thiết lập để sử dụng phần mềm này và các bảng điều khiển Grafana khác nhau để bạn hình dung nút của mình và toàn bộ mạng lưới. Ví dụ: hãy xem [hướng dẫn về việc giám sát Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Là một phần của việc giám sát, hãy đảm bảo để mắt đến hiệu suất máy của bạn. Trong quá trình đồng bộ hóa ban đầu của nút, phần mềm máy khách có thể rất nặng về CPU và RAM. Ngoài Grafana, bạn có thể sử dụng các công cụ mà hệ điều hành của bạn cung cấp như `htop` hoặc `uptime` để làm điều này.

## Đọc thêm {#further-reading}

- [Hướng dẫn đặt cọc Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, thường xuyên cập nhật_
- [Hướng dẫn | Cách thiết lập một trình xác thực để đặt cọc Ethereum trên Mạng chính](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, thường xuyên cập nhật_
- [Hướng dẫn của EthStaker về việc chạy các trình xác thực trên các mạng thử nghiệm](https://github.com/remyroy/ethstaker#guides) – _EthStaker, cập nhật thường xuyên_
- [Ứng dụng AWS Blockchain Node Runner mẫu cho các Nút Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/blueprints/ethereum) - _AWS, thường xuyên cập nhật_
- [Câu hỏi thường gặp về The Merge dành cho các nhà điều hành nút](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Tháng 7 năm 2022_
- [Phân tích các yêu cầu phần cứng để trở thành một nút đầy đủ được xác thực của Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, ngày 24 tháng 9 năm 2018_
- [Chạy các nút đầy đủ Ethereum: Hướng dẫn cho những người ít động lực](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, ngày 7 tháng 11 năm 2019_
- [Chạy một Nút Hyperledger Besu trên Mạng chính Ethereum: Lợi ích, Yêu cầu và Thiết lập](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, ngày 7 tháng 5 năm 2020_
- [Triển khai Máy khách Ethereum Nethermind với Ngăn xếp Giám sát](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, ngày 8 tháng 7 năm 2020_

## Các chủ đề liên quan {#related-topics}

- [Nút và máy khách](/developers/docs/nodes-and-clients/)
- [Khối](/developers/docs/blocks/)
- [Mạng lưới](/developers/docs/networks/)
