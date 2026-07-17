---
title: "Cách xây dựng các ứng dụng quyền riêng tư trên Ethereum với bằng chứng không kiến thức"
description: "Một mô hình có thể tái sử dụng hỗ trợ việc bỏ phiếu ẩn danh, bộ trộn, airdrop và hệ thống thành viên trên Ethereum. Tìm hiểu chu trình cam kết-bộ triệt tiêu-bằng chứng và cách các công cụ không tri thức giúp việc xây dựng trở nên thực tế hiện nay."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "bằng chứng không kiến thức"
  - "quyền riêng tư"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: "Các ứng dụng quyền riêng tư trên Ethereum"
lang: vi
---

Theo thiết kế, Ethereum hoàn toàn công khai. Mọi địa chỉ, số dư, giao dịch, lệnh gọi hợp đồng và sự kiện đều hiển thị với bất kỳ ai có trình khám phá khối. Sự minh bạch đó rất hữu ích khi bạn muốn khả năng xác minh. Nó lại là một vấn đề khi người dùng cần bỏ phiếu, yêu cầu nhận, rút tiền hoặc chứng minh tư cách thành viên mà không liên kết mọi hành động trở lại cùng một ví.

Tư cách thành viên ẩn danh là mô hình có thể tái sử dụng hỗ trợ một lớp lớn các ứng dụng quyền riêng tư trên Ethereum. Mọi người đăng ký trước, sau đó chứng minh họ thuộc về nhóm mà không tiết lộ họ là thành viên nào. Bằng chứng không kiến thức là cầu nối giữa ví đăng ký và ví thực hiện hành động, và cầu nối này không tiết lộ ai đã đi qua nó.

Sản phẩm xung quanh có thể thay đổi, nhưng bộ khung quyền riêng tư vẫn giữ nguyên.

## Mô hình, được giải thích thông qua việc bỏ phiếu ẩn danh {#the-pattern-explained-through-anonymous-voting}

Mô hình này có ba phần. Một cam kết đăng ký từng thành viên. Một cây Merkle biến những cam kết đó thành một đám đông. Một bằng chứng và một bộ triệt tiêu cho phép một thành viên hành động một lần mà không tiết lộ thành viên nào đã hành động.

### Bước một: đăng ký {#step-one-registering}

Mỗi cử tri tạo ra hai giá trị riêng tư ngoài chuỗi, bí mật và bộ triệt tiêu. Cử tri băm những giá trị đó thành một cam kết công khai, sau đó đăng ký cam kết đó trên chuỗi.

Cam kết là hồ sơ đăng ký công khai. Bí mật và bộ triệt tiêu là ghi chú riêng tư mà cử tri cần sau này. Mất ghi chú và cử tri không thể chứng minh tư cách thành viên. Rò rỉ nó và người khác có thể bỏ phiếu thay cho người dùng.

Vì cam kết là một mã băm, những người quan sát không thể khôi phục các giá trị riêng tư bên trong nó. Cam kết cho biết "ai đó đã đăng ký" mà không tiết lộ ai sẽ sử dụng đăng ký đó sau này.

### Bước hai: xây dựng đám đông {#step-two-building-the-crowd}

Khi có nhiều cử tri đăng ký hơn, ứng dụng thu thập các cam kết của họ vào một cây Merkle. Một cây Merkle nén một danh sách dài các giá trị thành một mã băm duy nhất, được gọi là gốc. Thay đổi bất kỳ giá trị nào trong danh sách và mã băm sẽ thay đổi, vì vậy gốc hoạt động như một bản tóm tắt chống giả mạo của toàn bộ tập hợp.

Cây đó là tập ẩn danh của bạn. Nếu có mười người dùng trong cây, một người quan sát có thể thu hẹp một hành động sau đó xuống một trong mười người đó. Nếu có mười nghìn người dùng trong cây, hành động đó sẽ khó liên kết với một người hơn rất nhiều. Một ứng dụng riêng tư với tập ẩn danh nhỏ bé thường không thực sự riêng tư, ngay cả khi mật mã học là chính xác.

### Bước ba: hành động ẩn danh {#step-three-acting-anonymously}

