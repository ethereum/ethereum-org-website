---
title: Bảo mật hợp đồng thông minh
description: Một tổng hợp về hướng dẫn xây dựng hợp đồng để xây dựng nên hợp đồng Ethereum thông minh và an toàn
lang: vi
---

Hợp đồng thông minh cực kỳ linh hoạt và có khả năng điều khiển được một lượng lớn giá trị và số liệu, trong khi đang chạy logic bất biến dựa trên mã được triển khai trên blockchain. Cái này đã tạo ra một hệ sinh thái sôi động gồm các ứng dụng phi tập trung và đáng tin cậy, điều này mang lại rất nhiều lợi thế so với các hệ thống cũ. Chúng còn đại diện cho những cơ hội cho những kẻ tấn công ngắm đến lợi nhuận bằng cách khai thác các lỗ hổng trong hợp đồng thông minh.

Các chuỗi khối công khai, như Ethereum, càng làm phức tạp thêm vấn đề bảo mật của các hợp đồng thông minh. Mã hợp đồng đã triển khai _thường_ không thể thay đổi để vá các lỗ hổng bảo mật, trong khi tài sản bị đánh cắp từ các hợp đồng thông minh cực kỳ khó theo dõi và hầu như không thể phục hồi do tính bất biến.

Mặc dù các con số khác nhau, người ta ước tính rằng tổng giá trị bị đánh cắp hoặc mất mát do các khiếm khuyết bảo mật trong hợp đồng thông minh đã dễ dàng vượt qua 1 tỷ đô la. Điều này bao gồm các sự cố nổi tiếng, chẳng hạn như [vụ hack DAO](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/) (3,6 triệu ETH bị đánh cắp, trị giá hơn 1 tỷ đô la theo giá ngày nay), [vụ hack ví đa chữ ký Parity](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach) (mất 30 triệu đô la cho hacker) và [sự cố ví Parity bị đóng băng](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether) (hơn 300 triệu đô la ETH bị khóa vĩnh viễn).

Các vấn đề nói trên khiến các nhà phát triển bắt buộc phải đầu tư nỗ lực vào việc xây dựng các hợp đồng thông minh an toàn, mạnh mẽ và có khả năng phục hồi. Bảo mật hợp đồng thông minh là một vấn đề nghiêm túc và mọi nhà phát triển nên học hỏi. Hướng dẫn này sẽ đề cập đến các cân nhắc về bảo mật cho các nhà phát triển Ethereum và khám phá các tài nguyên để cải thiện bảo mật hợp đồng thông minh.

## Điều kiện tiên quyết {#prerequisites}

Hãy chắc chắn rằng bạn đã quen thuộc với [các nguyên tắc cơ bản về phát triển hợp đồng thông minh](/developers/docs/smart-contracts/) trước khi giải quyết vấn đề bảo mật.

## Hướng dẫn xây dựng hợp đồng thông minh Ethereum an toàn {#smart-contract-security-guidelines}

### 1. Thiết kế các biện pháp kiểm soát truy cập phù hợp {#design-proper-access-controls}

Trong các hợp đồng thông minh, các hàm được đánh dấu là `public` hoặc `external` có thể được gọi bởi bất kỳ tài khoản sở hữu bên ngoài (EOA) hoặc tài khoản hợp đồng nào. Việc chỉ định khả năng hiển thị công khai cho các hàm là cần thiết nếu bạn muốn người khác tương tác với hợp đồng của mình. Tuy nhiên, các hàm được đánh dấu là `private` chỉ có thể được gọi bởi các hàm trong hợp đồng thông minh, chứ không phải các tài khoản bên ngoài. Việc cấp cho mọi người tham gia mạng quyền truy cập vào các chức năng của hợp đồng có thể gây ra sự cố, đặc biệt nếu điều đó có nghĩa là bất kỳ ai cũng có thể thực hiện các hoạt động nhạy cảm (ví dụ: đúc token mới).

Để ngăn chặn việc sử dụng trái phép các chức năng của hợp đồng thông minh, cần phải thực hiện các biện pháp kiểm soát truy cập an toàn. Cơ chế kiểm soát truy cập hạn chế khả năng sử dụng các chức năng nhất định trong hợp đồng thông minh đối với các thực thể được phê duyệt, chẳng hạn như các tài khoản chịu trách nhiệm quản lý hợp đồng. **Mô hình có thể sở hữu** và **kiểm soát dựa trên vai trò** là hai mô hình hữu ích để triển khai kiểm soát truy cập trong các hợp đồng thông minh:

#### Mô hình có thể sở hữu {#ownable-pattern}

Trong mô hình Có thể sở hữu, một địa chỉ được đặt làm "chủ sở hữu" của hợp đồng trong quá trình tạo hợp đồng. Các hàm được bảo vệ được gán một công cụ sửa đổi `OnlyOwner`, đảm bảo hợp đồng xác thực danh tính của địa chỉ gọi trước khi thực thi hàm. Các lệnh gọi đến các chức năng được bảo vệ từ các địa chỉ khác ngoài chủ sở hữu hợp đồng luôn được hoàn nguyên, ngăn chặn truy cập không mong muốn.

#### Kiểm soát truy cập dựa trên vai trò {#role-based-access-control}

Việc đăng ký một địa chỉ duy nhất với tư cách là `Owner` trong một hợp đồng thông minh sẽ có nguy cơ tập trung hóa và là một điểm lỗi duy nhất. Nếu khóa tài khoản của chủ sở hữu bị xâm phạm, kẻ tấn công có thể tấn công hợp đồng sở hữu. Đây là lý do tại sao việc sử dụng mô hình kiểm soát truy cập dựa trên vai trò với nhiều tài khoản quản trị có thể là một lựa chọn tốt hơn.

Trong kiểm soát truy cập dựa trên vai trò, quyền truy cập vào các chức năng nhạy cảm được phân phối giữa một nhóm người tham gia đáng tin cậy. Ví dụ: một tài khoản có thể chịu trách nhiệm đúc token, trong khi một tài khoản khác thực hiện nâng cấp hoặc tạm dừng hợp đồng. Việc phân cấp quyền kiểm soát truy cập theo cách này giúp loại bỏ các điểm lỗi duy nhất và giảm các giả định về sự tin cậy cho người dùng.

##### Sử dụng ví đa chữ ký

