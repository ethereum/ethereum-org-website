---
title: Thuật toán khai thác
description: Một cái nhìn chi tiết về các thuật toán được sử dụng cho việc đào Ethereum.
lang: vi
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Bằng chứng làm việc không còn là cơ chế đồng thuận nền tảng của Ethereum, nghĩa là việc khai thác đã bị tắt. Thay vào đó, Ethereum được bảo mật bởi các trình xác thực đặt cọc ETH. Bạn có thể bắt đầu đặt cọc ETH của mình ngay từ hôm nay. Đọc thêm về <a href='/roadmap/merge/'>sự kiện hợp nhất</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Bằng chứng cổ phần</a> và <a href='/staking/'>Cổ phần</a>. Trang này chỉ nhằm mục đích tham khảo lịch sử.
</AlertDescription>
</AlertContent>
</Alert>

Việc đào Ethereum đã sử dụng một thuật toán gọi là Ethash. Ý tưởng cơ bản của thuật toán là thợ đào sẽ cố gắng tìm một giá trị nonce đầu vào bằng cách tính toán brute force, sao cho giá trị băm (hash) thu được nhỏ hơn một ngưỡng được xác định bởi độ khó (difficulty) đã tính toán. Mức độ khó này có thể được điều chỉnh linh hoạt, cho phép việc tạo khối diễn ra theo chu kỳ ổn định.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn nên đọc trước về [sự đồng thuận bằng chứng công việc](/developers/docs/consensus-mechanisms/pow) và [khai thác](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto là một thuật toán nghiên cứu tiền thân cho việc đào Ethereum, sau đó đã được thay thế bởi Ethash. Đây là sự kết hợp của hai thuật toán khác nhau: Dagger và Hashimoto. Nó chỉ từng tồn tại như một bản thử nghiệm nghiên cứu và đã được thay thế bởi Ethash khi Ethereum Mainnet ra mắt.

[Dagger](http://www.hashcash.org/papers/dagger.html) liên quan đến việc tạo ra một [Đồ thị có hướng không tuần hoàn](https://en.wikipedia.org/wiki/Directed_acyclic_graph), các lát cắt ngẫu nhiên của đồ thị này sẽ được băm lại với nhau. Nguyên tắc cốt lõi là mỗi giá trị nonce chỉ yêu cầu một phần nhỏ của toàn bộ cây dữ liệu lớn. Việc tính toán lại cây con cho mỗi nonce là không khả thi đối với việc đào – do đó cần phải lưu trữ cây dữ liệu – nhưng lại chấp nhận được khi chỉ cần xác minh một nonce duy nhất. Dagger được thiết kế để trở thành một giải pháp thay thế cho các thuật toán hiện có như Scrypt, vốn “nặng bộ nhớ” nhưng khó xác minh khi mức độ nặng bộ nhớ của chúng tăng lên đến mức an toàn thực sự. Tuy nhiên, Dagger dễ bị ảnh hưởng bởi tăng tốc phần cứng bộ nhớ chia sẻ và đã bị loại bỏ để nhường chỗ cho các hướng nghiên cứu khác.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) là một thuật toán bổ sung khả năng chống ASIC bằng cách phụ thuộc vào I/O (tức là, việc đọc bộ nhớ là yếu tố giới hạn trong quá trình khai thác). Lý thuyết đặt ra rằng RAM sẵn có hơn so với năng lực tính toán; hàng tỷ đô la nghiên cứu đã được đầu tư vào việc tối ưu hóa RAM cho các trường hợp sử dụng khác nhau, vốn thường liên quan đến các mô hình truy cập gần như ngẫu nhiên (do đó gọi là “bộ nhớ truy cập ngẫu nhiên” – RAM). Do đó, RAM hiện có có khả năng ở mức gần tối ưu để đánh giá thuật toán. Hashimoto sử dụng blockchain như một nguồn dữ liệu, đồng thời đáp ứng các điều kiện (1) và (3) nêu trên.

Dagger-Hashimoto đã sử dụng các phiên bản chỉnh sửa của thuật toán Dagger và Hashimoto. Điểm khác biệt giữa Dagger Hashimoto và Hashimoto là thay vì sử dụng blockchain như một nguồn dữ liệu, Dagger Hashimoto dùng một tập dữ liệu được tạo tùy chỉnh, được cập nhật dựa trên dữ liệu khối sau mỗi N khối. Tập dữ liệu được tạo bằng thuật toán Dagger, cho phép tính toán hiệu quả một tập con dành riêng cho từng nonce trong thuật toán xác minh light client. Điểm khác biệt giữa Dagger Hashimoto và Dagger là, không giống như trong Dagger ban đầu, tập dữ liệu được dùng để truy vấn khối là bán cố định, chỉ được cập nhật theo định kỳ (ví dụ: mỗi tuần một lần). Điều này có nghĩa là phần công sức để tạo tập dữ liệu gần như bằng không, do đó lập luận của Sergio Lerner về việc tăng tốc nhờ bộ nhớ chia sẻ trở nên không đáng kể.

Thông tin thêm về [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash là thuật toán đào thực sự đã được sử dụng trên Ethereum Mainnet, dưới kiến trúc proof-of-work hiện đã bị loại bỏ. Ethash thực chất là tên mới được đặt cho một phiên bản cụ thể của Dagger-Hashimoto sau khi thuật toán này được cập nhật đáng kể, trong khi vẫn kế thừa các nguyên tắc cơ bản của tiền thân nó. Mạng chính Ethereum chỉ từng sử dụng Ethash - Dagger Hashimoto là một phiên bản nghiên cứu và phát triển (R&D) của thuật toán khai thác đã bị thay thế trước khi việc khai thác bắt đầu trên Mạng chính Ethereum.

[Thông tin thêm về Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
