---
title: PeerDAS
description: "Tìm hiểu về PeerDAS, một phần của bản nâng cấp giao thức Fusaka Ethereum"
lang: vi
---

# PeerDAS {#peer-das}

Giao thức Ethereum đang trải qua đợt nâng cấp mở rộng quy mô quan trọng nhất kể từ khi [giới thiệu các giao dịch blob với EIP-4844](/roadmap/danksharding/). Là một phần của [bản nâng cấp Fusaka](/roadmap/fusaka/), PeerDAS giới thiệu một cách xử lý dữ liệu blob mới, mang lại sự gia tăng khoảng một bậc độ lớn về dung lượng **[tính khả dụng của dữ liệu (DA)](/developers/docs/data-availability/)** cho các L2.

[Thêm thông tin về lộ trình mở rộng quy mô blob](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Khả năng mở rộng {#scalability}

Tầm nhìn của Ethereum là trở thành một nền tảng trung lập, bảo mật và phi tập trung dành cho tất cả mọi người trên thế giới. Khi việc sử dụng mạng tăng lên, điều này đòi hỏi phải cân bằng bộ ba bất khả thi về quy mô, bảo mật và tính phi tập trung của mạng. Nếu Ethereum chỉ đơn giản tăng lượng dữ liệu mà mạng xử lý trong thiết kế hiện tại, nó sẽ có nguy cơ làm quá tải các [nút mà Ethereum dựa vào để đạt được tính phi tập trung](/developers/docs/nodes-and-clients/). Khả năng mở rộng quy mô đòi hỏi thiết kế cơ chế nghiêm ngặt để giảm thiểu sự đánh đổi.

Một trong những chiến lược để đạt được mục tiêu này là cho phép một hệ sinh thái đa dạng các giải pháp mở rộng quy mô lớp 2 thay vì xử lý tất cả các giao dịch trên Mạng chính [lớp 1 (L1)](/glossary/#layer-1). [Lớp 2 (L2)](/glossary/#layer-2) hay [rollup](/glossary#rollups) xử lý các giao dịch trên các chuỗi riêng của chúng và sử dụng Ethereum để xác minh và bảo mật. Chỉ xuất bản các cam kết quan trọng về bảo mật và nén các tải trọng cho phép các L2 sử dụng dung lượng DA của Ethereum hiệu quả hơn. Đổi lại, L1 mang ít dữ liệu hơn mà không ảnh hưởng đến các đảm bảo bảo mật, trong khi các L2 có thể thu hút nhiều người dùng hơn với chi phí gas thấp hơn. Ban đầu, các L2 xuất bản dữ liệu dưới dạng `calldata` trong các giao dịch thông thường, điều này đã cạnh tranh với các giao dịch L1 về gas và không thực tế cho việc cung cấp dữ liệu hàng loạt.

## Proto-Danksharding {#proto-danksharding}

Bước tiến lớn đầu tiên hướng tới việc mở rộng quy mô L2 là bản nâng cấp Dencun, giới thiệu [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Bản nâng cấp này đã tạo ra một loại dữ liệu chuyên dụng mới cho các rollup được gọi là blob. [Blob](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), hay đối tượng nhị phân lớn, là các mẩu dữ liệu tùy ý có vòng đời ngắn, không cần thực thi trên Máy ảo Ethereum (EVM) và các nút chỉ lưu trữ trong một khoảng thời gian giới hạn. Việc xử lý hiệu quả hơn này cho phép các L2 xuất bản nhiều dữ liệu hơn lên Ethereum và mở rộng quy mô hơn nữa.

Mặc dù đã có những lợi ích mạnh mẽ cho việc mở rộng quy mô, việc sử dụng blob chỉ là một phần của mục tiêu cuối cùng. Trong giao thức hiện tại, mọi nút trong mạng vẫn cần tải xuống mọi blob. Điểm nghẽn trở thành băng thông mà mỗi nút riêng lẻ yêu cầu, với lượng dữ liệu cần tải xuống tăng trực tiếp theo số lượng blob.

Ethereum không thỏa hiệp về tính phi tập trung, và băng thông là một trong những yếu tố nhạy cảm nhất. Ngay cả với máy tính mạnh mẽ có sẵn rộng rãi cho bất kỳ ai có đủ khả năng chi trả, [các giới hạn băng thông tải lên](https://www.speedtest.net/global-index) ngay cả ở các thành phố đô thị hóa cao ở các quốc gia phát triển (chẳng hạn như [Đức](https://www.speedtest.net/global-index/germany), [Bỉ](https://www.speedtest.net/global-index/belgium), [Úc](https://www.speedtest.net/global-index/australia) hoặc [Hoa Kỳ](https://www.speedtest.net/global-index/united-states)) có thể hạn chế các nút chỉ có thể chạy từ các trung tâm dữ liệu nếu các yêu cầu về băng thông không được điều chỉnh cẩn thận.

Các nhà vận hành nút có yêu cầu về băng thông và không gian đĩa ngày càng cao khi số lượng blob tăng lên. Kích thước và số lượng blob bị giới hạn bởi những ràng buộc này. Mỗi blob có thể mang tới 128kb dữ liệu với trung bình 6 blob mỗi khối. Đây mới chỉ là bước đầu tiên hướng tới một thiết kế trong tương lai sử dụng blob một cách hiệu quả hơn nữa.

## Lấy mẫu tính khả dụng của dữ liệu {#das}

[Tính khả dụng của dữ liệu](/developers/docs/data-availability/) là sự đảm bảo rằng tất cả dữ liệu cần thiết để xác thực chuỗi một cách độc lập đều có thể truy cập được bởi tất cả những người tham gia mạng. Nó đảm bảo rằng dữ liệu đã được xuất bản đầy đủ và có thể được sử dụng để xác minh một cách không cần tin cậy trạng thái mới của chuỗi hoặc các giao dịch đến.

Các blob của Ethereum cung cấp một đảm bảo mạnh mẽ về tính khả dụng của dữ liệu, đảm bảo tính bảo mật cho các L2. Để làm được điều này, các nút Ethereum cần tải xuống và lưu trữ toàn bộ các blob. Nhưng sẽ thế nào nếu chúng ta có thể phân phối các blob trong mạng một cách hiệu quả hơn và tránh được hạn chế này?

Một cách tiếp cận khác để lưu trữ dữ liệu và đảm bảo tính khả dụng của nó là **lấy mẫu tính khả dụng của dữ liệu (DAS)**. Thay vì mọi máy tính chạy Ethereum đều lưu trữ đầy đủ từng blob, DAS giới thiệu một sự phân công lao động phi tập trung. Nó phá vỡ gánh nặng xử lý dữ liệu bằng cách phân phối các tác vụ nhỏ hơn, dễ quản lý hơn trên toàn bộ mạng lưới các nút. Các blob được chia thành các mảnh và mỗi nút chỉ tải xuống một vài mảnh bằng cách sử dụng một cơ chế phân phối ngẫu nhiên đồng đều trên tất cả các nút.

Điều này tạo ra một vấn đề mới—chứng minh tính khả dụng và tính toàn vẹn của dữ liệu. Làm thế nào mạng có thể đảm bảo rằng dữ liệu có sẵn và tất cả đều chính xác khi các nút riêng lẻ chỉ giữ những mảnh nhỏ? Một nút độc hại có thể cung cấp dữ liệu giả và dễ dàng phá vỡ các đảm bảo mạnh mẽ về tính khả dụng của dữ liệu! Đây là lúc mật mã học phát huy tác dụng.

Để đảm bảo tính toàn vẹn của dữ liệu, EIP-4844 đã được triển khai với các cam kết KZG. Đây là những bằng chứng mật mã được tạo ra khi một blob mới được thêm vào mạng. Một bằng chứng nhỏ được bao gồm trong mỗi khối, và các nút có thể xác minh rằng các blob nhận được tương ứng với cam kết KZG của khối.

DAS là một cơ chế được xây dựng trên cơ sở này và đảm bảo dữ liệu vừa chính xác vừa khả dụng. Lấy mẫu là một quá trình trong đó một nút chỉ truy vấn một phần nhỏ của dữ liệu và xác minh nó với cam kết. KZG là một sơ đồ cam kết đa thức có nghĩa là bất kỳ điểm nào trên đường cong đa thức đều có thể được xác minh. Bằng cách chỉ kiểm tra một vài điểm trên đa thức, ứng dụng thực hiện việc lấy mẫu có thể có một đảm bảo xác suất mạnh mẽ rằng dữ liệu là khả dụng.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) là một đề xuất cụ thể triển khai cơ chế DAS trong Ethereum, đánh dấu có lẽ là bản nâng cấp lớn nhất kể từ The Merge. PeerDAS được thiết kế để mở rộng dữ liệu blob, chia nó thành các cột và phân phối một tập hợp con cho các nút.

Ethereum vay mượn một số phép toán thông minh để đạt được điều này: nó áp dụng mã hóa xóa kiểu Reed-Solomon cho dữ liệu blob. Dữ liệu blob được biểu diễn dưới dạng một đa thức có các hệ số mã hóa dữ liệu, sau đó đánh giá đa thức đó tại các điểm bổ sung để tạo ra một blob mở rộng, làm tăng gấp đôi số lượng đánh giá. Phần thừa được thêm vào này cho phép phục hồi xóa: ngay cả khi một số đánh giá bị thiếu, blob gốc có thể được tái tạo lại miễn là ít nhất một nửa tổng số dữ liệu, bao gồm cả các mảnh mở rộng, đều có sẵn.

![Đa thức mở rộng](./polynomial.png)

Trong thực tế, đa thức này có hàng ngàn hệ số. Cam kết KZG là các giá trị chỉ vài byte, giống như một hàm băm, được tất cả các nút biết đến. Mỗi nút giữ đủ điểm dữ liệu có thể [tái tạo hiệu quả một tập hợp đầy đủ dữ liệu blob](https://arxiv.org/abs/2207.11079).

> Thông tin thú vị: kỹ thuật mã hóa tương tự đã được DVD sử dụng. Nếu bạn làm xước một đĩa DVD, đầu phát vẫn có thể đọc được nó nhờ vào mã hóa Reed-Solomon giúp bổ sung các mảnh còn thiếu của đa thức.

Trong lịch sử, dữ liệu trong các chuỗi khối, dù là khối hay blob, đều được phát sóng đến tất cả các nút. Với cách tiếp cận chia và lấy mẫu của PeerDAS, việc phát sóng mọi thứ cho mọi người không còn cần thiết nữa. Sau Fusaka, mạng lớp đồng thuận được tổ chức thành các chủ đề/mạng con gossip: các cột blob được gán cho các mạng con cụ thể, và mỗi nút đăng ký một tập hợp con được xác định trước và chỉ lưu giữ những mảnh đó.

Với PeerDAS, dữ liệu blob mở rộng được chia thành 128 mảnh gọi là cột. Dữ liệu được phân phối đến các nút này thông qua một giao thức gossip chuyên dụng trên các mạng con cụ thể mà chúng đăng ký. Mỗi nút thông thường trên mạng tham gia vào ít nhất 8 mạng con cột được chọn ngẫu nhiên. Việc nhận dữ liệu chỉ từ 8 trong số 128 mạng con có nghĩa là nút mặc định này chỉ nhận 1/16 tổng số dữ liệu, nhưng vì dữ liệu đã được mở rộng, con số này tương đương 1/8 dữ liệu gốc.

Điều này cho phép một giới hạn mở rộng quy mô lý thuyết mới gấp 8 lần so với sơ đồ "mọi người tải xuống mọi thứ" hiện tại. Với các nút đăng ký các mạng con ngẫu nhiên khác nhau phục vụ các cột blob, xác suất chúng được phân phối đồng đều là rất cao và do đó mọi mảnh dữ liệu đều tồn tại ở đâu đó trong mạng. Các nút chạy trình xác thực được yêu cầu đăng ký nhiều mạng con hơn với mỗi trình xác thực mà chúng chạy.

> Mỗi nút có một ID duy nhất được tạo ngẫu nhiên, nó thường đóng vai trò là danh tính công khai cho các kết nối. Trong PeerDAS, số này được sử dụng để xác định tập hợp các mạng con ngẫu nhiên mà nó phải đăng ký, dẫn đến sự phân phối ngẫu nhiên đồng đều của tất cả dữ liệu blob.

Khi một nút tái tạo thành công dữ liệu gốc, nó sẽ phân phối lại các cột đã khôi phục trở lại mạng, chủ động vá mọi lỗ hổng dữ liệu và nâng cao khả năng phục hồi của toàn hệ thống. Các nút được kết nối với các trình xác thực có tổng số dư ≥4096 ETH phải là một siêu nút và do đó phải đăng ký tất cả các mạng con cột dữ liệu và lưu giữ tất cả các cột. Các siêu nút này sẽ liên tục vá các lỗ hổng dữ liệu. Bản chất tự phục hồi theo xác suất của giao thức cho phép đảm bảo tính khả dụng mạnh mẽ mà không giới hạn các nhà vận hành tại nhà chỉ giữ một phần dữ liệu.

![Các nút đăng ký các cột được phân phối qua các mạng con](./subnets.png)

Tính khả dụng của dữ liệu có thể được xác nhận bởi bất kỳ nút nào chỉ giữ một tập hợp con nhỏ của dữ liệu blob nhờ vào cơ chế lấy mẫu được mô tả ở trên. Tính khả dụng này được thực thi: các trình xác thực phải tuân theo các quy tắc lựa chọn phân nhánh (fork-choice) mới, nghĩa là họ sẽ chỉ chấp nhận và bỏ phiếu cho các khối sau khi đã xác minh tính khả dụng của dữ liệu.

Tác động trực tiếp đến người dùng (đặc biệt là người dùng L2) là phí thấp hơn. Với không gian dành cho dữ liệu rollup nhiều hơn 8 lần, các hoạt động của người dùng trên chuỗi của họ sẽ càng rẻ hơn theo thời gian. Nhưng việc giảm phí sau Fusaka sẽ cần thời gian và phụ thuộc vào BPO.

## Chỉ tham số Blob (BPO) {#bpo}

Về mặt lý thuyết, mạng sẽ có thể xử lý nhiều hơn 8 lần số lượng blob, nhưng việc tăng số lượng blob là một thay đổi cần được kiểm tra kỹ lưỡng và thực hiện an toàn theo từng bước. Các mạng thử nghiệm cung cấp đủ sự tự tin để triển khai các tính năng trên Mạng chính nhưng chúng ta cần đảm bảo sự ổn định của mạng p2p trước khi cho phép số lượng blob cao hơn đáng kể.

Để tăng dần số lượng blob mục tiêu trên mỗi khối mà không làm quá tải mạng, Fusaka giới thiệu các phân nhánh **[Chỉ tham số Blob (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Không giống như các phân nhánh thông thường cần sự phối hợp, đồng thuận và cập nhật phần mềm trên toàn hệ sinh thái, [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) là các nâng cấp được lập trình sẵn giúp tăng số lượng blob tối đa theo thời gian mà không cần can thiệp.

Điều này có nghĩa là ngay sau khi Fusaka kích hoạt và PeerDAS đi vào hoạt động, số lượng blob sẽ không thay đổi. Số lượng blob sẽ bắt đầu tăng gấp đôi sau mỗi vài tuần cho đến khi đạt tối đa 48, trong khi các nhà phát triển theo dõi để đảm bảo cơ chế hoạt động như mong đợi và không gây ra tác động bất lợi cho các nút đang chạy mạng.

## Các hướng đi trong tương lai {#future-directions}

PeerDAS chỉ là một bước [hướng tới tầm nhìn mở rộng quy mô lớn hơn của FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), hay Danksharding. Trong khi PeerDAS sử dụng mã hóa xóa 1D cho từng blob riêng lẻ, Danksharding đầy đủ sẽ sử dụng một sơ đồ mã hóa xóa 2D hoàn chỉnh hơn trên toàn bộ ma trận dữ liệu blob. Việc mở rộng dữ liệu theo hai chiều tạo ra các thuộc tính thừa thậm chí còn mạnh hơn và việc tái tạo cũng như xác minh hiệu quả hơn. Để hiện thực hóa FullDAS sẽ cần tối ưu hóa đáng kể về mạng và giao thức, cùng với nghiên cứu bổ sung.

## Đọc thêm {#further-reading}

- [PeerDAS: Lấy mẫu Tính khả dụng dữ liệu ngang hàng của Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Tài liệu về PeerDAS của Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Chứng minh tính bảo mật của PeerDAS mà không cần AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik nói về PeerDAS, tác động của nó và việc thử nghiệm Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)