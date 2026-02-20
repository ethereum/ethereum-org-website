---
title: "Đăng kí nốt Ethereum của bạn"
description: "Một giới thiệu chung về cách tự vận hành một Client Ethereum."
lang: vi
sidebarDepth: 2
---

Chạy nút của bạn cho bạn rất nhiều lợi ích, mở ra nhiều tiềm năng, và giúp hộ trợ hệ sinh thái. Bài viết này sẽ hướng dẫn bạn cách triển khai nút của bạn và tham gia vào xác thực giao dịch Ethereum.

Lưu ý rằng sau [The Merge](/roadmap/merge), cần phải có hai máy khách để chạy một nút Ethereum; một **máy khách lớp thực thi (EL)** và một **máy khách lớp đồng thuận (CL)**. Bài viết này sẽ hướng dẫn bạn cài đặt như thế nào, điều chỉnh và kết nối hai Client đó để chạy nút Ethereum.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu nút Ethereum là gì và tại sao bạn có thể muốn chạy một Client. Điều này được đề cập trong [Các nút và máy khách](/developers/docs/nodes-and-clients/).

Nếu bạn là người mới tìm hiểu về chủ đề chạy nút hoặc đang tìm kiếm một con đường ít kỹ thuật hơn, chúng tôi khuyên bạn trước tiên nên xem qua phần giới thiệu thân thiện với người dùng của chúng tôi về [việc chạy một nút Ethereum](/run-a-node).

## Lựa chọn phương pháp {#choosing-approach}

Bước đầu tiên triển khai một nút của bạn là chọn cách bạn sẽ làm nó. Dựa trên những yêu cầu và đa dạng khả năng, bạn phải chọn Client thực thi (hoặc cả Client thực thi và đồng thuận), môi trường (phần cứng, hệ điều hành), và tham số cho tùy chỉnh Client.

Bài viết này sẽ hướng dẫn bạn qua các quyết định này và giúp bạn tìm một hướng để chạy Ethereum theo từng trường hợp.

Để chọn từ các cách triển khai máy khách, hãy xem tất cả [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients), [máy khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients) sẵn sàng cho Mạng chính và tìm hiểu về [tính đa dạng của máy khách](/developers/docs/nodes-and-clients/client-diversity).

