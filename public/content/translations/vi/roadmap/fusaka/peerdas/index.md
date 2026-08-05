---
title: PeerDAS
description: Tìm hiểu về PeerDAS như một phần của bản nâng cấp giao thức Ethereum Fusaka
lang: vi
authors: ["Nixo", "Mario Havel"]
---

Giao thức [Ethereum](/) đang trải qua bản nâng cấp mở rộng quy mô quan trọng nhất kể từ khi [giới thiệu các giao dịch khối dữ liệu với EIP-4844](/roadmap/danksharding/). Là một phần của [bản nâng cấp Fusaka](/roadmap/fusaka/), PeerDAS giới thiệu một cách mới để xử lý dữ liệu của khối dữ liệu, mang lại sự gia tăng công suất **[tính khả dụng của dữ liệu (DA)](/developers/docs/data-availability/)** lên khoảng một bậc độ lớn cho các l2.

[Tìm hiểu thêm về lộ trình mở rộng quy mô khối dữ liệu](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Khả năng mở rộng {#scalability}

Tầm nhìn của Ethereum là trở thành một nền tảng trung lập, an toàn và phi tập trung dành cho tất cả mọi người trên thế giới. Khi việc sử dụng mạng lưới tăng lên, điều này đòi hỏi phải cân bằng bộ ba bất khả thi về quy mô, bảo mật và sự phi tập trung của mạng lưới. Nếu Ethereum chỉ đơn giản là tăng lượng dữ liệu được xử lý bởi mạng lưới trong thiết kế hiện tại, nó sẽ có nguy cơ làm quá tải các [nút mà Ethereum dựa vào cho sự phi tập trung của nó](/developers/docs/nodes-and-clients/). Khả năng mở rộng đòi hỏi thiết kế cơ chế chặt chẽ nhằm giảm thiểu sự đánh đổi.

Một trong những chiến lược để đạt được mục tiêu này là cho phép một hệ sinh thái đa dạng các giải pháp mở rộng quy mô lớp 2 thay vì xử lý tất cả các giao dịch trên Mạng chính [lớp 1 (l1)](/glossary/#layer-1). [Lớp 2 (l2)](/glossary/#layer-2) hoặc [bản cuộn](/glossary#rollups) xử lý các giao dịch trên các chuỗi riêng biệt của chúng và sử dụng Ethereum để xác minh và bảo mật. Việc chỉ xuất bản các cam kết quan trọng về bảo mật và nén tải trọng cho phép các l2 sử dụng công suất DA của Ethereum hiệu quả hơn. Đổi lại, l1 mang ít dữ liệu hơn mà không làm giảm các đảm bảo bảo mật, trong khi các l2 thu hút thêm nhiều người dùng với chi phí Gas thấp hơn. Ban đầu, các l2 đã xuất bản dữ liệu dưới dạng `calldata` trong các giao dịch thông thường, điều này cạnh tranh với các giao dịch l1 về Gas và không thực tế đối với tính khả dụng của dữ liệu khối lượng lớn.

## Proto-Danksharding {#proto-danksharding}

Bước tiến lớn đầu tiên hướng tới việc mở rộng quy mô l2 là bản nâng cấp Dencun, giới thiệu [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Bản nâng cấp này đã tạo ra một loại dữ liệu chuyên biệt mới cho các bản cuộn được gọi là khối dữ liệu. [Khối dữ liệu](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), hay các đối tượng nhị phân lớn, là những phần dữ liệu tùy ý tồn tại trong thời gian ngắn không cần thực thi EVM và các nút chỉ lưu trữ trong một khoảng thời gian giới hạn. Quá trình xử lý hiệu quả hơn này cho phép các l2 xuất bản nhiều dữ liệu hơn lên Ethereum và mở rộng quy mô xa hơn nữa. 

Mặc dù đã có những lợi ích mạnh mẽ cho việc mở rộng quy mô, việc sử dụng các khối dữ liệu chỉ là một phần của mục tiêu cuối cùng. Trong giao thức hiện tại, mọi nút trong mạng lưới vẫn cần tải xuống mọi khối dữ liệu. Nút thắt cổ chai trở thành băng thông yêu cầu của các nút riêng lẻ, với lượng dữ liệu cần tải xuống tăng trực tiếp theo số lượng khối dữ liệu cao hơn. 

Ethereum không thỏa hiệp về sự phi tập trung và băng thông là một trong những yếu tố nhạy cảm nhất. Ngay cả khi khả năng tính toán mạnh mẽ có sẵn rộng rãi cho bất kỳ ai có đủ khả năng chi trả, [những hạn chế về băng thông tải lên](https://www.speedtest.net/global-index) ngay cả ở các thành phố đô thị hóa cao tại các quốc gia phát triển (chẳng hạn như [Đức](https://www.speedtest.net/global-index/germany), [Bỉ](https://www.speedtest.net/global-index/belgium), [Úc](https://www.speedtest.net/global-index/australia) hoặc [Hoa Kỳ](https://www.speedtest.net/global-index/united-states)) có thể hạn chế các nút chỉ có thể chạy từ các trung tâm dữ liệu nếu các yêu cầu về băng thông không được tinh chỉnh cẩn thận.

Các nhà điều hành nút có yêu cầu ngày càng cao về băng thông và không gian ổ đĩa khi các khối dữ liệu tăng lên. Kích thước và số lượng của các khối dữ liệu bị giới hạn bởi những ràng buộc này. Mỗi khối dữ liệu có thể mang tới 128kb dữ liệu với trung bình 6 khối dữ liệu mỗi khối. Đây chỉ là bước đầu tiên hướng tới một thiết kế trong tương lai sử dụng các khối dữ liệu theo cách hiệu quả hơn nữa.

## Lấy mẫu tính khả dụng của dữ liệu {#das}

[Tính khả dụng của dữ liệu](/developers/docs/data-availability/) là sự đảm bảo rằng tất cả dữ liệu cần thiết để xác thực chuỗi một cách độc lập đều có thể truy cập được đối với tất cả những người tham gia mạng lưới. Nó đảm bảo rằng dữ liệu đã được xuất bản đầy đủ và có thể được sử dụng để xác minh không cần tin cậy trạng thái mới của chuỗi hoặc các giao dịch sắp tới. 

Các khối dữ liệu Ethereum cung cấp một sự đảm bảo mạnh mẽ về tính khả dụng của dữ liệu nhằm đảm bảo tính bảo mật của các l2. Để làm điều này, các nút Ethereum cần tải xuống và lưu trữ toàn bộ các khối dữ liệu. Nhưng điều gì sẽ xảy ra nếu chúng ta có thể phân phối các khối dữ liệu trong mạng lưới hiệu quả hơn và tránh được hạn chế này? 

Một cách tiếp cận khác để lưu trữ dữ liệu và đảm bảo tính khả dụng của nó là **lấy mẫu tính khả dụng của dữ liệu (DAS)**. Thay vì mọi máy tính chạy Ethereum lưu trữ đầy đủ từng khối dữ liệu, DAS giới thiệu một sự phân công lao động phi tập trung. Nó phá vỡ gánh nặng xử lý dữ liệu bằng cách phân phối các tác vụ nhỏ hơn, dễ quản lý trên toàn bộ mạng lưới các nút. Các khối dữ liệu được chia thành nhiều phần và mỗi nút chỉ tải xuống một vài phần bằng cách sử dụng cơ chế phân phối ngẫu nhiên đồng đều trên tất cả các nút. 

Điều này đưa ra một vấn đề mới—chứng minh tính khả dụng và tính toàn vẹn của dữ liệu. Làm thế nào mạng lưới có thể đảm bảo rằng dữ liệu có sẵn và tất cả đều chính xác khi các nút riêng lẻ chỉ giữ những phần nhỏ? Một nút độc hại có thể cung cấp dữ liệu giả mạo và dễ dàng phá vỡ các đảm bảo mạnh mẽ về tính khả dụng của dữ liệu! Đây là lúc mật mã học phát huy tác dụng. 

Để đảm bảo tính toàn vẹn của dữ liệu, EIP-4844 đã được triển khai với các cam kết KZG. Đây là những bằng chứng mật mã học được tạo ra khi một khối dữ liệu mới được thêm vào mạng lưới. Một bằng chứng nhỏ được bao gồm trong mỗi khối và các nút có thể xác minh rằng các khối dữ liệu nhận được tương ứng với cam kết KZG của khối.

DAS là một cơ chế được xây dựng dựa trên điều này và đảm bảo dữ liệu vừa chính xác vừa có sẵn. Lấy mẫu là một quá trình trong đó một nút chỉ truy vấn một phần nhỏ dữ liệu và xác minh nó dựa trên cam kết. KZG là một sơ đồ cam kết đa thức, có nghĩa là bất kỳ điểm đơn lẻ nào trên đường cong đa thức đều có thể được xác minh. Bằng cách chỉ kiểm tra một vài điểm trên đa thức, máy khách thực hiện việc lấy mẫu có thể có một sự đảm bảo xác suất mạnh mẽ rằng dữ liệu có sẵn. 

## PeerDAS {#peer-das-2}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) là một đề xuất cụ thể triển khai cơ chế DAS trong Ethereum, đánh dấu bản nâng cấp có lẽ là lớn nhất kể từ The Merge. PeerDAS được thiết kế để mở rộng dữ liệu của khối dữ liệu, chia nó thành các cột và phân phối một tập hợp con cho các nút.

Ethereum mượn một số phép toán thông minh để đạt được điều này: nó áp dụng mã hóa xóa kiểu Reed-Solomon cho dữ liệu của khối dữ liệu. Dữ liệu của khối dữ liệu được biểu diễn dưới dạng một đa thức có các hệ số mã hóa dữ liệu, sau đó đánh giá đa thức đó tại các điểm bổ sung để tạo ra một khối dữ liệu mở rộng, nhân đôi số lượng đánh giá. Sự dư thừa được thêm vào này cho phép phục hồi xóa: ngay cả khi một số đánh giá bị thiếu, khối dữ liệu gốc vẫn có thể được tái tạo lại miễn là có sẵn ít nhất một nửa tổng số dữ liệu, bao gồm cả các phần mở rộng.

![Extended polynomial](./polynomial.png)

Trên thực tế, đa thức này có hàng ngàn hệ số. Các cam kết KZG là các giá trị gồm vài byte, giống như một mã băm, được biết đến bởi tất cả các nút. Mọi nút nắm giữ đủ các điểm dữ liệu đều có thể [tái tạo lại một cách hiệu quả một tập hợp đầy đủ dữ liệu của khối dữ liệu](https://arxiv.org/abs/2207.11079). 

> Sự thật thú vị: kỹ thuật mã hóa tương tự đã được sử dụng bởi đĩa DVD. Nếu bạn làm xước một đĩa DVD, đầu phát vẫn có thể đọc được nó nhờ mã hóa Reed-Solomon bổ sung các phần còn thiếu của đa thức. 

Về mặt lịch sử, dữ liệu trong các chuỗi khối, cho dù là các khối hay các khối dữ liệu, đều được phát sóng tới tất cả các nút. Với cách tiếp cận chia nhỏ và lấy mẫu của PeerDAS, việc phát sóng mọi thứ cho mọi người không còn cần thiết nữa. Sau Fusaka, mạng lưới lớp đồng thuận được tổ chức thành các chủ đề/mạng con của giao thức lan truyền: các cột của khối dữ liệu được gán cho các mạng con cụ thể và mỗi nút đăng ký các tập hợp con được xác định trước và chỉ lưu giữ những phần đó.

Với PeerDAS, dữ liệu của khối dữ liệu mở rộng được chia thành 128 phần gọi là các cột. Dữ liệu được phân phối đến các nút này thông qua một giao thức lan truyền chuyên dụng trên các mạng con cụ thể mà chúng đăng ký. Mỗi nút thông thường trên mạng lưới tham gia vào ít nhất 8 mạng con cột được chọn ngẫu nhiên. Việc chỉ nhận dữ liệu từ 8 trong số 128 mạng con có nghĩa là nút mặc định này chỉ nhận được 1/16 tổng số dữ liệu, nhưng vì dữ liệu đã được mở rộng nên đây là 1/8 dữ liệu gốc. 

Điều này cho phép một giới hạn mở rộng quy mô lý thuyết mới gấp 8 lần so với lược đồ "mọi người tải xuống mọi thứ" hiện tại. Với việc các nút đăng ký các mạng con ngẫu nhiên khác nhau phục vụ các cột của khối dữ liệu, xác suất rất cao là chúng được phân phối đồng đều và do đó mọi phần dữ liệu đều tồn tại ở đâu đó trong mạng lưới. Các nút chạy trình xác thực được yêu cầu đăng ký nhiều mạng con hơn với mỗi trình xác thực mà chúng chạy.

> Mỗi nút có một ID được tạo ngẫu nhiên duy nhất, nó thường đóng vai trò là danh tính công khai của nó cho các kết nối. Trong PeerDAS, con số này được sử dụng để xác định các mạng con tập hợp ngẫu nhiên mà nó phải đăng ký, dẫn đến sự phân phối ngẫu nhiên đồng đều của tất cả dữ liệu của khối dữ liệu.

Khi một nút tái tạo thành công dữ liệu gốc, sau đó nó sẽ phân phối lại các cột đã phục hồi trở lại mạng lưới, chủ động chữa lành bất kỳ khoảng trống dữ liệu nào và tăng cường khả năng phục hồi tổng thể của hệ thống. Các nút được kết nối với các trình xác thực có số dư kết hợp ≥4096 ETH phải là một siêu nút và do đó phải đăng ký tất cả các mạng con cột dữ liệu và lưu giữ tất cả các cột. Những siêu nút này sẽ liên tục chữa lành các khoảng trống dữ liệu. Bản chất tự chữa lành theo xác suất của giao thức cho phép các đảm bảo tính khả dụng mạnh mẽ trong khi không giới hạn các nhà điều hành tại nhà chỉ nắm giữ các phần của dữ liệu. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

Tính khả dụng của dữ liệu có thể được xác nhận bởi bất kỳ nút nào chỉ nắm giữ một tập hợp con nhỏ dữ liệu của khối dữ liệu nhờ vào cơ chế lấy mẫu được mô tả ở trên. Tính khả dụng này được thực thi: các trình xác thực phải tuân theo các quy tắc lựa chọn phân nhánh mới, nghĩa là chúng sẽ chỉ chấp nhận và bỏ phiếu cho các khối sau khi chúng đã xác minh tính khả dụng của dữ liệu.

Tác động trực tiếp đến người dùng (đặc biệt là người dùng l2) là mức phí thấp hơn. Với không gian cho dữ liệu của bản cuộn nhiều hơn gấp 8 lần, các hoạt động của người dùng trên chuỗi của họ trở nên rẻ hơn theo thời gian. Nhưng mức phí thấp hơn sau Fusaka sẽ cần thời gian và phụ thuộc vào các BPO.

## Chỉ tham số khối dữ liệu (BPO) {#bpo}

Về mặt lý thuyết, mạng lưới sẽ có thể xử lý số lượng khối dữ liệu nhiều hơn gấp 8 lần, nhưng sự gia tăng khối dữ liệu là một thay đổi cần được kiểm tra kỹ lưỡng và thực thi an toàn theo từng bước. Các mạng thử nghiệm cung cấp đủ sự tự tin để triển khai các tính năng trên Mạng chính nhưng chúng ta cần đảm bảo tính ổn định của mạng lưới p2p trước khi kích hoạt số lượng khối dữ liệu cao hơn đáng kể. 

Để tăng dần số lượng khối dữ liệu mục tiêu trên mỗi khối mà không làm quá tải mạng lưới, Fusaka giới thiệu các phân nhánh **[Chỉ tham số khối dữ liệu (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Không giống như các phân nhánh thông thường cần sự phối hợp, thỏa thuận và cập nhật phần mềm trên toàn hệ sinh thái, [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) là các bản nâng cấp được lập trình sẵn giúp tăng số lượng khối dữ liệu tối đa theo thời gian mà không cần can thiệp.

Điều này có nghĩa là ngay sau khi Fusaka kích hoạt và PeerDAS đi vào hoạt động, số lượng khối dữ liệu sẽ không thay đổi. Số lượng khối dữ liệu sẽ bắt đầu tăng gấp đôi sau mỗi vài tuần cho đến khi đạt tối đa 48, trong khi các nhà phát triển theo dõi để đảm bảo cơ chế hoạt động như mong đợi và không có tác động bất lợi đến các nút đang chạy mạng lưới.

## Các hướng đi trong tương lai {#future-directions}

PeerDAS chỉ là một bước [hướng tới tầm nhìn mở rộng quy mô lớn hơn của FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), hay danksharding. Trong khi PeerDAS sử dụng mã hóa xóa 1D cho từng khối dữ liệu riêng lẻ, danksharding đầy đủ sẽ sử dụng sơ đồ mã hóa xóa 2D hoàn chỉnh hơn trên toàn bộ ma trận dữ liệu của khối dữ liệu. Việc mở rộng dữ liệu theo hai chiều tạo ra các thuộc tính dư thừa thậm chí còn mạnh mẽ hơn cùng với việc tái tạo và xác minh hiệu quả hơn. Việc hiện thực hóa FullDAS sẽ đòi hỏi những tối ưu hóa đáng kể về mạng lưới và giao thức, cùng với các nghiên cứu bổ sung.

## Đọc thêm {#further-reading}

- [PeerDAS: Lấy mẫu tính khả dụng của dữ liệu ngang hàng bởi Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Tài liệu về PeerDAS của Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Chứng minh tính bảo mật của PeerDAS mà không cần AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik nói về PeerDAS, tác động của nó và việc thử nghiệm Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)