Khi cuộc thăm dò mở ra, cử tri không nên bỏ phiếu từ cùng một ví đã đăng ký cam kết. Việc bỏ phiếu từ ví đăng ký sẽ liên kết trực tiếp lá phiếu trở lại người đăng ký và phá hỏng công sức bảo vệ quyền riêng tư. Thay vào đó, cử tri tạo ra một bằng chứng không kiến thức. Tuyên bố được mã hóa thành một mạch nói rằng: "Tôi biết các giá trị riêng tư tạo ra một cam kết đã đăng ký và tôi đang tiết lộ mã băm bộ triệt tiêu chính xác cho cuộc thăm dò này."

Bằng chứng thuyết phục hợp đồng trình xác minh rằng tuyên bố đó là đúng. Nó không tiết lộ bí mật, bộ triệt tiêu hoặc cam kết nào đã được sử dụng.

Bộ triệt tiêu là thứ ngăn chặn việc bỏ phiếu kép. Cùng với bằng chứng, cử tri công bố một mã băm bộ triệt tiêu. Hợp đồng bỏ phiếu lưu trữ mã băm đó sau khi chấp nhận lá phiếu. Nếu cùng một ghi chú riêng tư được sử dụng lại cho cùng một cuộc thăm dò, nó sẽ tạo ra cùng một mã băm bộ triệt tiêu và hợp đồng sẽ từ chối lá phiếu thứ hai. Kết hợp với bằng chứng, điều này khiến hợp đồng chỉ biết rằng một cử tri đã đăng ký nào đó đã hành động một lần, chứ không biết là ai.

## Cổng có thể tái sử dụng {#the-reusable-gate}

Cặp bằng chứng-và-bộ triệt tiêu tương tự đó hoạt động vượt ra ngoài việc bỏ phiếu. Bỏ đi câu chuyện bỏ phiếu và những gì bạn có là một cổng quyền riêng tư cho các hàm của hợp đồng thông minh.

Trước khi hàm chạy, hợp đồng kiểm tra gốc Merkle, xác minh bằng chứng, xác nhận mã băm bộ triệt tiêu chưa được sử dụng và liên kết các đầu vào công khai với đúng ứng dụng, chuỗi, cuộc thăm dò, yêu cầu nhận hoặc rút tiền. Nếu các bước kiểm tra đó vượt qua, nó đánh dấu bộ triệt tiêu là đã sử dụng và chạy phần còn lại của hàm.

Đặt cổng đó trước một cuộc bỏ phiếu và bạn có được việc bỏ phiếu ẩn danh. Đặt nó trước một yêu cầu nhận airdrop và bạn có được các yêu cầu nhận ẩn danh. Đặt nó trước một hàm rút tiền và bạn có được cốt lõi của luồng rút tiền kiểu bộ trộn. Cùng một cây cam kết, cùng một ý tưởng bộ triệt tiêu, cùng một mô hình bằng chứng. Những gì thay đổi là phần thân hàm và logic ứng dụng xung quanh.

## Cái gì chạy ở đâu {#what-runs-where}

Công việc riêng tư thường diễn ra ngoài chuỗi. Người dùng lưu trữ ghi chú và một ứng dụng máy khách xây dựng bằng chứng dữ liệu và chạy trình chứng minh để tạo ra bằng chứng. Một trình lập chỉ mục theo dõi các cam kết và gốc Merkle. Một trình đóng gói truyền bá thao tác người dùng (UserOperation) trên chuỗi và một bên trả phí ERC-4337 tài trợ Gas, vì vậy một ví mới không cần ETH từ ví đã biết của người dùng trước.

Việc thực thi công khai diễn ra trên chuỗi. Hợp đồng trình xác minh kiểm tra bằng chứng. Hợp đồng ứng dụng kiểm tra các gốc hợp lệ và các bộ triệt tiêu chưa sử dụng, lưu trữ mã băm bộ triệt tiêu và chạy hành động công khai.

Trải nghiệm người dùng nhạy cảm là việc xử lý ghi chú. Hãy coi bí mật và bộ triệt tiêu như các khóa. Đừng đưa chúng vào phân tích, nhật ký, URL, báo cáo lỗi hoặc đo từ xa phía máy chủ thông thường. Một khi ghi chú bị rò rỉ, quyền riêng tư sẽ biến mất, bất kể bằng chứng có mạnh đến đâu.

## Các công cụ đã bắt kịp {#the-tooling-caught-up}

Bạn không cần phải tự viết mã cho mật mã học cơ bản. Một con đường phổ biến là viết mạch bằng ngôn ngữ không tri thức cấp cao, tạo ra một trình xác minh Solidity và gọi trình xác minh đó từ hợp đồng ứng dụng.