Một cách tiếp cận khác để triển khai kiểm soát truy cập an toàn là sử dụng [tài khoản đa chữ ký](/developers/docs/smart-contracts/#multisig) để quản lý hợp đồng. Không giống như EOA thông thường, tài khoản đa chữ ký thuộc sở hữu của nhiều thực thể và yêu cầu chữ ký từ một số lượng tài khoản tối thiểu—ví dụ như 3 trên 5—để thực hiện giao dịch.

Sử dụng đa chữ ký để kiểm soát truy cập sẽ tạo ra một lớp bảo mật bổ sung vì các hành động trên hợp đồng mục tiêu yêu cầu sự đồng ý của nhiều bên. Điều này đặc biệt hữu ích nếu cần sử dụng mẫu Có thể sở hữu, vì nó khiến kẻ tấn công hoặc người trong cuộc lừa đảo khó thao túng các chức năng hợp đồng nhạy cảm cho các mục đích xấu.

### 2. Sử dụng các câu lệnh require(), assert() và revert() để bảo vệ các hoạt động của hợp đồng {#use-require-assert-revert}

Như đã đề cập, bất kỳ ai cũng có thể gọi các chức năng công khai trong hợp đồng thông minh của bạn sau khi nó được triển khai trên chuỗi khối. Vì bạn không thể biết trước các tài khoản bên ngoài sẽ tương tác với một hợp đồng như thế nào, lý tưởng nhất là triển khai các biện pháp bảo vệ nội bộ chống lại các hoạt động có vấn đề trước khi triển khai. Bạn có thể thực thi hành vi chính xác trong các hợp đồng thông minh bằng cách sử dụng các câu lệnh `require()`, `assert()` và `revert()` để kích hoạt các ngoại lệ và hoàn nguyên các thay đổi trạng thái nếu việc thực thi không đáp ứng các yêu cầu nhất định.

**`require()`**: `require` được định nghĩa ở đầu các hàm và đảm bảo các điều kiện được xác định trước được đáp ứng trước khi hàm được gọi được thực thi. Câu lệnh `require` có thể được sử dụng để xác thực đầu vào của người dùng, kiểm tra các biến trạng thái hoặc xác thực danh tính của tài khoản gọi trước khi tiếp tục với một hàm.

**`assert()`**: `assert()` được sử dụng để phát hiện các lỗi nội bộ và kiểm tra các vi phạm "bất biến" trong mã của bạn. Một bất biến là một khẳng định logic về trạng thái của một hợp đồng phải luôn đúng cho tất cả các lần thực thi hàm. Một ví dụ về bất biến là tổng cung tối đa hoặc số dư của một hợp đồng token. Việc sử dụng `assert()` đảm bảo rằng hợp đồng của bạn không bao giờ đạt đến trạng thái dễ bị tấn công và nếu có, tất cả các thay đổi đối với các biến trạng thái sẽ được khôi phục.

**`revert()`**: `revert()` có thể được sử dụng trong câu lệnh if-else để kích hoạt một ngoại lệ nếu điều kiện yêu cầu không được thỏa mãn. Hợp đồng mẫu bên dưới sử dụng `revert()` để bảo vệ việc thực thi các hàm:

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Không cung cấp đủ Ether.");
        // Thực hiện giao dịch mua.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. Kiểm tra hợp đồng thông minh và xác minh tính đúng đắn của mã {#test-smart-contracts-and-verify-code-correctness}

Tính bất biến của mã chạy trong [Máy ảo Ethereum](/developers/docs/evm/) có nghĩa là các hợp đồng thông minh đòi hỏi mức độ đánh giá chất lượng cao hơn trong giai đoạn phát triển. Kiểm tra hợp đồng của bạn một cách rộng rãi và quan sát nó để tìm bất kỳ kết quả không mong muốn nào sẽ cải thiện đáng kể tính bảo mật và bảo vệ người dùng của bạn về lâu dài.

Phương pháp thông thường là viết các bài kiểm tra đơn vị nhỏ bằng cách sử dụng dữ liệu giả mà hợp đồng dự kiến sẽ nhận được từ người dùng. [Kiểm tra đơn vị](/developers/docs/smart-contracts/testing/#unit-testing) rất tốt để kiểm tra chức năng của một số hàm nhất định và đảm bảo hợp đồng thông minh hoạt động như mong đợi.

Thật không may, kiểm tra đơn vị có hiệu quả tối thiểu trong việc cải thiện bảo mật hợp đồng thông minh khi được sử dụng một cách riêng lẻ. Một bài kiểm tra đơn vị có thể chứng minh một hàm thực thi đúng với dữ liệu giả, nhưng các bài kiểm tra đơn vị chỉ hiệu quả khi các bài kiểm tra đó được viết ra. Điều này gây khó khăn cho việc phát hiện các trường hợp đặc biệt bị bỏ sót và các lỗ hổng có thể phá vỡ tính an toàn của hợp đồng thông minh của bạn.

Một cách tiếp cận tốt hơn là kết hợp kiểm tra đơn vị với kiểm tra dựa trên thuộc tính được thực hiện bằng cách sử dụng [phân tích tĩnh và động](/developers/docs/smart-contracts/testing/#static-dynamic-analysis). Phân tích tĩnh dựa trên các biểu diễn cấp thấp, chẳng hạn như [biểu đồ luồng điều khiển](https://en.wikipedia.org/wiki/Control-flow_graph) và [cây cú pháp trừu tượng](https://deepsource.io/glossary/ast/) để phân tích các trạng thái chương trình có thể đạt được và các đường thực thi. Trong khi đó, các kỹ thuật phân tích động, chẳng hạn như [kiểm tra mờ hợp đồng thông minh](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry), thực thi mã hợp đồng với các giá trị đầu vào ngẫu nhiên để phát hiện các hoạt động vi phạm các thuộc tính bảo mật.

[Xác minh chính thức](/developers/docs/smart-contracts/formal-verification) là một kỹ thuật khác để xác minh các thuộc tính bảo mật trong hợp đồng thông minh. Không giống như kiểm thử thông thường, xác minh chính thức có thể chứng minh một cách thuyết phục sự không có lỗi trong một hợp đồng thông minh. Điều này đạt được bằng cách tạo một đặc tả chính thức nắm bắt các thuộc tính bảo mật mong muốn và chứng minh rằng một mô hình chính thức của các hợp đồng tuân thủ đặc tả này.

### 4. Yêu cầu đánh giá độc lập về mã của bạn {#get-independent-code-reviews}

Sau khi thử nghiệm hợp đồng của bạn, tốt nhất là nhờ người khác kiểm tra mã nguồn để tìm bất kỳ vấn đề bảo mật nào. Thử nghiệm sẽ không phát hiện ra mọi sai sót trong hợp đồng thông minh, nhưng việc có được một đánh giá độc lập sẽ làm tăng khả năng phát hiện các lỗ hổng.

#### Kiểm toán {#audits}

Việc ủy thác kiểm toán hợp đồng thông minh là một cách để tiến hành đánh giá mã độc lập. Các kiểm toán viên đóng một vai trò quan trọng trong việc đảm bảo rằng các hợp đồng thông minh được bảo mật và không có các khiếm khuyết về chất lượng cũng như lỗi thiết kế.

Điều đó nói rằng, bạn nên tránh coi kiểm toán là một viên đạn bạc. Các cuộc kiểm toán hợp đồng thông minh sẽ không phát hiện ra mọi lỗi và chủ yếu được thiết kế để cung cấp một vòng đánh giá bổ sung, có thể giúp phát hiện các vấn đề mà các nhà phát triển bỏ sót trong quá trình phát triển và thử nghiệm ban đầu. Bạn cũng nên tuân theo các phương pháp hay nhất để làm việc với các kiểm toán viên, chẳng hạn như ghi lại mã đúng cách và thêm nhận xét nội tuyến, để tối đa hóa lợi ích của việc kiểm toán hợp đồng thông minh.

- [Mẹo và thủ thuật kiểm toán hợp đồng thông minh](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [Tận dụng tối đa cuộc kiểm toán của bạn](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### Tiền thưởng săn lỗi {#bug-bounties}

Thiết lập một chương trình tiền thưởng săn lỗi là một cách tiếp cận khác để thực hiện các bài đánh giá mã bên ngoài. Tiền thưởng săn lỗi là một phần thưởng tài chính dành cho các cá nhân (thường là hacker mũ trắng) phát hiện ra các lỗ hổng trong một ứng dụng.

Khi được sử dụng đúng cách, tiền thưởng săn lỗi sẽ khuyến khích các thành viên của cộng đồng hacker kiểm tra mã của bạn để tìm các sai sót nghiêm trọng. Một ví dụ thực tế là "lỗi tiền vô hạn" có thể cho phép kẻ tấn công tạo ra một lượng ether không giới hạn trên [Optimism](https://www.optimism.io/), một giao thức [Lớp 2](/layer-2/) chạy trên Ethereum. May mắn thay, một hacker mũ trắng đã [phát hiện ra lỗ hổng](https://www.saurik.com/optimism.html) và thông báo cho đội ngũ, [kiếm được một khoản thanh toán lớn trong quá trình này](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

Một chiến lược hữu ích là đặt khoản thanh toán của chương trình tiền thưởng săn lỗi tương ứng với số tiền đang bị đe dọa. Được mô tả là “[tiền thưởng săn lỗi có thể mở rộng](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”, cách tiếp cận này cung cấp các ưu đãi tài chính để các cá nhân tiết lộ các lỗ hổng một cách có trách nhiệm thay vì khai thác chúng.

### 5. Tuân thủ các phương pháp hay nhất trong quá trình phát triển hợp đồng thông minh {#follow-smart-contract-development-best-practices}

Sự tồn tại của các cuộc kiểm toán và tiền thưởng săn lỗi không miễn trừ trách nhiệm của bạn trong việc viết mã chất lượng cao. Bảo mật hợp đồng thông minh tốt bắt đầu bằng việc tuân theo các quy trình thiết kế và phát triển phù hợp:

- Lưu trữ tất cả mã trong một hệ thống kiểm soát phiên bản, chẳng hạn như git

- Thực hiện tất cả các sửa đổi mã thông qua các yêu cầu kéo

- Đảm bảo các yêu cầu kéo có ít nhất một người đánh giá độc lập—nếu bạn đang làm việc một mình trong một dự án, hãy cân nhắc tìm các nhà phát triển khác và trao đổi đánh giá mã

- Sử dụng một [môi trường phát triển](/developers/docs/frameworks/) để kiểm tra, biên dịch, triển khai các hợp đồng thông minh

- Chạy mã của bạn qua các công cụ phân tích mã cơ bản, chẳng hạn như, [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril và Slither. Lý tưởng nhất là bạn nên làm điều này trước khi mỗi yêu cầu kéo được hợp nhất và so sánh sự khác biệt trong đầu ra

- Đảm bảo mã của bạn biên dịch không có lỗi và trình biên dịch Solidity không phát ra cảnh báo nào

- Ghi lại tài liệu mã của bạn đúng cách (sử dụng [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)) và mô tả chi tiết về kiến trúc hợp đồng bằng ngôn ngữ dễ hiểu. Điều này sẽ giúp người khác kiểm toán và xem xét mã của bạn dễ dàng hơn.

### 6. Thực hiện các kế hoạch phục hồi sau thảm họa mạnh mẽ {#implement-disaster-recovery-plans}

Việc thiết kế các biện pháp kiểm soát truy cập an toàn, triển khai các công cụ sửa đổi chức năng và các đề xuất khác có thể cải thiện tính bảo mật của hợp đồng thông minh, nhưng chúng không thể loại trừ khả năng bị khai thác độc hại. Xây dựng các hợp đồng thông minh an toàn đòi hỏi phải “chuẩn bị cho thất bại” và có một kế hoạch dự phòng để ứng phó hiệu quả với các cuộc tấn công. Một kế hoạch phục hồi sau thảm họa phù hợp sẽ kết hợp một số hoặc tất cả các thành phần sau:

#### Nâng cấp hợp đồng {#contract-upgrades}

Mặc dù các hợp đồng thông minh của Ethereum mặc định là bất biến, nhưng có thể đạt được một mức độ biến đổi nhất định bằng cách sử dụng các mẫu nâng cấp. Việc nâng cấp hợp đồng là cần thiết trong trường hợp một sai sót nghiêm trọng khiến hợp đồng cũ của bạn không thể sử dụng được và việc triển khai logic mới là lựa chọn khả thi nhất.

Các cơ chế nâng cấp hợp đồng hoạt động khác nhau, nhưng “mẫu ủy quyền” là một trong những phương pháp phổ biến hơn để nâng cấp các hợp đồng thông minh. [Các mẫu ủy quyền](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern) chia trạng thái và logic của một ứng dụng giữa _hai_ hợp đồng. Hợp đồng đầu tiên (được gọi là 'hợp đồng ủy quyền') lưu trữ các biến trạng thái (ví dụ: số dư của người dùng), trong khi hợp đồng thứ hai (được gọi là 'hợp đồng logic') giữ mã để thực thi các chức năng của hợp đồng.

Các tài khoản tương tác với hợp đồng ủy quyền, hợp đồng này sẽ chuyển tất cả các lệnh gọi hàm đến hợp đồng logic bằng cách sử dụng lệnh gọi cấp thấp [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries). Không giống như một lệnh gọi thông điệp thông thường, `delegatecall()` đảm bảo mã chạy tại địa chỉ của hợp đồng logic được thực thi trong ngữ cảnh của hợp đồng gọi. Điều này có nghĩa là hợp đồng logic sẽ luôn ghi vào bộ lưu trữ của proxy (thay vì bộ lưu trữ của chính nó) và các giá trị ban đầu của `msg.sender` và `msg.value` được bảo toàn.

Việc ủy quyền các cuộc gọi đến hợp đồng logic yêu cầu lưu trữ địa chỉ của nó trong bộ nhớ của hợp đồng ủy quyền. Do đó, việc nâng cấp logic của hợp đồng chỉ là vấn đề triển khai một hợp đồng logic khác và lưu trữ địa chỉ mới trong hợp đồng ủy quyền. Vì các lệnh gọi tiếp theo đến hợp đồng proxy được tự động định tuyến đến hợp đồng logic mới, bạn sẽ “nâng cấp” hợp đồng mà không thực sự sửa đổi mã.

[Thông tin thêm về nâng cấp hợp đồng](/developers/docs/smart-contracts/upgrading/).

#### Dừng khẩn cấp {#emergency-stops}

Như đã đề cập, việc kiểm toán và thử nghiệm rộng rãi không thể phát hiện ra tất cả các lỗi trong một hợp đồng thông minh. Nếu một lỗ hổng xuất hiện trong mã của bạn sau khi triển khai, việc vá nó là không thể vì bạn không thể thay đổi mã đang chạy tại địa chỉ hợp đồng. Ngoài ra, các cơ chế nâng cấp (ví dụ: các mẫu proxy) có thể mất thời gian để thực hiện (chúng thường yêu cầu sự chấp thuận từ các bên khác nhau), điều này chỉ mang lại cho kẻ tấn công nhiều thời gian hơn để gây ra nhiều thiệt hại hơn.

Lựa chọn cuối cùng là triển khai một chức năng “dừng khẩn cấp” để chặn các cuộc gọi đến các chức năng dễ bị tấn công trong hợp đồng. Các điểm dừng khẩn cấp thường bao gồm các thành phần sau:

1. Một biến Boolean toàn cục cho biết hợp đồng thông minh đang ở trạng thái dừng hay không. Biến này được đặt thành `false` khi thiết lập hợp đồng, nhưng sẽ trở về `true` sau khi hợp đồng bị dừng.

2. Các hàm tham chiếu đến biến Boolean trong quá trình thực thi của chúng. Các hàm như vậy có thể truy cập được khi hợp đồng thông minh không bị dừng và trở nên không thể truy cập được khi tính năng dừng khẩn cấp được kích hoạt.

3. Một thực thể có quyền truy cập vào chức năng dừng khẩn cấp, đặt biến Boolean thành `true`. Để ngăn chặn các hành động độc hại, các cuộc gọi đến chức năng này có thể bị hạn chế đối với một địa chỉ đáng tin cậy (ví dụ: chủ sở hữu hợp đồng).

Khi hợp đồng kích hoạt dừng khẩn cấp, một số chức năng nhất định sẽ không thể gọi được. Điều này đạt được bằng cách bao bọc các chức năng chọn lọc trong một công cụ sửa đổi tham chiếu đến biến toàn cục. Dưới đây là [một ví dụ](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol) mô tả việc triển khai mẫu này trong các hợp đồng:

```solidity
// Mã này chưa được kiểm toán chuyên nghiệp và không đảm bảo về tính an toàn hoặc tính đúng đắn. Tự chịu rủi ro khi sử dụng.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // Kiểm tra quyền của msg.sender tại đây
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Logic gửi tiền diễn ra ở đây
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // Rút tiền khẩn cấp diễn ra ở đây
    }
}
```

Ví dụ này cho thấy các tính năng cơ bản của các điểm dừng khẩn cấp:

- `isStopped` là một Boolean đánh giá thành `false` ở đầu và `true` khi hợp đồng vào chế độ khẩn cấp.

- Các công cụ sửa đổi chức năng `onlyWhenStopped` và `stoppedInEmergency` kiểm tra biến `isStopped`. `stoppedInEmergency` được sử dụng để kiểm soát các chức năng không thể truy cập được khi hợp đồng dễ bị tấn công (ví dụ: `deposit()`). Các cuộc gọi đến các chức năng này sẽ chỉ đơn giản là hoàn nguyên.

`onlyWhenStopped` được sử dụng cho các chức năng có thể gọi được trong trường hợp khẩn cấp (ví dụ: `emergencyWithdraw()`). Các chức năng như vậy có thể giúp giải quyết tình huống, do đó chúng bị loại trừ khỏi danh sách “các chức năng bị hạn chế”.

Sử dụng chức năng dừng khẩn cấp cung cấp một biện pháp ngăn chặn hiệu quả để đối phó với các lỗ hổng nghiêm trọng trong hợp đồng thông minh của bạn. Tuy nhiên, nó làm tăng nhu cầu người dùng phải tin tưởng các nhà phát triển không kích hoạt nó vì những lý do tự phục vụ. Để đạt được mục tiêu này, việc phân cấp quyền kiểm soát việc dừng khẩn cấp bằng cách tuân theo cơ chế bỏ phiếu trên chuỗi, khóa thời gian hoặc sự chấp thuận từ ví đa chữ ký là những giải pháp khả thi.

#### Giám sát sự kiện {#event-monitoring}

[Các sự kiện](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events) cho phép bạn theo dõi các lệnh gọi đến các chức năng của hợp đồng thông minh và giám sát các thay đổi đối với các biến trạng thái. Lý tưởng nhất là lập trình hợp đồng thông minh của bạn để phát ra một sự kiện bất cứ khi nào một bên nào đó thực hiện một hành động quan trọng về mặt an toàn (ví dụ: rút tiền).

Việc ghi nhật ký các sự kiện và giám sát chúng ngoài chuỗi cung cấp thông tin chi tiết về các hoạt động của hợp đồng và hỗ trợ phát hiện các hành động độc hại nhanh hơn. Điều này có nghĩa là nhóm của bạn có thể phản ứng nhanh hơn với các vụ tấn công và thực hiện hành động để giảm thiểu tác động đến người dùng, chẳng hạn như tạm dừng các chức năng hoặc thực hiện nâng cấp.

Bạn cũng có thể chọn một công cụ giám sát có sẵn tự động chuyển tiếp cảnh báo bất cứ khi nào có người tương tác với hợp đồng của bạn. Các công cụ này sẽ cho phép bạn tạo các cảnh báo tùy chỉnh dựa trên các trình kích hoạt khác nhau, chẳng hạn như khối lượng giao dịch, tần suất gọi hàm hoặc các hàm cụ thể có liên quan. Ví dụ: bạn có thể lập trình một cảnh báo xuất hiện khi số tiền rút trong một giao dịch vượt qua một ngưỡng nhất định.

### 7. Thiết kế hệ thống quản trị an toàn {#design-secure-governance-systems}

Bạn có thể muốn phân cấp ứng dụng của mình bằng cách chuyển quyền kiểm soát các hợp đồng thông minh cốt lõi cho các thành viên cộng đồng. Trong trường hợp này, hệ thống hợp đồng thông minh sẽ bao gồm một mô-đun quản trị—một cơ chế cho phép các thành viên cộng đồng phê duyệt các hành động quản trị thông qua một hệ thống quản trị trên chuỗi. Ví dụ, một đề xuất nâng cấp hợp đồng ủy quyền lên một triển khai mới có thể được bỏ phiếu bởi những người nắm giữ token.

Quản trị phi tập trung có thể có lợi, đặc biệt là vì nó dung hòa lợi ích của các nhà phát triển và người dùng cuối. Tuy nhiên, các cơ chế quản trị hợp đồng thông minh có thể gây ra những rủi ro mới nếu được triển khai không chính xác. Một kịch bản hợp lý là nếu một kẻ tấn công có được quyền biểu quyết khổng lồ (được đo bằng số lượng token nắm giữ) bằng cách vay [khoản vay nhanh](/defi/#flash-loans) và thông qua một đề xuất độc hại.

Một cách để ngăn chặn các vấn đề liên quan đến quản trị trên chuỗi là [sử dụng khóa thời gian](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/). Khóa thời gian ngăn không cho hợp đồng thông minh thực hiện một số hành động nhất định cho đến khi một khoảng thời gian cụ thể trôi qua. Các chiến lược khác bao gồm gán “trọng số biểu quyết” cho mỗi token dựa trên thời gian nó đã được khóa, hoặc đo lường quyền biểu quyết của một địa chỉ tại một thời điểm lịch sử (ví dụ: 2-3 khối trong quá khứ) thay vì khối hiện tại. Cả hai phương pháp đều làm giảm khả năng nhanh chóng tích lũy quyền biểu quyết để thay đổi các cuộc bỏ phiếu trên chuỗi.

Thêm về [thiết kế các hệ thống quản trị an toàn](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [các cơ chế bỏ phiếu khác nhau trong các DAO](https://hackernoon.com/governance-is-the-holy-grail-for-daos) và [các vectơ tấn công DAO phổ biến tận dụng DeFi](https://dacian.me/dao-governance-defi-attacks) trong các liên kết được chia sẻ.

### 8. Giảm độ phức tạp trong mã đến mức tối thiểu {#reduce-code-complexity}

Các nhà phát triển phần mềm truyền thống đã quen thuộc với nguyên tắc KISS (“giữ nó đơn giản, ngu ngốc”), khuyên không nên đưa sự phức tạp không cần thiết vào thiết kế phần mềm. Điều này tuân theo suy nghĩ lâu đời rằng “các hệ thống phức tạp thất bại theo những cách phức tạp” và dễ bị lỗi tốn kém hơn.

Giữ mọi thứ đơn giản là điều đặc biệt quan trọng khi viết các hợp đồng thông minh, vì các hợp đồng thông minh có khả năng kiểm soát một lượng lớn giá trị. Một mẹo để đạt được sự đơn giản khi viết các hợp đồng thông minh là sử dụng lại các thư viện hiện có, chẳng hạn như [Hợp đồng OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/), nếu có thể. Bởi vì các thư viện này đã được các nhà phát triển kiểm toán và thử nghiệm rộng rãi, việc sử dụng chúng sẽ làm giảm khả năng gây ra lỗi bằng cách viết chức năng mới từ đầu.

Một lời khuyên phổ biến khác là viết các hàm nhỏ và giữ cho các hợp đồng có tính mô-đun bằng cách chia logic kinh doanh thành nhiều hợp đồng. Việc viết mã đơn giản hơn không chỉ làm giảm bề mặt tấn công trong một hợp đồng thông minh, mà còn giúp dễ dàng suy luận về tính đúng đắn của toàn bộ hệ thống và phát hiện các lỗi thiết kế có thể xảy ra sớm.

### 9. Phòng chống các lỗ hổng hợp đồng thông minh phổ biến {#mitigate-common-smart-contract-vulnerabilities}

#### Tái nhập {#reentrancy}

EVM không cho phép đồng thời, nghĩa là hai hợp đồng liên quan đến một lệnh gọi thông điệp không thể chạy đồng thời. Một lệnh gọi bên ngoài sẽ tạm dừng việc thực thi và bộ nhớ của hợp đồng đang gọi cho đến khi lệnh gọi trả về, tại thời điểm đó việc thực thi sẽ tiếp tục bình thường. Quá trình này có thể được mô tả chính thức là chuyển [luồng điều khiển](https://www.computerhope.com/jargon/c/contflow.htm) sang một hợp đồng khác.

Mặc dù hầu như vô hại, việc chuyển luồng điều khiển đến các hợp đồng không đáng tin cậy có thể gây ra các vấn đề, chẳng hạn như tái nhập. Một cuộc tấn công tái nhập xảy ra khi một hợp đồng độc hại gọi lại một hợp đồng dễ bị tấn công trước khi lệnh gọi hàm ban đầu hoàn tất. Loại tấn công này được giải thích tốt nhất bằng một ví dụ.

Hãy xem xét một hợp đồng thông minh đơn giản ('Nạn nhân') cho phép bất kỳ ai gửi và rút ether:

```solidity
// Hợp đồng này dễ bị tấn công. Không sử dụng trong sản xuất

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Hợp đồng này hiển thị hàm `withdraw()` để cho phép người dùng rút ETH đã gửi trước đó trong hợp đồng. Khi xử lý một yêu cầu rút tiền, hợp đồng thực hiện các hoạt động sau:

1. Kiểm tra số dư ETH của người dùng
2. Gửi tiền đến địa chỉ gọi
3. Đặt lại số dư của họ về 0, ngăn người dùng rút thêm tiền

Hàm `withdraw()` trong hợp đồng `Victim` tuân theo mẫu “kiểm tra-tương tác-hiệu ứng”. Nó _kiểm tra_ xem các điều kiện cần thiết cho việc thực thi có được thỏa mãn không (tức là người dùng có số dư ETH dương) và thực hiện _tương tác_ bằng cách gửi ETH đến địa chỉ của người gọi, trước khi áp dụng _hiệu ứng_ của giao dịch (tức là giảm số dư của người dùng).

Nếu `withdraw()` được gọi từ một tài khoản sở hữu bên ngoài (EOA), hàm sẽ thực thi như mong đợi: `msg.sender.call.value()` gửi ETH cho người gọi. Tuy nhiên, nếu `msg.sender` là một tài khoản hợp đồng thông minh gọi `withdraw()`, việc gửi tiền bằng `msg.sender.call.value()` cũng sẽ kích hoạt mã được lưu trữ tại địa chỉ đó để chạy.

Hãy tưởng tượng đây là mã được triển khai tại địa chỉ hợp đồng:

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

Hợp đồng này được thiết kế để thực hiện ba việc:

1. Chấp nhận tiền gửi từ một tài khoản khác (có thể là EOA của kẻ tấn công)
2. Gửi 1 ETH vào hợp đồng Nạn nhân
3. Rút 1 ETH được lưu trữ trong hợp đồng thông minh

Không có gì sai ở đây, ngoại trừ việc `Attacker` có một hàm khác gọi lại `withdraw()` trong `Victim` nếu lượng gas còn lại từ `msg.sender.call.value` đến lớn hơn 40.000. Điều này cho phép `Attacker` có khả năng tái nhập `Victim` và rút thêm tiền _trước khi_ lần gọi `withdraw` đầu tiên hoàn tất. Chu trình trông như thế này:

```solidity
- EOA của kẻ tấn công gọi `Attacker.beginAttack()` với 1 ETH
- `Attacker.beginAttack()` gửi 1 ETH vào `Victim`
- `Attacker` gọi `withdraw()` trong `Victim`
- `Victim` kiểm tra số dư của `Attacker` (1 ETH)
- `Victim` gửi 1 ETH cho `Attacker` (kích hoạt hàm mặc định)
- `Attacker` gọi lại `Victim.withdraw()` (lưu ý rằng `Victim` chưa giảm số dư của `Attacker` từ lần rút đầu tiên)
- `Victim` kiểm tra số dư của `Attacker` (vẫn là 1 ETH vì nó chưa áp dụng hiệu ứng của lần gọi đầu tiên)
- `Victim` gửi 1 ETH cho `Attacker` (kích hoạt hàm mặc định và cho phép `Attacker` tái nhập vào hàm `withdraw`)
- Quá trình này lặp lại cho đến khi `Attacker` hết gas, tại thời điểm đó `msg.sender.call.value` trả về mà không kích hoạt thêm các lần rút tiền
- `Victim` cuối cùng áp dụng kết quả của giao dịch đầu tiên (và các giao dịch tiếp theo) vào trạng thái của nó, do đó số dư của `Attacker` được đặt về 0
```

Tóm lại là vì số dư của người gọi không được đặt về 0 cho đến khi việc thực thi hàm hoàn tất, các lần gọi tiếp theo sẽ thành công và cho phép người gọi rút số dư của họ nhiều lần. Loại tấn công này có thể được sử dụng để rút cạn tiền của một hợp đồng thông minh, giống như những gì đã xảy ra trong [vụ hack DAO năm 2016](https://www.coindesk.com/learn/understanding-the-dao-attack). Các cuộc tấn công tái nhập vẫn là một vấn đề nghiêm trọng đối với các hợp đồng thông minh ngày nay như [danh sách công khai về các khai thác tái nhập](https://github.com/pcaversaccio/reentrancy-attacks) cho thấy.

##### Làm thế nào để ngăn chặn các cuộc tấn công tái nhập

Một cách tiếp cận để đối phó với tái nhập là tuân theo [mô hình kiểm tra-hiệu ứng-tương tác](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern). Mẫu này sắp xếp thứ tự thực thi các hàm theo cách mà mã thực hiện các kiểm tra cần thiết trước khi tiếp tục thực thi sẽ đứng đầu, theo sau là mã thao túng trạng thái hợp đồng, với mã tương tác với các hợp đồng khác hoặc EOA sẽ đến cuối cùng.

Mô hình kiểm tra-hiệu ứng-tương tác được sử dụng trong phiên bản sửa đổi của hợp đồng `Victim` được hiển thị bên dưới:

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

Hợp đồng này thực hiện một _kiểm tra_ số dư của người dùng, áp dụng _hiệu ứng_ của hàm `withdraw()` (bằng cách đặt lại số dư của người dùng về 0), và tiến hành thực hiện _tương tác_ (gửi ETH đến địa chỉ của người dùng). Điều này đảm bảo hợp đồng cập nhật bộ nhớ của nó trước khi thực hiện lệnh gọi bên ngoài, loại bỏ điều kiện tái nhập đã cho phép cuộc tấn công đầu tiên. Hợp đồng `Attacker` vẫn có thể gọi lại vào `NoLongerAVictim`, nhưng vì `balances[msg.sender]` đã được đặt thành 0, các lần rút tiền bổ sung sẽ gây ra lỗi.

Một lựa chọn khác là sử dụng khóa loại trừ lẫn nhau (thường được mô tả là "mutex") để khóa một phần trạng thái của hợp đồng cho đến khi một lệnh gọi hàm hoàn tất. Điều này được thực hiện bằng cách sử dụng một biến Boolean được đặt thành `true` trước khi hàm thực thi và trở về `false` sau khi lệnh gọi hoàn tất. Như đã thấy trong ví dụ bên dưới, việc sử dụng mutex bảo vệ một hàm khỏi các lệnh gọi đệ quy trong khi lệnh gọi ban đầu vẫn đang được xử lý, ngăn chặn hiệu quả việc tái nhập.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Bị chặn do tái nhập.");
        locked = true;
        _;
        locked = false;
    }
    // Hàm này được bảo vệ bởi một mutex, vì vậy các lệnh gọi tái nhập từ bên trong `msg.sender.call` không thể gọi lại `withdraw`.
    //  Câu lệnh `return` đánh giá thành `true` nhưng vẫn đánh giá câu lệnh `locked = false` trong công cụ sửa đổi
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "Không có số dư để rút.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

Bạn cũng có thể sử dụng hệ thống [thanh toán kéo](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment) yêu cầu người dùng rút tiền từ các hợp đồng thông minh, thay vì hệ thống "thanh toán đẩy" gửi tiền đến các tài khoản. Điều này loại bỏ khả năng vô tình kích hoạt mã tại các địa chỉ không xác định (và cũng có thể ngăn chặn một số cuộc tấn công từ chối dịch vụ).

#### Tràn số và thiếu số nguyên {#integer-underflows-and-overflows}

Tràn số nguyên xảy ra khi kết quả của một phép toán số học nằm ngoài phạm vi giá trị chấp nhận được, khiến nó "lăn" về giá trị có thể biểu diễn thấp nhất. Ví dụ, một `uint8` chỉ có thể lưu trữ các giá trị lên tới 2^8-1=255. Các phép toán số học dẫn đến các giá trị cao hơn `255` sẽ tràn và đặt lại `uint` thành `0`, tương tự như cách đồng hồ đo quãng đường trên xe hơi đặt lại về 0 khi đạt đến quãng đường tối đa (999999).

Tràn số nguyên xảy ra vì những lý do tương tự: kết quả của một phép toán số học nằm dưới phạm vi chấp nhận được. Giả sử bạn đã cố gắng giảm `0` trong một `uint8`, kết quả sẽ chỉ đơn giản là quay trở lại giá trị có thể biểu diễn tối đa (`255`).

Cả tràn số nguyên và thiếu số đều có thể dẫn đến những thay đổi không mong muốn đối với các biến trạng thái của hợp đồng và dẫn đến việc thực thi không theo kế hoạch. Dưới đây là một ví dụ cho thấy cách kẻ tấn công có thể khai thác tràn số học trong một hợp đồng thông minh để thực hiện một hoạt động không hợp lệ:

```
pragma solidity ^0.7.6;

// Hợp đồng này được thiết kế để hoạt động như một kho tiền thời gian.
// Người dùng có thể gửi tiền vào hợp đồng này nhưng không thể rút tiền trong ít nhất một tuần.
// Người dùng cũng có thể kéo dài thời gian chờ đợi vượt quá thời gian chờ 1 tuần.

/*
1. Triển khai TimeLock
2. Triển khai Attack với địa chỉ của TimeLock
3. Gọi Attack.attack gửi 1 ether. Bạn sẽ có thể ngay lập tức
   rút ether của mình.

Chuyện gì đã xảy ra?
Attack đã làm cho TimeLock.lockTime bị tràn và có thể rút tiền
trước thời gian chờ 1 tuần.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Không đủ tiền");
        require(block.timestamp > lockTime[msg.sender], "Thời gian khóa chưa hết hạn");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Không gửi được Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        nếu t = thời gian khóa hiện tại thì chúng ta cần tìm x sao cho
        x + t = 2**256 = 0
        vậy x = -t
        2**256 = type(uint).max + 1
        vậy x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### Làm thế nào để ngăn chặn tràn số và thiếu số nguyên

Kể từ phiên bản 0.8.0, trình biên dịch Solidity từ chối mã dẫn đến tràn số và thiếu số nguyên. Tuy nhiên, các hợp đồng được biên dịch với phiên bản trình biên dịch thấp hơn nên thực hiện kiểm tra các hàm liên quan đến các phép toán số học hoặc sử dụng một thư viện (ví dụ: [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)) để kiểm tra tràn/thiếu số.

#### Thao tác Oracle {#oracle-manipulation}

[Oracles](/developers/docs/oracles/) lấy thông tin ngoài chuỗi và gửi nó lên chuỗi để các hợp đồng thông minh sử dụng. Với các oracle, bạn có thể thiết kế các hợp đồng thông minh tương tác với các hệ thống ngoài chuỗi, chẳng hạn như thị trường vốn, mở rộng đáng kể ứng dụng của chúng.

Nhưng nếu oracle bị hỏng và gửi thông tin không chính xác lên chuỗi, các hợp đồng thông minh sẽ thực thi dựa trên các đầu vào sai, điều này có thể gây ra sự cố. Đây là cơ sở của “vấn đề oracle”, liên quan đến nhiệm vụ đảm bảo thông tin từ một oracle blockchain là chính xác, cập nhật và kịp thời.

Một mối quan tâm bảo mật liên quan là sử dụng một oracle trên chuỗi, chẳng hạn như một sàn giao dịch phi tập trung, để lấy giá giao ngay cho một tài sản. Các nền tảng cho vay trong ngành [tài chính phi tập trung (DeFi)](/defi/) thường làm điều này để xác định giá trị tài sản thế chấp của người dùng để xác định số tiền họ có thể vay.

Giá DEX thường chính xác, phần lớn là do các nhà kinh doanh chênh lệch giá khôi phục sự cân bằng trên thị trường. Tuy nhiên, chúng có thể bị thao túng, đặc biệt nếu oracle trên chuỗi tính toán giá tài sản dựa trên các mẫu giao dịch lịch sử (như thường lệ).

Ví dụ, một kẻ tấn công có thể tăng giá giao ngay của một tài sản một cách nhân tạo bằng cách vay một khoản vay nhanh ngay trước khi tương tác với hợp đồng cho vay của bạn. Việc truy vấn DEX để biết giá của tài sản sẽ trả về một giá trị cao hơn bình thường (do “lệnh mua” lớn của kẻ tấn công làm lệch nhu cầu đối với tài sản), cho phép họ vay nhiều hơn mức họ nên vay. Các "cuộc tấn công cho vay nhanh" như vậy đã được sử dụng để khai thác sự phụ thuộc vào các oracle giá giữa các ứng dụng DeFi, khiến các giao thức thiệt hại hàng triệu đô la tiền bị mất.

##### Làm thế nào để ngăn chặn thao tác oracle

Yêu cầu tối thiểu để [tránh thao túng oracle](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) là sử dụng một mạng oracle phi tập trung truy vấn thông tin từ nhiều nguồn để tránh các điểm lỗi duy nhất. Trong hầu hết các trường hợp, các oracle phi tập trung có các ưu đãi kinh tế tiền mã hóa tích hợp để khuyến khích các nút oracle báo cáo thông tin chính xác, khiến chúng an toàn hơn các oracle tập trung.

Nếu bạn dự định truy vấn một oracle trên chuỗi để biết giá tài sản, hãy cân nhắc sử dụng một oracle triển khai cơ chế giá trung bình theo thời gian (TWAP). Một [oracle TWAP](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) truy vấn giá của một tài sản tại hai thời điểm khác nhau (mà bạn có thể sửa đổi) và tính toán giá giao ngay dựa trên mức trung bình thu được. Việc chọn các khoảng thời gian dài hơn sẽ bảo vệ giao thức của bạn khỏi thao túng giá vì các lệnh lớn được thực hiện gần đây không thể ảnh hưởng đến giá tài sản.

## Tài nguyên bảo mật hợp đồng thông minh cho các nhà phát triển {#smart-contract-security-resources-for-developers}

### Các công cụ để phân tích hợp đồng thông minh và xác minh tính đúng đắn của mã {#code-analysis-tools}

- **[Các công cụ và thư viện kiểm thử](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _Bộ sưu tập các công cụ và thư viện tiêu chuẩn ngành để thực hiện các bài kiểm thử đơn vị, phân tích tĩnh và phân tích động trên các hợp đồng thông minh._

- **[Các công cụ xác minh chính thức](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _Các công cụ để xác minh tính đúng đắn về mặt chức năng trong các hợp đồng thông minh và kiểm tra các bất biến._

- **[Các dịch vụ kiểm toán hợp đồng thông minh](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _Danh sách các tổ chức cung cấp dịch vụ kiểm toán hợp đồng thông minh cho các dự án phát triển Ethereum._

- **[Các nền tảng tiền thưởng săn lỗi](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _Các nền tảng để phối hợp các chương trình tiền thưởng săn lỗi và thưởng cho việc tiết lộ có trách nhiệm các lỗ hổng nghiêm trọng trong các hợp đồng thông minh._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _Một công cụ trực tuyến miễn phí để kiểm tra tất cả thông tin có sẵn về một hợp đồng được phân nhánh._

- **[ABI Encoder](https://abi.hashex.org/)** - _Một dịch vụ trực tuyến miễn phí để mã hóa các hàm và đối số hàm tạo của hợp đồng Solidity của bạn._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Công cụ phân tích tĩnh Solidity, duyệt qua Cây cú pháp trừu tượng (AST) để xác định các lỗ hổng đáng ngờ và in ra các vấn đề ở định dạng markdown dễ sử dụng._

### Các công cụ để giám sát hợp đồng thông minh {#smart-contract-monitoring-tools}

- **[Tenderly Real-Time Alerting](https://tenderly.co/monitoring)** - _Một công cụ để nhận thông báo theo thời gian thực khi các sự kiện bất thường hoặc không mong muốn xảy ra trên các hợp đồng thông minh hoặc ví của bạn._

### Các công cụ để quản trị an toàn các hợp đồng thông minh {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _Ví hợp đồng thông minh chạy trên Ethereum yêu cầu một số lượng người tối thiểu phải phê duyệt một giao dịch trước khi nó có thể xảy ra (M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _Thư viện hợp đồng để triển khai các tính năng quản trị, bao gồm quyền sở hữu hợp đồng, nâng cấp, kiểm soát truy cập, quản trị, khả năng tạm dừng và hơn thế nữa._

### Dịch vụ kiểm toán hợp đồng thông minh {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _Dịch vụ kiểm toán hợp đồng thông minh giúp các dự án trên toàn hệ sinh thái chuỗi khối đảm bảo các giao thức của họ sẵn sàng ra mắt và được xây dựng để bảo vệ người dùng._

- **[CertiK](https://www.certik.com/)** - _Công ty bảo mật chuỗi khối tiên phong trong việc sử dụng công nghệ Xác minh chính thức tiên tiến trên các hợp đồng thông minh và mạng chuỗi khối._

- **[Trail of Bits](https://www.trailofbits.com/)** - _Công ty an ninh mạng kết hợp nghiên cứu bảo mật với tâm lý của kẻ tấn công để giảm thiểu rủi ro và củng cố mã._

- **[PeckShield](https://peckshield.com/)** - _Công ty bảo mật chuỗi khối cung cấp các sản phẩm và dịch vụ cho sự bảo mật, quyền riêng tư và khả năng sử dụng của toàn bộ hệ sinh thái chuỗi khối._

- **[QuantStamp](https://quantstamp.com/)** - _Dịch vụ kiểm toán tạo điều kiện cho việc áp dụng công nghệ chuỗi khối vào xu hướng chủ đạo thông qua các dịch vụ đánh giá bảo mật và rủi ro._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _Công ty bảo mật hợp đồng thông minh cung cấp các cuộc kiểm toán bảo mật cho các hệ thống phân tán._

- **[Runtime Verification](https://runtimeverification.com/)** - _Công ty bảo mật chuyên về mô hình hóa chính thức và xác minh các hợp đồng thông minh._

- **[Hacken](https://hacken.io)** - _Kiểm toán viên an ninh mạng Web3 mang lại phương pháp tiếp cận 360 độ cho bảo mật chuỗi khối._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _Các dịch vụ kiểm toán Solidity và Cairo, đảm bảo tính toàn vẹn của các hợp đồng thông minh và sự an toàn của người dùng trên Ethereum và Starknet._

- **[HashEx](https://hashex.org/)** - _HashEx tập trung vào kiểm toán chuỗi khối và hợp đồng thông minh để đảm bảo an ninh cho tiền mã hóa, cung cấp các dịch vụ như phát triển hợp đồng thông minh, kiểm thử thâm nhập, tư vấn chuỗi khối._

- **[Code4rena](https://code4rena.com/)** - _Nền tảng kiểm toán cạnh tranh khuyến khích các chuyên gia bảo mật hợp đồng thông minh tìm ra các lỗ hổng và giúp web3 trở nên an toàn hơn._

- **[CodeHawks](https://codehawks.com/)** - _Nền tảng kiểm toán cạnh tranh tổ chức các cuộc thi kiểm toán hợp đồng thông minh cho các nhà nghiên cứu bảo mật._

- **[Cyfrin](https://cyfrin.io)** - _Công ty hàng đầu về bảo mật Web3, ươm mầm bảo mật tiền mã hóa thông qua các sản phẩm và dịch vụ kiểm toán hợp đồng thông minh._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Công ty bảo mật Web3 cung cấp các dịch vụ kiểm toán bảo mật cho các hệ thống blockchain thông qua một đội ngũ kiểm toán viên giàu kinh nghiệm và các công cụ tốt nhất._

- **[Oxorio](https://oxor.io/)** - _Dịch vụ kiểm toán hợp đồng thông minh và bảo mật blockchain với chuyên môn về EVM, Solidity, ZK, công nghệ chuỗi chéo cho các công ty tiền mã hóa và các dự án DeFi._

- **[Inference](https://inference.ag/)** - _Công ty kiểm toán bảo mật, chuyên về kiểm toán hợp đồng thông minh cho các chuỗi khối dựa trên EVM. Nhờ các kiểm toán viên chuyên gia của mình, họ xác định các vấn đề tiềm ẩn và đề xuất các giải pháp khả thi để khắc phục chúng trước khi triển khai._

### Các nền tảng tiền thưởng săn lỗi {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _Nền tảng tiền thưởng săn lỗi cho các hợp đồng thông minh và các dự án DeFi, nơi các nhà nghiên cứu bảo mật xem xét mã, tiết lộ các lỗ hổng, được trả tiền và làm cho tiền mã hóa an toàn hơn._

- **[HackerOne](https://www.hackerone.com/)** - _Nền tảng điều phối lỗ hổng và tiền thưởng săn lỗi kết nối các doanh nghiệp với những người kiểm thử thâm nhập và các nhà nghiên cứu an ninh mạng._

- **[HackenProof](https://hackenproof.com/)** - _Nền tảng tiền thưởng săn lỗi chuyên nghiệp cho các dự án tiền mã hóa (DeFi, Hợp đồng thông minh, Ví, CEX và hơn thế nữa), nơi các chuyên gia bảo mật cung cấp dịch vụ phân loại và các nhà nghiên cứu được trả tiền cho các báo cáo lỗi có liên quan, đã được xác minh._

- **[Sherlock](https://www.sherlock.xyz/)** - _Bảo lãnh phát hành trong Web3 cho bảo mật hợp đồng thông minh, với các khoản thanh toán cho kiểm toán viên được quản lý thông qua các hợp đồng thông minh để đảm bảo rằng các lỗi có liên quan được thanh toán một cách công bằng._

- **[CodeHawks](https://www.codehawks.com/)** - _Nền tảng tiền thưởng săn lỗi cạnh tranh, nơi các kiểm toán viên tham gia các cuộc thi và thử thách bảo mật, và (sắp tới) trong các cuộc kiểm toán riêng của họ._

### Các ấn phẩm về các lỗ hổng và khai thác hợp đồng thông minh đã biết {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: Các cuộc tấn công đã biết trong Hợp đồng thông minh](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _Giải thích thân thiện với người mới bắt đầu về các lỗ hổng hợp đồng quan trọng nhất, với mã mẫu cho hầu hết các trường hợp._

- **[SWC Registry](https://swcregistry.io/)** - _Danh sách được tuyển chọn các mục Liệt kê Điểm yếu Chung (CWE) áp dụng cho các hợp đồng thông minh Ethereum._

- **[Rekt](https://rekt.news/)** - _Ấn phẩm được cập nhật thường xuyên về các vụ tấn công và khai thác tiền mã hóa nổi tiếng, cùng với các báo cáo khám nghiệm chi tiết._

### Các thử thách để học bảo mật hợp đồng thông minh {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _Danh sách được tuyển chọn các trò chơi chiến tranh bảo mật blockchain, các thử thách, và các cuộc thi [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) và các bài viết giải pháp._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _Trò chơi chiến tranh để học bảo mật tấn công của các hợp đồng thông minh DeFi và xây dựng kỹ năng săn lỗi và kiểm toán bảo mật._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _Trò chơi chiến tranh dựa trên Web3/Solidity, trong đó mỗi cấp độ là một hợp đồng thông minh cần phải bị 'tấn công'._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _Thử thách hack hợp đồng thông minh, lấy bối cảnh trong một cuộc phiêu lưu giả tưởng. Việc hoàn thành thành công thử thách cũng cho phép truy cập vào một chương trình tiền thưởng săn lỗi riêng tư._

### Các phương pháp hay nhất để bảo mật hợp đồng thông minh {#smart-contract-security-best-practices}

- **[ConsenSys: Các phương pháp hay nhất về bảo mật hợp đồng thông minh Ethereum](https://consensys.github.io/smart-contract-best-practices/)** - _Danh sách toàn diện các hướng dẫn để bảo mật các hợp đồng thông minh Ethereum._

- **[Nascent: Bộ công cụ bảo mật đơn giản](https://github.com/nascentxyz/simple-security-toolkit)** - _Bộ sưu tập các hướng dẫn và danh sách kiểm tra tập trung vào bảo mật thực tế để phát triển hợp đồng thông minh._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _Tổng hợp hữu ích các mẫu bảo mật và các phương pháp hay nhất cho ngôn ngữ lập trình hợp đồng thông minh Solidity._

- **[Tài liệu Solidity: Các cân nhắc về bảo mật](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Hướng dẫn viết các hợp đồng thông minh an toàn với Solidity._

- **[Tiêu chuẩn xác minh bảo mật hợp đồng thông minh](https://github.com/securing/SCSVS)** - _Danh sách kiểm tra mười bốn phần được tạo ra để tiêu chuẩn hóa bảo mật của các hợp đồng thông minh cho các nhà phát triển, kiến trúc sư, người đánh giá bảo mật và các nhà cung cấp._

- **[Học bảo mật và kiểm toán hợp đồng thông minh](https://updraft.cyfrin.io/courses/security)** - _Khóa học bảo mật và kiểm toán hợp đồng thông minh tối ưu, được tạo ra cho các nhà phát triển hợp đồng thông minh muốn nâng cao các phương pháp hay nhất về bảo mật của họ và trở thành các nhà nghiên cứu bảo mật._

### Hướng dẫn về bảo mật hợp đồng thông minh {#tutorials-on-smart-contract-security}

- [Cách viết các hợp đồng thông minh an toàn](/developers/tutorials/secure-development-workflow/)

- [Cách sử dụng Slither để tìm lỗi hợp đồng thông minh](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Cách sử dụng Manticore để tìm lỗi hợp đồng thông minh](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [Hướng dẫn bảo mật hợp đồng thông minh](/developers/tutorials/smart-contract-security-guidelines/)

- [Cách tích hợp an toàn hợp đồng token của bạn với các token tùy ý](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - Khóa học đầy đủ về bảo mật và kiểm toán hợp đồng thông minh](https://updraft.cyfrin.io/courses/security)
