---
title: "Các thuật toán khai thác"
description: "Cái nhìn chi tiết về các thuật toán được sử dụng để khai thác Ethereum."
lang: vi
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Bằng chứng công việc (PoW) không còn là nền tảng cho cơ chế đồng thuận của Ethereum, nghĩa là việc khai thác đã bị tắt. Thay vào đó, Ethereum được bảo mật bởi các trình xác thực đặt cọc ETH. Bạn có thể bắt đầu đặt cọc ETH của mình ngay hôm nay. Đọc thêm về <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Bằng chứng cổ phần (PoS)</a>, và <a href='/staking/'>việc đặt cọc</a>. Trang này chỉ dành cho mục đích tham khảo lịch sử.
</AlertDescription>
</AlertContent>
</Alert>

Việc khai thác Ethereum đã sử dụng một thuật toán được gọi là Ethash. Ý tưởng cơ bản của thuật toán là một thợ đào cố gắng tìm một đầu vào nonce bằng cách sử dụng tính toán brute force (vét cạn) sao cho mã băm thu được nhỏ hơn một ngưỡng được xác định bởi độ khó đã tính toán. Mức độ khó này có thể được điều chỉnh động, cho phép việc sản xuất khối diễn ra ở một khoảng thời gian đều đặn.

## Điều kiện tiên quyết {#prerequisites}

Để hiểu rõ hơn về trang này, chúng tôi khuyên bạn trước tiên nên đọc về [đồng thuận bằng chứng công việc (PoW)](/developers/docs/consensus-mechanisms/pow) và [khai thác](/developers/docs/consensus-mechanisms/pow/mining).

## Dagger Hashimoto {#dagger-hashimoto}

Dagger Hashimoto là một thuật toán nghiên cứu tiền thân cho việc khai thác Ethereum mà Ethash đã thay thế. Nó là sự kết hợp của hai thuật toán khác nhau: Dagger và Hashimoto. Nó chỉ từng là một bản triển khai nghiên cứu và đã được thay thế bởi Ethash vào thời điểm Mạng chính Ethereum ra mắt.

[Dagger](http://www.hashcash.org/papers/dagger.html) liên quan đến việc tạo ra một [Đồ thị có hướng không tuần hoàn (DAG)](https://en.wikipedia.org/wiki/Directed_acyclic_graph), trong đó các lát cắt ngẫu nhiên được băm cùng nhau. Nguyên tắc cốt lõi là mỗi nonce chỉ yêu cầu một phần nhỏ của một cây dữ liệu tổng thể lớn. Việc tính toán lại cây con cho mỗi nonce là điều cấm kỵ đối với việc khai thác - do đó cần phải lưu trữ cây - nhưng lại ổn đối với việc xác minh giá trị của một nonce duy nhất. Dagger được thiết kế để trở thành một giải pháp thay thế cho các thuật toán hiện có như Scrypt, vốn đòi hỏi nhiều bộ nhớ (memory-hard) nhưng khó xác minh khi độ khó bộ nhớ của chúng tăng lên mức thực sự an toàn. Tuy nhiên, Dagger dễ bị tấn công bởi khả năng tăng tốc phần cứng bộ nhớ dùng chung và đã bị loại bỏ để nhường chỗ cho các hướng nghiên cứu khác.

[Hashimoto](http://diyhpl.us/%7Ebryan/papers2/bitcoin/meh/hashimoto.pdf) là một thuật toán bổ sung khả năng kháng ASIC bằng cách bị giới hạn I/O (tức là, việc đọc bộ nhớ là yếu tố hạn chế trong quá trình khai thác). Lý thuyết là RAM có sẵn nhiều hơn so với khả năng tính toán; hàng tỷ đô la nghiên cứu đã được đầu tư vào việc tối ưu hóa RAM cho các trường hợp sử dụng khác nhau, thường liên quan đến các mẫu truy cập gần như ngẫu nhiên (do đó có tên là “bộ nhớ truy cập ngẫu nhiên”). Kết quả là, RAM hiện tại có khả năng gần đạt mức tối ưu để đánh giá thuật toán. Hashimoto sử dụng Chuỗi khối làm nguồn dữ liệu, đồng thời thỏa mãn (1) và (3) ở trên.

Dagger-Hashimoto đã sử dụng các phiên bản sửa đổi của thuật toán Dagger và Hashimoto. Sự khác biệt giữa Dagger Hashimoto và Hashimoto là, thay vì sử dụng Chuỗi khối làm nguồn dữ liệu, Dagger Hashimoto sử dụng một tập dữ liệu được tạo tùy chỉnh, cập nhật dựa trên dữ liệu khối sau mỗi N khối. Tập dữ liệu được tạo bằng thuật toán Dagger, cho phép tính toán hiệu quả một tập con cụ thể cho mỗi nonce đối với thuật toán xác minh của máy khách nhẹ. Sự khác biệt giữa Dagger Hashimoto và Dagger là, không giống như trong Dagger ban đầu, tập dữ liệu được sử dụng để truy vấn khối là bán vĩnh viễn, chỉ được cập nhật ở các khoảng thời gian không thường xuyên (ví dụ: mỗi tuần một lần). Điều này có nghĩa là phần công sức tạo ra tập dữ liệu gần như bằng không, do đó các lập luận của Sergio Lerner về việc tăng tốc bộ nhớ dùng chung trở nên không đáng kể.

Tìm hiểu thêm về [Dagger-Hashimoto](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto).

## Ethash {#ethash}

Ethash là thuật toán khai thác thực sự được sử dụng trên Mạng chính Ethereum thực tế theo kiến trúc bằng chứng công việc (PoW) hiện đã không còn được sử dụng. Ethash thực chất là một tên mới được đặt cho một phiên bản cụ thể của Dagger-Hashimoto sau khi thuật toán này được cập nhật đáng kể, trong khi vẫn kế thừa các nguyên tắc cơ bản của người tiền nhiệm. Mạng chính Ethereum chỉ từng sử dụng Ethash - Dagger Hashimoto là một phiên bản R&D của thuật toán khai thác đã bị thay thế trước khi việc khai thác bắt đầu trên Mạng chính Ethereum.

[Tìm hiểu thêm về Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash).

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_