Ngăn xếp phù hợp phụ thuộc vào công việc. Circom với snarkjs là một con đường đã được thiết lập từ lâu cho các mạch cấp ứng dụng. Noir với Barretenberg là một con đường mới hơn, thân thiện với nhà phát triển. Halo2 và gnark là các thư viện mạch cấp thấp hơn. Các zkVM như RISC Zero hoặc SP1 chứng minh các chương trình bình thường, nhưng có thể tốn kém hơn để chứng minh so với một mạch tùy chỉnh nhỏ.

Đối với tư cách thành viên ẩn danh, hãy tìm đến một giao thức hiện có trước khi tự viết mạch của riêng bạn. Semaphore đóng gói tư cách thành viên nhóm và tính năng ngăn chặn sử dụng kép dựa trên bộ triệt tiêu vào các hợp đồng và thư viện JavaScript. Đối với việc bỏ phiếu và quản trị riêng tư, MACI là con đường chuyên biệt vì nó bổ sung các đặc tính chống thông đồng. Các giao thức trưởng thành thường an toàn hơn các mạch mới.

## Bằng chứng là chưa đủ {#the-proof-is-not-enough}

Ngay cả một bằng chứng hoàn hảo cũng thất bại nếu luồng ví làm rò rỉ liên kết. Đăng ký từ ví A và sau đó hành động từ ví A, và bất kỳ ai theo dõi đều có thể kết nối các giao dịch. Cấp vốn cho ví B từ ví A ngay trước khi hành động, và giao dịch cấp vốn đó tạo ra cùng một vấn đề.

Đây là lý do tại sao các trình đóng gói và bên trả phí lại quan trọng. Ví thực hiện hành động phải là ví mới và nó không cần nhận ETH từ một ví mà người dùng đang cố gắng tách khỏi hành động.

Vấn đề tương tự cũng tồn tại ngoài chuỗi. Việc gửi các giao dịch đăng ký và hành động từ cùng một địa chỉ IP, nhà cung cấp RPC hoặc phiên có thể làm suy yếu quyền riêng tư mà mạch cung cấp. Các giao diện người dùng có thể bị rò rỉ thông qua phân tích, bộ nhớ cục bộ và nhật ký hỗ trợ. Một bằng chứng không kiến thức ẩn các giá trị bên trong bằng chứng. Nó không ẩn mọi thứ xung quanh giao dịch.

Các đầu vào công khai là một nơi khác mà các ứng dụng quyền riêng tư thất bại. Bất cứ thứ gì được đánh dấu là công khai trong mạch, được phát ra dưới dạng một sự kiện, được bao gồm trong dữ liệu lệnh gọi hoặc được lưu trữ bởi hợp đồng đều có thể nhìn thấy được. Hãy xem xét các đầu vào công khai cẩn thận như việc kiểm soát truy cập trên một hợp đồng Solidity.

## Điều này thay đổi gì đối với các nhà xây dựng {#what-this-changes-for-builders}

Quyền riêng tư trên Ethereum là có thể triển khai được. Các nhà xây dựng có thể kết hợp các mảnh ghép thành các ứng dụng thực tế. Ngăn xếp bao gồm một mạch cho tuyên bố riêng tư, một trình xác minh để kiểm tra bằng chứng, một hợp đồng ứng dụng cho các quy tắc công khai, một trình lập chỉ mục cho dữ liệu Merkle, và một trình đóng gói cộng với bên trả phí cho việc gửi không thể liên kết và tài trợ Gas.

Những phần khó khăn là thiết kế sản phẩm, quản lý khóa, vệ sinh siêu dữ liệu, kiểm toán và phát triển tập ẩn danh. Làm sai bất kỳ điều nào trong số đó và quyền riêng tư mà bằng chứng mang lại sẽ biến mất.

## Đọc thêm {#further-reading}

1. [Bằng chứng không kiến thức (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Tài liệu Semaphore](https://docs.semaphore.pse.dev/)
3. [Tài liệu MACI](https://maci.pse.dev/)
4. [Tài liệu Circom](https://docs.circom.io/)
5. [Tài liệu Noir](https://noir-lang.org/)
6. [Sách Halo2](https://zcash.github.io/halo2/)
7. [Tài liệu gnark](https://docs.gnark.consensys.io/)
8. [Tài liệu RISC Zero](https://dev.risczero.com/api/)
9. [Tài liệu SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Trừu tượng hóa tài khoản thông qua hợp đồng EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)