Quyết định xem nên chạy phần mềm trên [phần cứng của riêng bạn hay trên đám mây](#local-vs-cloud), xem xét các [yêu cầu](#requirements) của máy khách.

Sau khi chuẩn bị môi trường, hãy cài đặt các máy khách đã chọn bằng [giao diện thân thiện với người mới bắt đầu](#automatized-setup) hoặc [thủ công](#manual-setup) bằng terminal với các tùy chọn nâng cao.

Khi nút đang chạy và đồng bộ hóa, bạn đã sẵn sàng [sử dụng nó](#using-the-node), nhưng hãy nhớ theo dõi việc [bảo trì](#operating-the-node) nút.

![Thiết lập máy khách](./diagram.png)

### Môi trường và phần cứng {#environment-and-hardware}

#### Cục bộ hay đám mây {#local-vs-cloud}

Client Ethereum có thể được chạy trên những máy tính dạng thương mại và không đòi hỏi phần cứng đặt biệt, như máy đào chẳng hạn. Vì vậy, bạn có rất nhiều lựa chọn đa dạng để thiết lập nút dựa trên những gì bạn cần.
Để đơn giản hóa, hãy nghĩ về việc chạy nút trên một máy chủ vật lý tại nhà và chạy trên máy chủ đám mây:

- Đám mây
  - Các nhà cung cấp dịch vụ cung cấp thời gian hoạt động của máy chủ cao và địa chỉ IP tĩnh công khai
  - Có một máy chủ chuyên dụng hay máy chủ ảo sẽ dễ chịu hơn việc phải tự mình xây
  - Đánh đổi là việc phải tin tưởng một bên thứ ba - người cung cấp máy chủ
  - Bởi vì đòi hỏi về dung lượng lưu trữ cho một nút đầy đủ, giá của việc thuê một máy chủ có thể cao
- Tự vận hành tại nhà
  - Không cần tin tưởng vào ai và là cách tiếp cận có tính chủ quyền hơn
  - Chỉ cần chi trả một lần
  - Một lựa chọn là mua những máy lắp sẵn
  - Bạn có thể phải tự mình chuẩn bị, bảo trì, và có thể phải sửa chữa máy và kết nối mạng

Cả hai lựa chọn đều có những lợi thế khác nhau được tóm gọn ở trên. Nếu bạn cần một giải pháp đám mây, thay vì những dịch vụ đám mây truyền thống, cũng có những dịch vụ tập trung vào những người triển khai nút. Hãy xem [các nút dưới dạng dịch vụ](/developers/docs/nodes-and-clients/nodes-as-a-service/) để biết thêm các tùy chọn về các nút được lưu trữ.

#### Phần cứng {#hardware}

Tuy nhiên, một mạng lưới chống kiểm duyệt, phi tập trung không nên dựa vào người cung cấp đám mây. Thay vào đó, tự chạy nút của bạn tại nhà là một cách tốt cho hệ sinh thái hơn. [Các ước tính](https://www.ethernodes.org/networkType/cl/Hosting) cho thấy một phần lớn các nút chạy trên đám mây, điều này có thể trở thành một điểm lỗi duy nhất.

Client Ethereum có thể được chạy trên máy tính, máy tính cá nhân (laptop), máy chủ, hoặc là chỉ một máy tính bo mạch đơn. Trong khi sử dụng Client trên máy tính cá nhân của bạn là khả thi, có một máy chuyên dụng cho nút của bạn có thể cải thiện rất nhiều hiệu suất của nó và bảo mật trong khi giảm thiểu ảnh hưởng lên máy chính của bạn.

Sử dụng phần cứng của bạn có thể rất dễ dàng. Có rất nhiều những lựa chọn đơn giản cũng như là cấu hình nâng cao cho những người có kiến thức kĩ thuật. Vậy hãy cùng nhau nhìn vào các yêu cầu và chi phí để chạy một Client Ethereum trên máy của bạn.

#### Các yêu cầu {#requirements}

Yêu cầu phần cứng sẽ khác nhau bởi Client tuy nhiên nhìn chung cũng không có cao đến vậy vì nút cũng chỉ cần duy trì đồng bộ. Đừng nhầm lẫn nó với việc đào, mà trong đó việc đào đòi hỏi rất nhiều sức mạnh tính toán. Tuy nhiên, thời gian đồng bộ và hiệu suất sẽ được cải thiện khi phần cứng mạnh hơn.

Trước khi cài đặt bất kỳ client nào, hãy đảm bảo rằng máy tính của bạn có đủ tài nguyên để chạy nó. Bạn có thể xem các yêu cầu tối thiểu và khuyến nghị ở bên dưới.

Điểm nghẽn lớn nhất đối với phần cứng của bạn thường là dung lượng ổ đĩa. Việc đồng bộ chuỗi khối Ethereum tiêu tốn rất nhiều tác vụ đọc/ghi và cần rất nhiều dung lượng lưu trữ. Tốt nhất là bạn nên có một **ổ cứng thể rắn (SSD)** với hàng trăm GB dung lượng trống, vẫn còn dư ngay cả sau khi đồng bộ xong.

Kích thước của cơ sở dữ liệu và tốc độ đồng bộ hóa ban đầu phụ thuộc vào máy khách đã chọn, cấu hình của nó và [chiến lược đồng bộ hóa](/developers/docs/nodes-and-clients/#sync-modes).

Đồng thời, hãy đảm bảo kết nối internet của bạn không bị giới hạn bởi [mức dung lượng băng thông](https://wikipedia.org/wiki/Data_cap). Khuyến nghị nên dùng kết nối không giới hạn, vì quá trình đồng bộ ban đầu và dữ liệu phát tán lên mạng có thể vượt quá giới hạn của bạn.

##### Hệ điều hành

Tất cả các Client đều hỗ trợ các hệ điều hành phổ biến – Linux, MacOS, Windows. Điều này có nghĩa là bạn có thể chạy node trên máy tính để bàn thông thường hoặc máy chủ với hệ điều hành (OS) phù hợp nhất với bạn. Hãy đảm bảo hệ điều hành của bạn luôn được cập nhật để tránh các sự cố tiềm ẩn và lỗ hổng bảo mật.

##### Yêu cầu tối thiểu

- CPU 2+ lõi xử lí
- 8 GB RAM
- 2TB SSD
- Băng thông tối thiểu 10 MBit/giây

##### Thông số khuyến nghị

- CPU nhanh với 4+ lõi xử lí
- Trên 16BN RAM
- Ổ cứng SSD nhanh với 2+TB
- Băng thông từ 25 MBit/giây trở lên

Việc đồng bộ phương thức và Client bạn chọn sẽ ảnh hưởng đến đòi hỏi lưu lượng dự trữ, nhưng chúng tôi ước lượng dung lượng bạn cần cho mỗi Client như bên dưới.

| Client     | Dung lượng ổ cứng (đồng bộ nhanh) | Dung lượng ổ cứng (lưu trữ toàn bộ) |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------ |
| Besu       | 800GB+                                               | 12TB+                                                  |
| Erigon     | N/A                                                  | 2.5TB+                                 |
| Geth       | 500GB+                                               | 12TB+                                                  |
| Nethermind | 500GB+                                               | 12TB+                                                  |
| Reth       | N/A                                                  | 2.2TB+                                 |

- Lưu ý: Erigon và Reth không hỗ trợ chế độ đồng bộ nhanh (snap sync), nhưng có thể thực hiện "Full Pruning - quá trình bỏ dữ liệu không cần thiết giảm dung lượng" (~2TB đối với Erigon, ~1.2TB đối với Reth)

Đối với máy khách đồng thuận, yêu cầu về dung lượng cũng phụ thuộc vào việc triển khai máy khách và các tính năng được bật (ví dụ: trình slasher của trình xác thực) nhưng thường cần thêm 200GB cho dữ liệu beacon. Với số lượng nút xác thực lớn, thông lượng cũng cần phải tăng theo. Bạn có thể tìm thấy [chi tiết về các yêu cầu của máy khách đồng thuận trong phân tích này](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Các giải pháp cắm và chạy {#plug-and-play}

Cách dễ nhất để chạy nút bằng phần cứng riêng là sử dụng thiết bị Plug-and-Play (cắm vào rồi chạy). Các máy được cấu hình sẵn từ nhà cung cấp mang lại trải nghiệm đơn giản nhất: đặt hàng, kết nối, chạy. Mọi cấu hình đều được lắp sẵn và chạy tự động, đi kèm hướng dẫn trực quan và bảng thông tin để giám xác cũng như quản lý phần mềm.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum trên máy tính một bo mạch {#ethereum-on-a-single-board-computer}

Một cách đơn giản và rẻ để chạy một nút Ethereum là sử dụng máy tính bo mạch đơn, ngay cả với thiết kế ARM như Raspberry Pi. [Ethereum trên ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) cung cấp các image dễ chạy của nhiều máy khách thực thi và máy khách đồng thuận cho Raspberry Pi và các bo mạch ARM khác.

Nhỏ gọn, giá rẻ và tiết kiệm như thế này rất lý tưởng để chạy node tại nhà, nhưng hãy lưu ý đến hiệu năng hạn chế của chúng.

## Khởi chạy nút {#spinning-up-node}

Việc cài đặt Client thực tế có thể chạy bằng những công cụ cài đặt tự động hoặc thủ công, bằng cách tự cài đặt phần mềm Client trực tiếp.

Đối với người dùng ít kinh nghiệm, khuyến nghị thường là sử dụng công cụ cài tự động, phần mềm hướng dẫn bạn trong quá trình cài đặt và tự động hóa thiết lập Client. Tuy nhiên, nếu bạn có một chút kinh nghiệm sử dụng Terminal, thì các bước cài đặt thủ công sẽ khá dễ thực hiện.

### Thiết lập có hướng dẫn {#automatized-setup}

Có rất nhiều dữ án thân thiện với người dùng nhằm cải thiện trải nghiệm thiết lập một Client. Các Laucher này cung cấp khả năng cài đặt và cấu hình Client một cách tự động, một số thậm chí còn có giao diện đồ họa để hướng dẫn cài đặt và giảm sát các Client.

Dưới đây là một vài dự án mà giúp bạn cài đặt và kiểm soát Client chỉ với và cú nhấp chuột:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DappNode không chỉ đi kèm với một máy từ một nhà cung cấp. Phần mềm, tức là trình khởi chạy nút và trung tâm điều khiển với nhiều tính năng, có thể được sử dụng trên bất kỳ phần cứng nào.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Cách nhanh nhất và dễ nhất để thiết lập một nút đầy đủ. Công cụ cài đặt một dòng lệnh và giao diện TUI để quản lý nút. Miễn phí. Mã nguồn mở. Là công cụ chung của cộng đồng Ethereum bởi những người tự Stake. Hỗ trợ ARM64 và AMD64.
- [eth-docker](https://eth-docker.net/) - Thiết lập tự động bằng Docker tập trung vào việc đặt cược dễ dàng và an toàn, yêu cầu kiến thức cơ bản về terminal và Docker, được khuyến nghị cho người dùng có kinh nghiệm hơn một chút.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Trình khởi chạy để cài đặt máy khách trên một máy chủ từ xa thông qua kết nối SSH với một hướng dẫn thiết lập GUI, trung tâm điều khiển và nhiều tính năng khác.
- [NiceNode](https://www.nicenode.xyz/) - Trình khởi chạy với trải nghiệm người dùng đơn giản để chạy một nút trên máy tính của bạn. Chỉ cần chọn Client và khỏi chạy bằng vài cú nhấp chuột. Vẫn trong quá trình phát triển.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Công cụ thiết lập nút tự động tạo cấu hình Docker bằng trình hướng dẫn CLI. Được viết bằng Go bởi Nethermind.

### Thiết lập máy khách thủ công {#manual-setup}

Một trong những lựa chọn là tải về, xác thực, và thiết lập phần mềm Client thủ công. Ngay cả khi một số Client cung cấp giao diện đồ họa, thì việc cài đặt thủ công vẫn đòi hỏi kỹ năng cơ bản với Terminal, nhưng lại mang đến nhiều tính linh hoạt hơn.

Như đã giải thích trước đó, việc thiết lập một nút Ethereum riêng của bạn sẽ cần chạy một cặp Client: Client đồng thuận và Client thực thi. Một số Client có thể bao gồm Light Client của loại còn lại và có thể đồng bộ mà không cần bất kỳ phần mềm nào khác. Tuy nhiên, việc xác minh không cần tin tưởng đầy đủ thì bắt buộc phải có cả hai loại Client.

#### Tải phần mềm máy khách {#getting-the-client}

Đầu tiên, bạn cần tải phần mềm [máy khách thực thi](/developers/docs/nodes-and-clients/#execution-clients) và [máy khách đồng thuận](/developers/docs/nodes-and-clients/#consensus-clients) mà bạn muốn.

Bạn chỉ cần đơn giản tải xuống một ứng dụng thực thi hoặc gói cài đặt phù hợp với hệ điều hành và cấu hình phần cứng của mình. Luôn kiểm tra chữ ký và mã băm của các gói đã tải về. Một số Client cũng cung cấp kho lưu trữ hoặc hình ảnh Docker để cài đặt và cập nhật dễ hơn. Tất cả các Client đều là mã nguồn mở, vì vậy bạn có thể tự xây dựng chúng từ đầu. Đây là một phương pháp nâng cao hơn, nhưng một số trường hợp có thể sẽ cần dùng đến.

Hướng dẫn cài đặt cho từng Client có sẵn tài liệu được liên kết ở danh sách Client phía trên.

Dưới đây là các trang phát hành của Client, nơi bạn có thể tìm thấy các bản dựng sẵn hoặc hướng dẫn cài đặt:

##### Máy khách thực thi

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Cũng cần lưu ý rằng tính đa dạng của máy khách là một [vấn đề trên lớp thực thi](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Cũng khuyến nghị người đọc rằng cân nhắc chạy Client thực thi đang chiếm thiểu số.

##### Máy khách đồng thuận

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source) (Không cung cấp tệp nhị phân dựng sẵn, chỉ cung cấp ảnh Docker hoặc phải dựng từ mã nguồn)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Tính đa dạng của máy khách](/developers/docs/nodes-and-clients/client-diversity/) là rất quan trọng đối với các nút đồng thuận chạy các trình xác thực. Nếu như phần lớn nút xác thực chạy chỉ một loại Client, sự an toàn của mạng lưới bị đặt vào rủi ro. Vì vậy việc cân nhắc sử dụng Client thiểu số là được khuyến khích.

[Xem mức sử dụng máy khách mạng mới nhất](https://clientdiversity.org/) và tìm hiểu thêm về [tính đa dạng của máy khách](/developers/docs/nodes-and-clients/client-diversity).

##### Xác thực phần mềm

Khi tải phần mềm từ Internet, nên xác thực tính hợp lệ của nó. Bước này không bắt buộc nhưng đặc biệt quan trọng cho cơ sở hạ tầng như Client của Ethereum, thì việc nhận biết các khả năng tấn công tiềm ẩn và tránh chúng là rất quan trọng. Nếu bạn tải một tùy chọn có sẵn, bạn cần phải tin tưởng nó và rủi ro rằng kẻ tấn công có thể đổi phương thức thực thi thành hành vi độc hại.

Lập trình viên sẽ ký các bản phát hành kỹ thuật số của họ với khóa PGP của họ, để bạn có thể xác minh bằng mật mã rằng bạn đang chạy đúng phần mềm mà họ tạo ra. Bạn chỉ cần lấy khóa công khai (Public Key) mà nhà phát triển sử dụng, những khóa này sẽ được tìm thấy trên trang phát hành Client hoặc trong tài liệu. Sau khi tải xuống bản phát hành của máy khách và chữ ký của nó, bạn có thể sử dụng một triển khai PGP, ví dụ: [GnuPG](https://gnupg.org/download/index.html) để dễ dàng xác minh chúng. Xem hướng dẫn về cách xác minh phần mềm nguồn mở bằng `gpg` trên [linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) hoặc [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Một hình thức xác minh khác là đảm bảo rằng hàm băm, một phương thức tạo dấu vân tay bằng mật mã học, của phần mềm bạn tải về trùng với lại hàm băm mà nhà lập trình cung cấp. Cái này sẽ dễ hơn sử dụng PGP, và một số Client chỉ có lựa chọn này. Chỉ cần chạy hàm băm trên một phần mềm đã tải về so sánh giá trị kết quả băm trên trang phát hành. Ví dụ:

```sh
sha256sum teku-22.6.1.tar.gz\n\n9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Thiết lập máy khách {#client-setup}

Sau khi cài đặt, tải xuống hoặc biên dịch phần mềm Client, bạn đã sẵn sàng để chạy nó. Điều này chỉ có nghĩa là nó cần được chạy với cấu hình phù hợp. Các client cung cấp nhiều tùy chọn cấu hình, cho phép kích hoạt nhiều tính năng khác nhau.

Hãy bắt đầu với các tùy chọn có thể ảnh hưởng đáng kể đến hiệu năng của Client và mức tiêu thụ dữ liệu. [Các chế độ đồng bộ hóa](/developers/docs/nodes-and-clients/#sync-modes) đại diện cho các phương pháp khác nhau để tải xuống và xác thực dữ liệu chuỗi khối. Trước khi khởi chạy nút, bạn nên quyết định sẽ sử dụng mạng nào và chế độ đồng bộ nào. Những yếu tố quan trọng nhất cần cân nhắc là dung lượng ổ đĩa và thời gian đồng bộ mà Client sẽ cần. Hãy chú ý đến tài liệu của Client để xác định chế độ đồng bộ nào là mặc định. Nếu chế độ đó không phù hợp, hãy chọn một chế độ khác dựa trên mức độ bảo mật, dữ liệu có sẵn và chi phí. Ngoài thuật toán đồng bộ, bạn cũng có thể thiết lập việc cắt bớt các loại dữ liệu cũ khác nhau. Cắt tỉa (pruning) cho phép xóa dữ liệu lỗi thời, tức là xóa các nút trie trạng thái không thể truy cập được từ các khối gần đây.

Các tùy chọn cấu hình cơ bản khác bao gồm: chọn mạng (Mạng chính hoặc mạng thử nghiệm), bật điểm cuối HTTP cho RPC hoặc WebSockets, v.v. Bạn có thể tìm thấy tất cả các tính năng và tùy chọn trong tài liệu của Client. Nhiều cấu hình Client có thể được thiết lập bằng cách chạy Client với Flag tương ứng trực tiếp trong CLI hoặc trong tệp cấu hình. Mỗi Client có đôi chút khác biệt; vì vậy hãy luôn tham khảo tài liệu chính thức hoặc trang trợ giúp của nó để biết chi tiết về các tùy chọn cấu hình.

Với mục đích thử nghiệm, bạn có thể muốn chạy Client trên một trong các mạng mạng thử nghiệm. [Xem tổng quan về các mạng được hỗ trợ](/developers/docs/nodes-and-clients/#execution-clients).

Ví dụ về việc chạy Client thực thi với cấu hình cơ bản có thể được tìm thấy trong phần tiếp theo.

#### Khởi động máy khách thực thi {#starting-the-execution-client}

Trước khi bắt đàu phần mềm Client Ethereum, hãy thực hiện một bước kiểm tra cuối cùng để đảm bảo môi trường đã sẵn sàng. Ví dụ, hãy đảm bảo rằng:

- Có đủ dung lượng ổ đĩa, xét theo mạng và chế độ đồng bộ mà bạn đã chọn.
- Bộ nhớ (RAM) và CPU không bị chiếm dụng bởi các chương trình khác.
- Hệ điều hành đã được cập nhật lên phiên bản mới nhất.
- Hệ thống có thời gian và ngày tháng chính xác.
- Bộ định tuyến và tường lửa của bạn chấp nhận các kết nối trên các cổng tiếp nhận thông tin. Mặc định, Ethereum Client sử dụng một cổng thông tin (TCP) và một cổng giao thức (UDP), cả hai đều là 30303 theo mặc định.

Hãy chạy Client của bạn trên một mạng thử nghiệm trước, để đảm bảo mọi thứ hoạt động chính xác.

Bạn cần khai báo bất kỳ thiết lập nào của Client không phải mặc định ngay từ đầu. Bạn có thể sử dụng Flag hoặc tệp cấu hình để khai báo cấu hình mong muốn. Các tính năng và cách viết cấu hình ở mỗi Client đều khác nhau. Hãy xem tài liệu của Client của bạn để thêm chi tiết.

Các máy khách thực thi và đồng thuận giao tiếp thông qua một điểm cuối đã được xác thực được chỉ định trong [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Để kết nối với một máy khách đồng thuận, máy khách thực thi phải tạo một [`jwtsecret`](https://jwt.io/) tại một đường dẫn đã biết. Vì lý do bảo mật và ổn định, các Client nên chạy trên cùng một máy, và cả hai Client phải biết đường dẫn này, vì nó được dùng để xác thực kết nối RPC cục bộ giữa chúng. Client xác thực cũng phải có một cổng giao thức dành cho các API đã được xác thực.

Token này được phần mềm Client tự động tạo ra, nhưng trong một số trường hợp, bạn có thể cần phải tự tạo thủ công. Bạn có thể tạo nó bằng [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Chạy máy khách thực thi {#running-an-execution-client}

Phần này sẽ hướng dẫn bạn cách bắt đầu từ Client thực thi. Đây chỉ là một ví dụ về cấu hình cơ bản, dùng để khởi chạy Client với các thiết lập sau:

- Xác định mạng để kết nối, trong ví dụ này là mạng chính
  - Thay vào đó, bạn có thể chọn [một trong các mạng thử nghiệm](/developers/docs/networks/) để thử nghiệm sơ bộ thiết lập của mình
- Xác định thư mục dữ liệu, nơi tất cả dữ liệu bao gồm cả chuỗi khối sẽ được lưu trữ
  - Hãy đảm bảo thay thế đường dẫn ví dụ bằng một đường dẫn thực tế, ví dụ trỏ tới ổ cứng ngoài của bạn
- Kích hoạt các giao diện để giao tiếp với Client
  - Bao gồm JSON-RPC và Engine API để giao tiếp với Client đồng thuận
- Xác định đường dẫn tới `jwtsecret` cho API được xác thực
  - Hãy đảm bảo thay thế đường dẫn ví dụ bằng một đường dẫn thực tế mà các máy khách có thể truy cập, ví dụ: `/tmp/jwtsecret`

Hãy nhớ rằng đây chỉ là một ví dụ cơ bản, tất cả các thiết lập khác sẽ được đặt về mặc định. Hãy chủ ý trên tài liệu của từng Client và tìm hiểu về những giá trị, cài đặt và tính năng mặc định. Những tính năng thêm, ví dụ cho chạy một nút xác thực, theo dõi,... vui lòng tìm hiểu tài liệu cụ thể cho Client đó.

> Lưu ý rằng dấu gạch chéo ngược `` trong các ví dụ chỉ dành cho mục đích định dạng; các cờ cấu hình có thể được xác định trên một dòng.

##### Chạy Besu

Ví dụ này khởi động Besu trên Mạng chính, lưu trữ dữ liệu chuỗi khối ở định dạng mặc định tại `/data/ethereum`, bật JSON-RPC và Engine RPC để kết nối máy khách đồng thuận. Engine API được xác thực bằng token `jwtsecret` và chỉ các lệnh gọi từ `localhost` mới được cho phép.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu cũng đi kèm với lựa chọn khi cài đặt, nó sẽ hỏi danh sách câu hỏi và tạo tệp cấu hình. Chạy một Laucher tương tác sử dựng:

```sh
besu --Xlauncher
```

[Tài liệu của Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) chứa các tùy chọn bổ sung và chi tiết cấu hình.

##### Chạy Erigon

Ví dụ này khởi động Erigon trên Mạng chính, lưu trữ dữ liệu chuỗi khối tại `/data/ethereum`, bật JSON-RPC, xác định các không gian tên (namespace) nào được phép và bật xác thực để kết nối máy khách đồng thuận được xác định bởi đường dẫn `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Mặc định, Erigon thực hiện đồng bộ đầy đủ với ổ cứng 8GB, và kết quả sẽ tạo ra hơn 2TB dữ liệu lưu trữ. Hãy đảm bảo `datadir` đang trỏ đến đĩa có đủ dung lượng trống hoặc xem xét cờ `--prune` có thể cắt bớt các loại dữ liệu khác nhau. Kiểm tra `--help` của Erigon để tìm hiểu thêm.

##### Chạy Geth

Ví dụ này khởi động Geth trên Mạng chính, lưu trữ dữ liệu chuỗi khối tại `/data/ethereum`, bật JSON-RPC và xác định không gian tên nào được phép. Nó cũng bật xác thực để kết nối máy khách đồng thuận, yêu cầu đường dẫn đến `jwtsecret` và tùy chọn xác định kết nối nào được phép, trong ví dụ của chúng tôi là chỉ từ `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Kiểm tra [tài liệu về tất cả các tùy chọn cấu hình](https://geth.ethereum.org/docs/fundamentals/command-line-options) và tìm hiểu thêm về [việc chạy Geth với một máy khách đồng thuận](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Chạy Nethermind

Nethermind cung cấp nhiều [tùy chọn cài đặt](https://docs.nethermind.io/get-started/installing-nethermind) khác nhau. Gói cài đặt đi kèm với nhiều tệp thực thi, trong đó có Launcher với phần cài đặt hướng dẫn, giúp bạn tạo cấu hình bằng cách tương tác. Ngoài ra, còn có Runner, chính là tệp thực thi, và bạn có thể chạy nó trực tiếp với các cấu hình Flag. JSON-RPC được bật theo mặc định.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Tài liệu của Nethermind cung cấp một [hướng dẫn hoàn chỉnh](https://docs.nethermind.io/get-started/running-node/) về việc chạy Nethermind với máy khách đồng thuận.

Một Client thực thi sẽ khởi động các chức năng cốt lõi của nó, mở các endpoint đã chọn và bắt đầu tìm kiếm các nút ngang hàng. Sau khi tìm thấy các nút ngang hàng thành công, Client sẽ bắt đầu quá trình đồng bộ. Client thực thi sẽ chờ kết nối từ Client đồng thuận. Dữ liệu chuỗi khối hiện tại sẽ khả dụng khi Client đã đồng bộ thành công với trạng thái mới nhất.

##### Chạy Reth

Ví dụ này chạy Reth trên mạng chính, sử dụng dữ liệu địa điểm mặc định. Bật xác thực JSON-RPC và Engine RPC để kết nối máy khách đồng thuận được xác định bởi đường dẫn `jwtsecret`, chỉ cho phép các lệnh gọi từ `localhost`.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Xem [Cấu hình Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth) để tìm hiểu thêm về các thư mục dữ liệu mặc định. [Tài liệu của Reth](https://reth.rs/run/mainnet.html) chứa các tùy chọn bổ sung và chi tiết cấu hình.

#### Khởi động máy khách đồng thuận {#starting-the-consensus-client}

Client đồng thuận phải được bắt đầu với cấu hình cổng giao thức phù hợp để kết nối RPC cục bộ tới Client thực thi. Client đồng thuận phải chạy với cổng của Client thực thi đã mở được truyền vào như tham số cấu hình.

Máy khách đồng thuận cũng cần đường dẫn đến `jwt-secret` của máy khách thực thi để xác thực kết nối RPC giữa chúng. Giống như ví dụ thực thi ở trên, mỗi Client đồng thuận có một cấu hình Flag sử dụng thư mục Token jwt như một tham số. Điều này phải nhất quán với đường dẫn `jwtsecret` được cung cấp cho máy khách thực thi.

Nếu bạn dự định chạy một nút xác thực, hãy nhớ thêm một cấu hình Flag để chỉ định địa chỉ Ethereum của người nhận phí. Đây là nơi phần thưởng Ether cho nút của bạn sẽ được tích lũy. Mỗi máy khách đồng thuận có một tùy chọn, ví dụ: `--suggested-fee-recipient=0xabcd1`, nhận một địa chỉ Ethereum làm đối số.

Khi khởi động một Nút Beacon trên một mạng thử nghiệm, bạn có thể tiết kiệm đáng kể thời gian đồng bộ hóa bằng cách sử dụng một điểm cuối công khai cho [đồng bộ hóa điểm kiểm duyệt (Checkpoint sync)](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Chạy một máy khách đồng thuận {#running-a-consensus-client}

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

##### Chạy Lodestart

Cập nhật phần mềm Lodestart bằng cách biên dịch hoặc tải xuống Docker image. Tìm hiểu thêm trong [tài liệu](https://chainsafe.github.io/lodestar/) và [hướng dẫn thiết lập](https://hackmd.io/@philknows/rk5cDvKmK) toàn diện hơn.

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Chạy Nimbus

Nimbus hoạt động như Client đồng thuận và thực thi. Nó có thể được chạy trên nhiều loại thiết bị thậm chí là khả năng tính toán thấp.
Sau khi [cài đặt các gói phụ thuộc và chính Nimbus](https://nimbus.guide/quick-start.html), bạn có thể chạy máy khách đồng thuận của nó:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Chạy Prysm

Prysm đi kèm với một tập lệnh cho phép cài đặt tự động một cách dễ dàng. Chi tiết có thể được tìm thấy trong [tài liệu của Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

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

Khi một Client đồng thuận kết nối với Client thực thi để đọc hợp đồng ký gửi và nhận diện các nút xác thực, nó cũng đồng thời kết nối với các nút Beacon ngang hàng khác và bắt đầu đồng bộ các Slot đồng thuận từ khởi nguyên. Khi nút Beacon đạt tới chu kỳ hiện tại, Beacon API sẽ khả dụng cho các nút xác thực của bạn. Tìm hiểu thêm về [các API của Nút Beacon](https://eth2docs.vercel.app/).

### Thêm Trình xác thực {#adding-validators}

Một Client đồng thuận đóng vai trò là nút Beacon để các nút xác thực có thể kết nối. Mỗi Client đồng thuận có phần mềm xác thực riêng được miêu tả chi tiết trong tài liệu của nó.

Việc chạy trình xác thực của riêng bạn cho phép [đặt cược solo](/staking/solo/), phương pháp có tác động lớn nhất và phi tín nhiệm để hỗ trợ mạng Ethereum. Tuy nhiên, điều này đòi hỏi khoảng cọc là 32 ETH. Để chạy một trình xác thực trên nút của riêng bạn với số tiền nhỏ hơn, một bể (pool) phi tập trung với các nhà khai thác nút không cần cấp phép, chẳng hạn như [Rocket Pool](https://rocketpool.net/node-operators), có thể sẽ khiến bạn quan tâm.

Cách dễ nhất để bắt đầu với việc đặt cược và tạo khóa trình xác thực là sử dụng [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org/), cho phép bạn kiểm tra thiết lập của mình bằng cách [chạy các nút trên Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Khi bạn đã sẵn sàng cho Mạng chính, bạn có thể lặp lại các bước này bằng cách sử dụng [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Xem [trang đặt cược](/staking) để có cái nhìn tổng quan về các tùy chọn đặt cược.

### Sử dụng nút {#using-the-node}

Các máy khách thực thi cung cấp các [điểm cuối API RPC](/developers/docs/apis/json-rpc/) mà bạn có thể sử dụng để gửi giao dịch, tương tác hoặc triển khai các hợp đồng thông minh trên mạng Ethereum theo nhiều cách khác nhau:

- Gọi chúng theo cách thủ công bằng một giao thức phù hợp (ví dụ: sử dụng `curl`)
- Đính kèm một bảng điều khiển (console) được cung cấp (ví dụ: `geth attach`)
- Triển khai chúng trong các ứng dụng sử dụng thư viện web3, ví dụ: [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Các Client khác nhau có những thực thi khác nhau về RPC endpoint. Tuy nhiên đã có tiêu chuẩn JSON-RPC mà bạn có thể sử dụng được cho mỗi Client. Để có cái nhìn tổng quan, [hãy đọc tài liệu JSON-RPC](/developers/docs/apis/json-rpc/). Các ứng dụng cần thông tin từ mạng Ethereum có thể sử dụng RPC này. Ví dụ: ví phổ biến MetaMask cho phép bạn [kết nối với điểm cuối RPC của riêng mình](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) với các lợi ích mạnh mẽ về quyền riêng tư và bảo mật.

Tất cả các máy khách đồng thuận đều cung cấp một [API Beacon](https://ethereum.github.io/beacon-APIs) có thể được sử dụng để kiểm tra trạng thái của máy khách đồng thuận hoặc tải xuống các khối và dữ liệu đồng thuận bằng cách gửi yêu cầu bằng các công cụ như [Curl](https://curl.se). Các thông tin có thể được tìm thấy trên tài liệu của từng Client đồng thuận.

#### Tiếp cận RPC {#reaching-rpc}

Cổng mặc định cho JSON-RPC của máy khách thực thi là `8545` nhưng bạn có thể sửa đổi các cổng của các điểm cuối cục bộ trong cấu hình. Theo mặc định, giao diện RPC chỉ có thể truy cập được cục bộ trên máy tính của bạn. Để có thể truy cập từ xa, bạn có thể muốn hiển thị nó ra công khai bằng cách thay đổi địa chỉ thành `0.0.0.0`. Điều này sẽ giúp nó có thể truy cập được qua mạng cục bộ và các địa chỉ IP công cộng. Trong hầu hết trường hợp, bạn cũng sẽ cần thiết lập cổng chuyển tiếp trên bộ định tuyến của mình.

Hãy hết sức thận trọng khi mở cổng ra Internet, vì việc này sẽ cho phép bất kỳ ai trên mạng điều khiển nút của bạn. Kẻ tấn công có thể truy cập vào nút của bạn để làm sập hệ thống hoặc đánh cắp tiền nếu bạn đang dùng Client như một ví.

Một cách giải quyết là ngăn không cho các phương thức RPC có thể gây hại bị chỉnh sửa. Ví dụ, với Geth, bạn có thể khai báo các phương thức có thể sửa đổi bằng một cờ: `--http.api web3,eth,txpool`.

Việc truy cập vào giao diện RPC có thể được mở rộng thông qua việc phát triển API tầng biên hoặc các ứng dụng máy chủ web, như Nginx, và kết nối chúng với địa chỉ và cổng cục bộ của Client. Tận dụng một lớp trung gian cũng cho phép các nhà phát triển thiết lập chứng chỉ cho các kết nối `https` an toàn đến giao diện RPC.

Việc thiết lập một máy chủ Web, proxy hoặc REST API công khai không phải là cách duy nhất để cung cấp quyền truy cập tới RPC endpoint của nút. Một cách khác để thiết lập một điểm cuối có thể truy cập công khai mà vẫn bảo vệ quyền riêng tư là chạy nút của bạn trên dịch vụ onion [Tor](https://www.torproject.org/) của riêng bạn. Điều này cho phép bạn truy cập RPC từ bên ngoài mạng cục bộ mà không cần địa chỉ IP công cộng hoặc mở cổng công khai. Tuy nhiên, việc sử dụng cấu hình này có thể khiến RPC endpoint chỉ truy cập được thông qua mạng Tor, vốn không được tất cả ứng dụng hỗ trợ và có thể dẫn đến sự cố kết nối.

Để làm điều này, bạn phải tạo [dịch vụ onion](https://community.torproject.org/onion-services/) của riêng mình. Xem [tài liệu](https://community.torproject.org/onion-services/setup/) về thiết lập dịch vụ onion để tự lưu trữ. Bạn có thể trỏ nó tới một trang chủ Web dùng Proxy tới cổng RPC hoặc trỏ trực tiếp tới RPC.

Cuối cùng, một trong những cách phổ biến nhất là cung cấp quyền truy cập vào mạng nội bộ thông qua VPN. Tùy thuộc vào trường hợp sử dụng và số lượng người dùng cần truy cập vào nút của bạn, một kết nối VPN an toàn có thể là một lựa chọn. OpenVPN là một SSL VPN đầy đủ tính năng, triển khai mở rộng mạng an toàn ở lớp 2 hoặc 3 của OSI bằng cách sử dụng giao thức SSL/TLS tiêu chuẩn ngành, hỗ trợ các phương thức xác thực máy khách linh hoạt dựa trên chứng chỉ, thẻ thông minh và/hoặc thông tin đăng nhập bằng tên người dùng/mật khẩu, và cho phép các chính sách kiểm soát truy cập cụ thể của người dùng hoặc nhóm sử dụng các quy tắc tường lửa được áp dụng cho giao diện VPN ảo.

### Vận hành nút {#operating-the-node}

Bạn nên theo dõi thường xuyên nút của bạn để chắc rằng nó đang chạy một cách đúng. Bạn có thể cần bảo dưỡng định kì.

#### Giữ cho nút luôn trực tuyến {#keeping-node-online}

Nút của bạn không cần phải trực tuyến mọi thời điểm, nhưng bạn nên giữ nó trực tuyến càng nhiều càng tốt giúp nó đồng bộ với mạng lưới. Bạn có thể tắt nó để làm mới nó, nhưng hãy hiểu như thế này:

- Tắt nó có thể tốn một vài phút nếu như trạng thái vẫn đang được viết vào ổ đĩa.
- Ép tắt đột ngột có thể làm tổn hại dữ liệu bắt buộc bạn phải tái đồng bộ hóa toàn bộ nút.
- Client của bạn sẽ mất đồng bộ mới mạng lưới và cần tái đồng bộ nếu như bạn khởi động lại nó. Trong khi nút bắt đầu đồng độ kể từ lúc nó bị tắt đi, quá tình có thể tốn thời gian tùy thuộc vào thời gian nó ngoại tuyến.

_Điều này không áp dụng cho các nút trình xác thực lớp đồng thuận._ Việc đưa nút của bạn ngoại tuyến sẽ ảnh hưởng đến tất cả các dịch vụ phụ thuộc vào nó. Nếu bạn đang chạy một nút cho mục đích _đặt cược_, bạn nên cố gắng giảm thiểu thời gian chết nhiều nhất có thể.

#### Tạo các dịch vụ máy khách {#creating-client-services}

Cân nhắc tạo một Service để chạy Client tự động khi bật lên. Ví dụ, trên các máy chủ Linux, một phương pháp hay là tạo một dịch vụ, ví dụ, với `systemd`, thực thi máy khách với cấu hình phù hợp, dưới một người dùng có các đặc quyền hạn chế và tự động khởi động lại.

#### Cập nhật máy khách {#updating-clients}

Bạn cần phải giữ cho phần mềm máy khách của bạn được cập nhật với các bản vá bảo mật, tính năng và [EIP](/eips/) mới nhất. Đặc biệt là trước các [phân nhánh cứng](/ethereum-forks/), hãy chắc chắn bạn đang chạy các phiên bản máy khách chính xác.

> Trước các bản cập nhật mạng quan trọng, EF sẽ đăng một bài trên [blog](https://blog.ethereum.org) của mình. Bạn có thể [đăng ký nhận các thông báo này](https://blog.ethereum.org/category/protocol#subscribe) để nhận thông báo qua thư khi nút của bạn cần cập nhật.

Cập nhật Client rất đơn giản. Mỗi Client có một chỉ dẫn cụ thể trong tài liệu của họ, nhưng quá trình này chỉ thường để tải phiên bản mới nhất và phải khởi động lại Client với tệp thực thi mới. Client sẽ quay trở về guồng cũ, nhưng với bản cập nhật mới.

Mỗi bản triển khai Client đều có một chuỗi String mà con người có thể đọc được, được dùng trong giao thức ngang hàng, nhưng cũng có thể truy cập từ dòng lệnh. Biến String này cho phép người dùng kiểm tra xem họ có đang chạy đúng phiên bản hay không, đồng thời cho phép các trình duyệt khối và các công cụ phân tích khác định lượng sự phân bố của từng Client cụ thể trên mạng lưới. Hãy tham khảo tài liệu hướng dẫn của từng client để biết thêm thông tin về phiên bản String.

#### Chạy các dịch vụ bổ sung {#running-additional-services}

Chạy nút của bạn cho phép bạn dung Service đòi hỏi truy cập vào RPC của Client Ethereum. Đây là các dịch vụ được xây dựng trên Ethereum như [các giải pháp lớp 2](/developers/docs/scaling/#layer-2-scaling), backend cho ví, trình khám phá khối, các công cụ cho nhà phát triển và cơ sở hạ tầng Ethereum khác.

#### Giám sát nút {#monitoring-the-node}

Để có thể theo dõi / đo lường nút của bạn, hãy cân nhắc thu thập số liệu. Client cung cấp các Endpoint số liệu nhờ đó bạn có dữ liệu toàn diện về nút của mình. Sử dụng các công cụ như [InfluxDB](https://www.influxdata.com/get-influxdb/) hoặc [Prometheus](https://prometheus.io/) để tạo cơ sở dữ liệu mà bạn có thể biến thành các hình ảnh hóa và biểu đồ trong phần mềm như [Grafana](https://grafana.com/). Có nhiều cách thiết lập để sử dụng phần mềm này và các bảng điều khiển Grafana khác nhau giúp bạn trực quan hóa nút của mình cũng như toàn bộ mạng lưới. Ví dụ, hãy xem [hướng dẫn về giám sát Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

Là một phần trong quá trình giám sát, hãy đảm bảo bạn theo dõi hiệu suất của máy. Trong quá trình đồng bộ ban đầu của nút, phần mềm Client có thể tiêu tốn rất nhiều CPU và RAM. Ngoài Grafana, bạn cũng có thể sử dụng các công cụ mà hệ điều hành cung cấp như htop hoặc uptime để thực hiện việc này.

## Đọc thêm {#further-reading}

- [Hướng dẫn Đặt cọc Ethereum](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, thường xuyên cập nhật_
- [Hướng dẫn | Cách thiết lập trình xác thực để đặt cược Ethereum trên mạng chính](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, thường xuyên cập nhật_
- [Hướng dẫn của ETHStaker về việc chạy các trình xác thực trên các mạng thử nghiệm](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, được cập nhật thường xuyên_
- [Ứng dụng mẫu AWS Blockchain Node Runner cho các Nút Ethereum](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS, thường xuyên cập nhật_
- [Câu hỏi thường gặp về The Merge cho các nhà khai thác nút](https://notes.ethereum.org/@launchpad/node-faq-merge) - _Tháng 7 năm 2022_
- [Phân tích các yêu cầu phần cứng để trở thành một nút xác thực đầy đủ của Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 tháng 9 năm 2018_
- [Chạy các nút đầy đủ Ethereum: Hướng dẫn cho người có ít động lực](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, ngày 7 tháng 11 năm 2019_
- [Chạy một nút Hyperledger Besu trên Mạng chính Ethereum: Lợi ích, Yêu cầu và Thiết lập](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 tháng 5 năm 2020_
- [Triển khai Máy khách Nethermind Ethereum với Ngăn xếp Giám sát](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 tháng 7 năm 2020_

## Các chủ đề liên quan {#related-topics}

- [Các nút và client](/developers/docs/nodes-and-clients/)
- [Các khối](/developers/docs/blocks/)
- [Các mạng](/developers/docs/networks/)
