---
title: zkEVM để xác minh khối L1
description: Tìm hiểu cách các bằng chứng không kiến thức có thể xác minh việc thực thi khối Ethereum, cho phép thông lượng cao hơn và yêu cầu đối với trình xác thực thấp hơn.
lang: vi
---

# zkEVM để xác minh khối L1 {#zkevm-l1}

zkEVM là một công nghệ sử dụng [các bằng chứng không kiến thức](/zero-knowledge-proofs/) để xác minh việc thực thi khối Ethereum. Thay vì yêu cầu mọi [trình xác thực](/glossary/#validator) phải thực thi lại tất cả các giao dịch trong một khối, một tác nhân chuyên biệt duy nhất (được gọi là "người chứng minh" - prover) sẽ thực thi khối và tạo ra một bằng chứng mật mã học rằng việc thực thi là chính xác. Bất kỳ nút nào sau đó cũng có thể xác minh bằng chứng này—một quá trình rẻ hơn nhiều bậc so với việc thực thi lại tất cả các giao dịch.

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>Không nên nhầm lẫn với các zkEVM rollup</AlertTitle>
<AlertDescription>
Trang này thảo luận về việc sử dụng zkEVM để xác minh việc thực thi khối L1 của Ethereum. Đối với các bản gộp giao dịch zkEVM sử dụng bằng chứng ZK để mở rộng quy mô Ethereum dưới dạng các giải pháp lớp 2, hãy xem [gộp giao dịch không kiến thức](/developers/docs/scaling/zk-rollups/).
</AlertDescription>
</AlertContent>
</Alert>

## Vấn đề thực thi lại {#reexecution-problem}

Ngày nay, Ethereum sử dụng mô hình xác minh "N-of-N": mọi trình xác thực phải độc lập thực thi lại mọi giao dịch trong mỗi khối để xác minh rằng các thay đổi trạng thái được đề xuất là chính xác. Mặc dù phương pháp này mang tính phi tín nhiệm tối đa, nhưng nó tạo ra một nút thắt cổ chai cơ bản.

Vấn đề là thông lượng của Ethereum bị giới hạn bởi những gì mà một trình xác thực trung bình có thể xử lý. Việc tăng [giới hạn gas](/glossary/#gas-limit) sẽ cho phép nhiều giao dịch hơn trên mỗi khối, nhưng nó cũng sẽ làm tăng yêu cầu phần cứng đối với các trình xác thực. Điều này đe dọa đến tính phi tập trung—nếu việc chạy một trình xác thực đòi hỏi phần cứng đắt tiền, sẽ có ít người hơn có thể tham gia vào việc bảo mật mạng lưới.

zkEVM cung cấp một lối thoát khỏi sự đánh đổi này. Bằng cách chuyển từ "mọi người đều thực thi lại" sang "một người chứng minh, mọi người xác minh", Ethereum có thể tăng giới hạn gas một cách an toàn mà không làm tăng yêu cầu phần cứng của trình xác thực.

## Cách thức hoạt động của việc xác minh L1 bằng zkEVM {#how-it-works}

Việc xác minh bằng zkEVM chuyển đổi quá trình xác thực khối thành mô hình "1-of-N":

1. **Thực thi**: Một người chứng minh (prover) thực thi tất cả các giao dịch trong một khối, theo dõi mọi thay đổi trạng thái
2. **Chứng minh**: Người chứng minh tạo ra một bằng chứng mật mã học (một [SNARK hoặc STARK](/zero-knowledge-proofs/#types-of-zero-knowledge-proofs)) chứng thực tính chính xác của việc thực thi
3. **Xác minh**: Các trình xác thực xác minh bằng chứng thay vì thực thi lại các giao dịch—điều này rẻ hơn đáng kể so với việc thực thi lại toàn bộ

Đảm bảo bảo mật vẫn giữ nguyên: nếu việc thực thi không chính xác, sẽ không có bằng chứng hợp lệ nào có thể được tạo ra. Nhưng giờ đây, thay vì mọi nút phải thực hiện tính toán tốn kém, chỉ có người chứng minh làm điều đó—và việc xác minh đủ rẻ để không hạn chế giới hạn gas.

### zkEVM Loại 1 {#type-1-zkevm}

Các zkEVM được phân loại thành các loại dựa trên khả năng tương thích của chúng với Ethereum:

- **Loại 1**: Hoàn toàn tương đương với Ethereum. Không có sửa đổi nào đối với EVM, vì vậy bất kỳ khối Ethereum nào cũng có thể được chứng minh chính xác như nguyên bản
- **Loại 2-4**: Thực hiện nhiều sự đánh đổi khác nhau, sửa đổi hành vi của EVM để làm cho việc chứng minh dễ dàng hơn

Đối với việc xác minh L1, Loại 1 là rất cần thiết. zkEVM phải có khả năng chứng minh bất kỳ khối Ethereum hợp lệ nào, bao gồm cả các trường hợp ngoại lệ và các khối lịch sử. Bất kỳ sự sai lệch nào so với hành vi chính xác của Ethereum đều sẽ tạo ra các vấn đề về sự đồng thuận.

Nghiên cứu zkEVM của Ethereum Foundation tập trung vào các triển khai Loại 1 hoàn toàn tương thích với việc thực thi Ethereum hiện tại.

## Lợi ích đối với Ethereum {#benefits}

### Thông lượng cao hơn {#higher-throughput}

Khi việc xác minh trở nên rẻ, giới hạn gas có thể tăng lên một cách an toàn. Điều này mở rộng dung lượng mạng lưới và giúp ổn định phí trong các giai đoạn có nhu cầu cao. Giới hạn gas hiện tại bị hạn chế một phần bởi phần cứng của trình xác thực—zkEVM loại bỏ hạn chế này.

### Tính phi tập trung mạnh mẽ hơn {#stronger-decentralization}

Với việc xác minh bằng zkEVM, các trình xác thực chỉ cần xác minh các bằng chứng thay vì thực thi các giao dịch. Điều này làm giảm đáng kể các yêu cầu phần cứng để chạy một trình xác thực, cho phép nhiều người hơn tham gia vào việc bảo mật mạng lưới. Sự đa dạng của trình xác thực lớn hơn sẽ củng cố khả năng chống kiểm duyệt và khả năng phục hồi của Ethereum.

Lưu ý rằng bản thân việc chứng minh đòi hỏi tài nguyên tính toán đáng kể, lớn hơn so với phần cứng của trình xác thực hiện tại. Tuy nhiên, không giống như việc xác thực, việc chứng minh không cần phải phi tập trung theo cùng một cách: chỉ cần một bằng chứng chính xác cho mỗi khối và bất kỳ ai cũng có thể xác minh nó một cách nhanh chóng. Nghiên cứu về thị trường người chứng minh, tổng hợp bằng chứng và tăng tốc phần cứng nhằm đảm bảo rằng việc chứng minh vẫn mang tính cạnh tranh và dễ tiếp cận thay vì tập trung vào một vài nhà điều hành lớn.

### Tính hoàn thiện có thể dự đoán {#predictable-finality}

Việc xác minh bằng chứng hoạt động trong thời gian không đổi bất kể độ phức tạp của khối. Điều này làm cho thời gian của sự chứng thực dễ dự đoán hơn và giảm thiểu các sự chứng thực bị bỏ lỡ có thể xảy ra khi các trình xác thực gặp khó khăn trong việc xử lý các khối phức tạp kịp thời.

## Những thách thức của việc chứng minh theo thời gian thực {#realtime-proving}

Thách thức chính đối với việc xác minh L1 bằng zkEVM là tốc độ. Các khối Ethereum được tạo ra mỗi 12 giây, có nghĩa là các bằng chứng cần được tạo ra trong một khung thời gian tương tự để hữu ích cho sự đồng thuận.

Các triển khai zkEVM hiện tại có thể mất từ vài phút đến vài giờ để chứng minh một khối duy nhất. Nghiên cứu tập trung vào việc thu hẹp khoảng cách này thông qua:

- **Song song hóa**: Phân phối công việc chứng minh trên nhiều máy tính
- **Phần cứng chuyên dụng**: Thiết kế các mạch và phần cứng được tối ưu hóa cho việc chứng minh ZK
- **Cải tiến thuật toán**: Các hệ thống bằng chứng và thiết kế mạch hiệu quả hơn
- **Chứng minh tăng dần**: Tạo ra các bằng chứng khi các giao dịch thực thi, thay vì sau đó

## Nghiên cứu và triển khai hiện tại {#current-research}

Ethereum Foundation tài trợ cho nghiên cứu zkEVM thông qua nhóm [Privacy Stewards of Ethereum (PSE)](https://pse.dev/). Các hướng nghiên cứu chính bao gồm:

- **Chứng minh theo thời gian thực**: Tạo ra các bằng chứng khối đầy đủ trong các khe thời gian 12 giây
- **Tích hợp ứng dụng khách**: Tiêu chuẩn hóa các giao diện giữa các trình khách thực thi và người chứng minh
- **Khuyến khích kinh tế**: Thiết kế các thị trường người chứng minh và cấu trúc phí bền vững

### Trạng thái triển khai {#implementations}

Một số triển khai zkVM đang được phát triển và thử nghiệm cho việc chứng minh khối Ethereum:

| Triển khai | Kiến trúc |
|----------------|--------------|
| [OpenVM](https://github.com/openvm-org/openvm) | rv32im |
| [RISC Zero](https://github.com/risc0/risc0) | rv32im |
| [Airbender](https://github.com/matter-labs/zksync-airbender) | rv32im |
| [Jolt](https://github.com/a16z/jolt) | rv32im |
| [Zisk](https://github.com/0xPolygonHermez/zisk) | rv64ima |

Những triển khai này sử dụng các máy ảo dựa trên RISC-V để thực thi mã byte EVM, sau đó tạo ra các bằng chứng ZK về việc thực thi chính xác. Kết quả thử nghiệm và tiến độ cập nhật được theo dõi tại [trình theo dõi zkVM của Ethereum Foundation](https://zkevm.ethereum.foundation/zkvm-tracker).

## Cách zkEVM phù hợp với các bản nâng cấp khác {#related-upgrades}

Việc xác minh L1 bằng zkEVM kết nối với một số mục khác trong lộ trình Ethereum:

- **[Cây Verkle](/roadmap/verkle-trees/)**: Cho phép các nhân chứng nhỏ hơn để xác minh phi trạng thái, giảm lượng dữ liệu mà người chứng minh cần làm việc
- **[Tính phi trạng thái](/roadmap/statelessness/)**: zkEVM là một yếu tố hỗ trợ chính—với các bằng chứng thực thi ZK, các nút không cần trạng thái đầy đủ để xác minh các khối
- **[PBS](/roadmap/pbs/)**: Những người xây dựng khối có khả năng tích hợp việc tạo bằng chứng, hoặc một thị trường người chứng minh riêng biệt có thể xuất hiện
- **[Tính hoàn thiện khe đơn](/roadmap/single-slot-finality/)**: Việc tạo bằng chứng nhanh hơn có thể cho phép tính hoàn thiện khe đơn với các đảm bảo mật mã học

<Alert variant="warning">
<AlertEmoji text="🧪" />
<AlertContent>
<AlertDescription>
Việc xác minh L1 bằng zkEVM đang được tích cực nghiên cứu và chưa được tích hợp vào các ứng dụng khách Ethereum trong môi trường sản xuất.
</AlertDescription>
</AlertContent>
</Alert>

## Đọc thêm {#further-reading}

- [zkEVM Foundation](https://zkevm.ethereum.foundation) - Trung tâm nghiên cứu zkEVM chính thức của Ethereum Foundation
- [Ethproofs](https://ethproofs.org/) - Theo dõi cuộc đua chứng minh Ethereum theo thời gian thực
- [zkevm.fyi](https://zkevm.fyi) - Sách kỹ thuật về zkEVM cho L1
- [PSE zkEVM Specs](https://github.com/privacy-scaling-explorations/zkevm-specs) - Các thông số kỹ thuật
- [The Verge](https://vitalik.eth.limo/general/2024/10/23/futures4.html) - Tổng quan của Vitalik về các cải tiến xác minh
- [EF zkEVM Blog](https://zkevm.ethereum.foundation/blog) - Phân tích hiệu suất từ nhóm EF