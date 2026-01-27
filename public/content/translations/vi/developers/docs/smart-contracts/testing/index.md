---
title: "Thử nghiệm hợp đồng thông minh"
description: "Tổng quan về kỹ thuật và những điều cần cân nhắc khi kiểm tra hợp đồng thông minh Ethereum."
lang: vi
---

Các blockchain công khai như Ethereum không thể thay đổi, nên rất khó để sửa đổi mã hợp đồng thông minh sau khi đã triển khai. [Các mẫu nâng cấp hợp đồng](/developers/docs/smart-contracts/upgrading/) để thực hiện "nâng cấp ảo" có tồn tại, nhưng chúng rất khó thực hiện và đòi hỏi sự đồng thuận của xã hội. Hơn nữa, một bản nâng cấp chỉ có thể sửa lỗi _sau khi_ nó được phát hiện—nếu kẻ tấn công phát hiện ra lỗ hổng trước, hợp đồng thông minh của bạn có nguy cơ bị khai thác.

Vì những lý do này, việc kiểm tra các hợp đồng thông minh trước khi [triển khai](/developers/docs/smart-contracts/deploying/) lên Mạng chính là một yêu cầu tối thiểu về [bảo mật](/developers/docs/smart-contracts/security/). Có nhiều cách để kiểm tra hợp đồng và đánh giá độ chính xác của mã; thứ bạn chọn sẽ phụ thuộc vào nhu cầu của bạn. Dù sao thì, một bộ kiểm thử bao gồm nhiều công cụ và phương pháp khác nhau là lựa chọn tuyệt vời để phát hiện cả những lỗ hổng bảo mật nhỏ và lớn trong mã hợp đồng.

## Điều kiện tiên quyết {#prerequisites}

Trang này giải thích cách kiểm tra hợp đồng thông minh trước khi triển khai trên mạng Ethereum. Điều này giả định rằng bạn đã quen thuộc với [các hợp đồng thông minh](/developers/docs/smart-contracts/).

## Kiểm tra hợp đồng thông minh là gì? {#what-is-smart-contract-testing}
Kiểm tra hợp đồng thông minh là quá trình xác nhận rằng mã của hợp đồng thông minh hoạt động như mong đợi. Việc kiểm tra là cần thiết để xác minh liệu một hợp đồng thông minh cụ thể có đáp ứng các yêu cầu về độ tin cậy, tính hữu dụng và an ninh hay không.

Mặc dù có nhiều cách tiếp cận khác nhau, nhưng hầu hết các phương pháp kiểm tra đều cần thực hiện một hợp đồng thông minh với một mẫu nhỏ dữ liệu mà nó dự kiến sẽ xử lý. Nếu hợp đồng tạo ra kết quả đúng cho dữ liệu mẫu, nó được cho là hoạt động chính xác. Hầu hết các công cụ kiểm tra cung cấp tài nguyên để viết và thực thi các [trường hợp kiểm tra](https://en.m.wikipedia.org/wiki/Test_case) để kiểm tra xem việc thực thi hợp đồng có khớp với kết quả mong đợi hay không.

### Tại sao việc kiểm tra hợp đồng thông minh lại quan trọng? Tầm quan trọng của việc kiểm tra các hợp đồng thông minh {#importance-of-testing-smart-contracts}

Vì các hợp đồng thông minh thường quản lý các tài sản tài chính có giá trị cao, những lỗi lập trình nhỏ có thể và thường dẫn đến [những khoản thua lỗ lớn cho người dùng](https://rekt.news/leaderboard/). Việc kiểm tra kỹ lưỡng có thể giúp bạn tìm ra lỗi và vấn đề trong mã của hợp đồng thông minh sớm hơn, từ đó sửa chữa trước khi đưa lên Mainnet.

Mặc dù có thể nâng cấp hợp đồng nếu phát hiện lỗi, nhưng việc nâng cấp thì khá phức tạp và có thể [gây ra lỗi](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) nếu không được xử lý đúng cách. Việc nâng cấp một hợp đồng càng làm trái nguyên tắc không biến đổi và đặt thêm gánh nặng về niềm tin lên người dùng. Ngược lại, một kế hoạch toàn diện để thử nghiệm hợp đồng của bạn giảm thiểu rủi ro bảo mật hợp đồng thông minh và giảm nhu cầu thực hiện các nâng cấp logic phức tạp sau khi triển khai.

## Các phương pháp kiểm tra hợp đồng thông minh {#methods-for-testing-smart-contracts}

Các phương pháp kiểm tra hợp đồng thông minh của Ethereum được chia thành hai loại chính: **kiểm tra tự động** và **kiểm tra thủ công**. Kiểm thử tự động và kiểm thử thủ công đều mang lại những lợi ích và hạn chế riêng, nhưng bạn có thể kết hợp cả hai để tạo ra một kế hoạch vững chắc trong việc phân tích các hợp đồng thông minh của mình.

### Kiểm tra tự động {#automated-testing}

Kiểm thử tự động sử dụng các công cụ để tự động kiểm tra mã hợp đồng thông minh nhằm phát hiện lỗi trong quá trình thực thi. Lợi ích của việc kiểm tra tự động đến từ việc sử dụng [các tập lệnh](https://www.techtarget.com/whatis/definition/script?amp=1) để hướng dẫn đánh giá các chức năng của hợp đồng. Các bài kiểm thử theo kịch bản có thể được lập lịch để chạy nhiều lần với sự can thiệp của con người tối thiểu, khiến kiểm thử tự động hiệu quả hơn so với các phương pháp kiểm thử thủ công.

Kiểm thử tự động đặc biệt hữu ích khi các bài kiểm thử lặp đi lặp lại và tốn nhiều thời gian; khó thực hiện thủ công; dễ bị lỗi do con người; hoặc liên quan đến việc đánh giá các chức năng quan trọng của hợp đồng thông minh. Nhưng các công cụ kiểm tra tự động có thể có những nhược điểm—chúng có thể bỏ lỡ một số lỗi nhất định và tạo ra nhiều [kết quả dương tính giả](https://www.contrastsecurity.com/glossary/false-positive). Do đó, việc kết hợp kiểm thử tự động với kiểm thử thủ công cho hợp đồng thông minh là lý tưởng.

### Kiểm tra thủ công {#manual-testing}

Kiểm thử thủ công có sự hỗ trợ của con người và bao gồm việc thực hiện từng trường hợp kiểm thử trong bộ kiểm thử của bạn lần lượt, nhằm phân tích độ chính xác của hợp đồng thông minh. Điều này khác với kiểm thử tự động, nơi bạn có thể chạy đồng thời nhiều bài kiểm thử tách biệt trên một hợp đồng thông minh và nhận được báo cáo hiển thị tất cả các bài kiểm thử thành công và thất bại.

Kiểm thử thủ công có thể được thực hiện bởi một cá nhân theo một kế hoạch kiểm thử đã được viết sẵn, bao quát các kịch bản kiểm thử khác nhau. Bạn cũng có thể để nhiều cá nhân hoặc nhóm tương tác với một hợp đồng thông minh trong một khoảng thời gian xác định như một phần của kiểm thử thủ công. Người kiểm thử sẽ so sánh hành vi thực tế của hợp đồng thông minh với hành vi dự kiến, và đánh dấu bất kỳ khác biệt nào là lỗi.

Kiểm thử thủ công hiệu quả đòi hỏi nguồn lực đáng kể (kỹ năng, thời gian, tiền bạc và công sức), và do lỗi con người, việc bỏ sót một số lỗi trong quá trình thực hiện kiểm thử là điều có thể xảy ra. Nhưng việc kiểm tra thủ công cũng có lợi đó—ví dụ như một người kiểm tra (như một kiểm toán viên) có thể dùng trực giác để phát hiện những trường hợp đặc biệt mà công cụ kiểm tra tự động có thể bỏ lỡ.

## Kiểm tra tự động cho các hợp đồng thông minh {#automated-testing-for-smart-contracts}

### Kiểm tra đơn vị {#unit-testing-for-smart-contracts}

Kiểm thử đơn vị đánh giá các hàm hợp đồng một cách riêng biệt và kiểm tra rằng từng thành phần hoạt động chính xác. Các bài kiểm thử đơn vị tốt nên đơn giản, nhanh chóng để chạy và cung cấp một ý tưởng rõ ràng về những gì đã sai nếu các bài kiểm tra không thành công.

Các bài kiểm thử đơn vị rất hữu ích để kiểm tra rằng các hàm trả về giá trị như mong đợi và rằng việc lưu trữ hợp đồng được cập nhật đúng sau khi thực thi hàm hay không. Hơn nữa, việc chạy các bài kiểm thử đơn vị sau khi thực hiện thay đổi trong mã nguồn hợp đồng đảm bảo rằng việc thêm logic mới không gây ra lỗi. Dưới đây là một số hướng dẫn để thực hiện các bài kiểm thử đơn vị hiệu quả:

#### Hướng dẫn kiểm tra đơn vị cho các hợp đồng thông minh {#unit-testing-guidelines}

##### 1. Hiểu rõ quy trình và logic kinh doanh trong hợp đồng của bạn

Trước khi viết bài kiểm tra đơn vị, nó sẽ giúp việc biết được hợp đồng thông minh cung cấp những chức năng gì và người dùng sẽ truy cập và sử dụng những chức năng đó như thế nào. Điều này đặc biệt hữu ích cho việc chạy [các bài kiểm tra luồng chính](https://en.m.wikipedia.org/wiki/Happy_path) nhằm xác định xem các hàm trong một hợp đồng có trả về đầu ra chính xác cho các đầu vào hợp lệ của người dùng hay không. Chúng tôi sẽ giải thích khái niệm này bằng cách sử dụng ví dụ (rút gọn) này về [một hợp đồng đấu giá](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Đây là một hợp đồng đấu giá đơn giản được thiết kế để nhận các giá thầu trong thời gian đấu giá. Nếu `highestBid` tăng lên, người đặt giá cao nhất trước đó sẽ nhận lại tiền của họ; khi thời gian đấu giá kết thúc, `beneficiary` sẽ gọi hợp đồng để nhận tiền.

Các bài kiểm tra đơn vị cho một hợp đồng như thế này sẽ bao gồm các chức năng khác nhau mà người dùng có thể gọi khi tương tác với hợp đồng. Một ví dụ là một bài kiểm tra đơn vị để kiểm tra xem người dùng có thể đặt giá thầu khi phiên đấu giá đang diễn ra hay không (tức là, các lệnh gọi đến `bid()` thành công) hoặc một bài kiểm tra để kiểm tra xem người dùng có thể đặt giá thầu cao hơn `highestBid` hiện tại hay không.

Hiểu quy trình hoạt động của hợp đồng cũng giúp dễ dàng hơn trong việc viết các bài kiểm tra đơn vị để kiểm tra xem việc thực hiện có đáp ứng yêu cầu hay không. Ví dụ: hợp đồng đấu giá quy định rằng người dùng không thể đặt giá thầu khi phiên đấu giá đã kết thúc (tức là, khi `auctionEndTime` thấp hơn `block.timestamp`). Do đó, một nhà phát triển có thể chạy một bài kiểm tra đơn vị để kiểm tra xem các lệnh gọi đến hàm `bid()` có thành công hay thất bại khi phiên đấu giá kết thúc hay không (tức là, khi `auctionEndTime` > `block.timestamp`).

##### 2. Đánh giá tất cả các giả định liên quan đến việc thực hiện hợp đồng.

Việc ghi lại mọi giả định về việc thực hiện hợp đồng và viết các bài kiểm tra đơn vị để xác minh tính hợp lệ của những giả định đó là rất quan trọng. Ngoài việc cung cấp bảo vệ chống lại việc thực hiện bất ngờ, việc kiểm tra các tuyên bố buộc bạn phải suy nghĩ về các hoạt động có thể làm hỏng mô hình an ninh của hợp đồng thông minh. Ngoài việc cung cấp bảo vệ chống lại việc thực hiện bất ngờ, việc kiểm tra các tuyên bố buộc bạn phải suy nghĩ về các hoạt động có thể làm hỏng mô hình an ninh của hợp đồng thông minh.

Nhiều framework kiểm thử đơn vị cho phép bạn tạo ra các khẳng định—những câu đơn giản nói về những gì một hợp đồng có thể và không thể làm—và chạy thử nghiệm để xem những khẳng định đó có đúng khi thực thi hay không. Một lập trình viên làm việc trên hợp đồng đấu giá đã đề cập ở trên có thể đưa ra các khẳng định sau về hành vi của nó trước khi thực hiện các bài kiểm tra tiêu cực:

- Người dùng không thể đặt giá khi buổi đấu giá đã kết thúc hoặc chưa bắt đầu.

- Hợp đồng đấu giá sẽ trở lại trạng thái ban đầu nếu một khoản đấu giá thấp hơn ngưỡng chấp nhận.

- Người dùng không thắng thầu sẽ được hoàn lại số tiền của họ.

**Lưu ý**: Một cách khác để kiểm tra các giả định là viết các bài kiểm tra kích hoạt [các công cụ sửa đổi hàm](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) trong một hợp đồng, đặc biệt là các câu lệnh `require`, `assert`, và `if…else`.

##### 3. Đo lường mã phủ

[Độ bao phủ của mã](https://en.m.wikipedia.org/wiki/Code_coverage) là một chỉ số kiểm tra dùng để theo dõi số lượng nhánh, dòng và câu lệnh trong mã của bạn được thực thi trong các bài kiểm tra. Các bài kiểm tra nên có độ phủ mã tốt để giảm thiểu rủi ro về các lỗ hổng chưa được kiểm tra. Nếu không có đủ độ bao phủ, bạn có thể giả định sai rằng hợp đồng của bạn là an toàn bởi vì tất cả các bài kiểm tra đều đạt yêu cầu, trong khi vẫn còn tồn tại những lỗ hổng trong các đoạn mã chưa được kiểm tra. Việc ghi nhận mức độ bao phủ mã cao, tuy nhiên, đảm bảo rằng tất cả các câu lệnh/hàm trong một hợp đồng thông minh đã được kiểm tra đầy đủ về tính chính xác.

##### 4. Sử dụng các khung thử nghiệm phát triển tốt.

Chất lượng của các công cụ được sử dụng trong việc chạy các bài kiểm tra đơn vị cho hợp đồng thông minh của bạn là rất quan trọng. Một khung thử nghiệm lý tưởng là khung thường xuyên được duy trì; cung cấp các tính năng hữu ích (ví dụ, khả năng ghi nhật ký và báo cáo); và phải được sử dụng rộng rãi và kiểm định bởi các nhà phát triển khác.

Các framework kiểm thử đơn vị cho hợp đồng thông minh Solidity có ở nhiều ngôn ngữ khác nhau (chủ yếu là JavaScript, Python và Rust). Xem một số hướng dẫn dưới đây để biết thông tin về cách bắt đầu chạy các bài kiểm tra đơn với các framework kiểm tra khác nhau:

- **[Chạy các bài kiểm tra đơn vị với Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Chạy các bài kiểm tra đơn vị với Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Chạy các bài kiểm tra đơn vị với Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Chạy các bài kiểm tra đơn vị với Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Chạy các bài kiểm tra đơn vị với Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Chạy các bài kiểm tra đơn vị với Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Chạy các bài kiểm tra đơn vị với Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Kiểm tra tích hợp {#integration-testing-for-smart-contracts}

Trong khi kiểm thử đơn vị gỡ lỗi các hàm hợp đồng một cách độc lập, các bài kiểm tra tích hợp đánh giá các thành phần của một hợp đồng thông minh như một tổng thể. Kiểm thử tích hợp có thể phát hiện các vấn đề phát sinh từ việc gọi giữa các hợp đồng hoặc các tương tác giữa các hàm khác nhau trong cùng một hợp đồng thông minh. Ví dụ: các bài kiểm tra tích hợp có thể giúp kiểm tra xem những thứ như [kế thừa](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) và tiêm phụ thuộc có hoạt động bình thường hay không.

Kiểm thử tích hợp có ích nếu hợp đồng của bạn áp dụng kiến trúc mô-đun hoặc giao tiếp với các hợp đồng trên chuỗi khác trong quá trình thực thi. Một cách để chạy các bài kiểm tra tích hợp là [phân nhánh chuỗi khối](/glossary/#fork) ở một độ cao cụ thể (sử dụng một công cụ như [Forge](https://book.getfoundry.sh/forge/fork-testing) hoặc [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) và mô phỏng các tương tác giữa hợp đồng của bạn và các hợp đồng đã triển khai.

Blockchain phân nhánh sẽ hoạt động tương tự như Mainnet và có các tài khoản với trạng thái và số dư đi kèm. Nhưng nó chỉ hoạt động như một môi trường phát triển cục bộ được cách ly, có nghĩa là bạn sẽ không cần ETH thật cho các giao dịch, chẳng hạn như, và các thay đổi của bạn sẽ không ảnh hưởng đến giao thức Ethereum thực.

### Kiểm tra dựa trên thuộc tính {#property-based-testing-for-smart-contracts}

Kiểm thử dựa trên thuộc tính là quá trình kiểm tra xem một hợp đồng thông minh có thỏa mãn một số thuộc tính đã được định nghĩa hay không. Các thuộc tính đưa ra những điều kiện về cách thức hoạt động của hợp đồng mà người ta mong đợi sẽ giữ nguyên trong các tình huống khác nhau—một ví dụ về thuộc tính của hợp đồng thông minh có thể là "Các phép toán số học trong hợp đồng không bao giờ bị tràn hoặc thiếu."

**Phân tích tĩnh** và **phân tích động** là hai kỹ thuật phổ biến để thực hiện kiểm tra dựa trên thuộc tính, và cả hai đều có thể xác minh rằng mã cho một chương trình (một hợp đồng thông minh trong trường hợp này) thỏa mãn một số thuộc tính được xác định trước. Một số công cụ kiểm tra dựa trên thuộc tính đi kèm với các quy tắc đã được định nghĩa trước về các thuộc tính hợp đồng mong đợi và kiểm tra mã theo các quy tắc đó, trong khi những công cụ khác cho phép bạn tạo các thuộc tính tùy chỉnh cho hợp đồng thông minh.

#### Phân tích tĩnh {#static-analysis}

Một trình phân tích tĩnh nhận mã nguồn của một hợp đồng thông minh và đưa ra kết quả xem liệu hợp đồng có đáp ứng một thuộc tính nào đó hay không. Khác với phân tích động, phân tích tĩnh không cần thực thi hợp đồng để phân tích tính chính xác của nó. Phân tích tĩnh thì sẽ xem xét tất cả các đường đi có thể có mà một hợp đồng thông minh có thể thực hiện trong quá trình chạy (tức là, bằng cách xem xét cấu trúc của mã nguồn để xác định điều gì sẽ xảy ra với hoạt động của hợp đồng trong thời gian thực).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) và [kiểm tra tĩnh](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) là các phương pháp phổ biến để chạy phân tích tĩnh trên các hợp đồng. Cả hai đều yêu cầu phân tích các biểu diễn cấp thấp của việc thực thi hợp đồng, chẳng hạn như [cây cú pháp trừu tượng](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) và [đồ thị luồng điều khiển](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) do trình biên dịch xuất ra.

Trong hầu hết các trường hợp, phân tích tĩnh hữu ích để phát hiện các vấn đề an toàn như việc sử dụng các cấu trúc không an toàn, lỗi cú pháp, hoặc vi phạm tiêu chuẩn lập trình trong mã hợp đồng. Tuy nhiên, các công cụ phân tích tĩnh thường không đáng tin cậy trong việc phát hiện những lỗ hổng sâu hơn, và có thể tạo ra quá nhiều cảnh báo sai.

#### Phân tích động {#dynamic-analysis}

Phân tích động tạo ra các đầu vào tượng trưng (ví dụ, trong [thực thi tượng trưng](https://en.m.wikipedia.org/wiki/Symbolic_execution)) hoặc các đầu vào cụ thể (ví dụ, trong [fuzzing](https://owasp.org/www-community/Fuzzing)) cho các hàm của hợp đồng thông minh để xem liệu có bất kỳ dấu vết thực thi nào vi phạm các thuộc tính cụ thể hay không. Hình thức kiểm thử dựa trên thuộc tính này khác với kiểm thử đơn vị ở chỗ các trường hợp test bao gồm nhiều tình huống và chương trình đảm nhận việc tạo ra các trường hợp kiểm thử.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) là một ví dụ về một kỹ thuật phân tích động để xác minh các thuộc tính tùy ý trong các hợp đồng thông minh. Một bộ thử nghiệm (fuzzer) kích hoạt các hàm trong một hợp đồng mục tiêu với các biến thể ngẫu nhiên hoặc sai định dạng của một giá trị đầu vào đã định nghĩa. Nếu hợp đồng thông minh gặp lỗi (ví dụ, khi một điều kiện bị sai), vấn đề sẽ được đánh dấu và những đầu vào dẫn đến việc thực thi theo con đường dễ bị tổn thương sẽ được đưa vào báo cáo.

Fuzzing rất hữu ích để kiểm tra cơ chế xác thực đầu vào của hợp đồng thông minh, vì việc xử lý không đúng các đầu vào không mong muốn có thể dẫn đến việc thực thi không mong muốn và tạo ra những tác động nguy hiểm. Cách kiểm tra dựa trên thuộc tính này có thể tuyệt vời vì nhiều lý do:

1. **Việc viết các trường hợp kiểm tra để bao quát nhiều kịch bản là một điều khó khăn.** Một bài kiểm tra thuộc tính chỉ yêu cầu bạn xác định một hành vi và một phạm vi dữ liệu để kiểm tra hành vi đó—chương trình sẽ tự động tạo ra các trường hợp kiểm tra dựa trên thuộc tính đã được định nghĩa.

2. **Bộ kiểm tra của bạn có thể không đủ để bao phủ tất cả các đường đi có thể trong chương trình.** Ngay cả khi đạt được 100% độ bao phủ, vẫn có thể bỏ lỡ các trường hợp biên.

3. **Các bài kiểm tra đơn vị chứng minh rằng hợp đồng thực thi đúng với dữ liệu mẫu, nhưng liệu hợp đồng có thực thi đúng với các đầu vào ngoài mẫu hay không vẫn chưa rõ.** Các bài kiểm tra thuộc tính thực thi hợp đồng mục tiêu với nhiều biến thể của một giá trị đầu vào nhất định để tìm các dấu vết thực thi gây ra sự thất bại trong xác nhận. Do đó, một bài kiểm tra thuộc tính cung cấp nhiều đảm bảo hơn rằng hợp đồng thực thi đúng đắn cho một lớp rộng các dữ liệu đầu vào.

### Hướng dẫn chạy kiểm tra dựa trên thuộc tính cho các hợp đồng thông minh {#running-property-based-tests}

Việc chạy kiểm tra dựa trên thuộc tính thường bắt đầu bằng việc xác định một thuộc tính (ví dụ: không có [tràn số nguyên](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) hoặc một tập hợp các thuộc tính mà bạn muốn xác minh trong một hợp đồng thông minh. Có thể bạn cũng cần xác định một khoảng giá trị mà chương trình có thể tạo dữ liệu cho đầu vào giao dịch khi viết các bài kiểm tra thuộc tính.

Khi được cấu hình đúng cách, công cụ kiểm tra tài sản sẽ thực thi các chức năng hợp đồng thông minh của bạn với các đầu vào được tạo ra ngẫu nhiên. Nếu có bất kỳ khẳng định  vi phạm nào, bạn nên nhận được một báo cáo với dữ liệu đầu vào cụ thể vi phạm thuộc tính đang được đánh giá. Xem một số hướng dẫn dưới đây để bắt đầu với việc chạy thử nghiệm dựa trên thuộc tính với các công cụ khác nhau:

- **[Phân tích tĩnh các hợp đồng thông minh với Slither](https://github.com/crytic/slither)**
- **[Phân tích tĩnh các hợp đồng thông minh với Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Kiểm tra dựa trên thuộc tính với Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing hợp đồng với Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing hợp đồng với Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing hợp đồng với Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Thực thi tượng trưng các hợp đồng thông minh với Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Thực thi tượng trưng các hợp đồng thông minh với Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Kiểm tra thủ công cho các hợp đồng thông minh {#manual-testing-for-smart-contracts}

Kiểm tra thủ công các hợp đồng thông minh thường diễn ra sau trong chu trình phát triển, sau khi đã chạy các bài kiểm tra tự động. Hình thức kiểm tra này đánh giá hợp đồng thông minh như một sản phẩm đã được tích hợp hoàn chỉnh để xem nó có hoạt động như đã được chỉ định trong các yêu cầu kỹ thuật hay không.

### Kiểm tra hợp đồng trên chuỗi khối cục bộ {#testing-on-local-blockchain}

Mặc dù việc kiểm thử tự động ở môi trường cục bộ có thể cung cấp thông tin hữu ích để gỡ lỗi, nhưng bạn sẽ muốn biết cách hợp đồng thông minh của bạn hoạt động trong môi trường sản xuất. Nhưng mà, triển khai lên chuỗi chính của Ethereum sẽ tốn phí gas - chưa kể rằng bạn hoặc người dùng của bạn có thể mất tiền thật nếu hợp đồng thông minh của bạn vẫn còn lỗi.

Kiểm tra hợp đồng của bạn trên một chuỗi khối cục bộ (còn được gọi là [mạng phát triển](/developers/docs/development-networks/)) là một giải pháp thay thế được đề xuất cho việc kiểm tra trên Mạng chính. Một blockchain cục bộ là bản sao của blockchain Ethereum chạy trực tiếp trên máy tính của bạn, mô phỏng hành vi của lớp thực thi của Ethereum. Vì vậy, bạn có thể lập trình các giao dịch để tương tác với một hợp đồng mà không bị chịu chi phí lớn.

Chạy hợp đồng trên một blockchain cục bộ có thể hữu ích như một hình thức kiểm thử tích hợp thủ công. [Các hợp đồng thông minh có tính kết hợp cao](/developers/docs/smart-contracts/composability/), cho phép bạn tích hợp với các giao thức hiện có—nhưng bạn vẫn cần đảm bảo rằng các tương tác trên chuỗi phức tạp như vậy tạo ra kết quả chính xác.

[Thông tin thêm về các mạng phát triển.](/developers/docs/development-networks/)

### Kiểm tra hợp đồng trên các mạng thử nghiệm {#testing-contracts-on-testnets}

Mạng thử nghiệm hoặc testnet hoạt động giống như Ethereum Mainnet, ngoại trừ việc nó sử dụng ether (ETH) không có giá trị thực tế. Triển khai hợp đồng của bạn trên [mạng thử nghiệm](/developers/docs/networks/#ethereum-testnets) có nghĩa là bất kỳ ai cũng có thể tương tác với nó (ví dụ: thông qua giao diện người dùng của ứng dụng phi tập trung) mà không gặp rủi ro về tiền bạc.

Cách kiểm tra thủ công này rất hữu ích để đánh giá quy trình hoạt động của ứng dụng từ góc nhìn của người dùng. Tại đây, những người thử nghiệm beta cũng có thể thực hiện các thử nghiệm và báo cáo bất kỳ vấn đề nào liên quan đến logic kinh doanh của hợp đồng và chức năng tổng thể.

Triển khai trên testnet sau khi thử nghiệm trên một blockchain nội bộ thật sự là lựa chọn tuyệt vời vì cái đó giống với cách hoạt động của Ethereum Virtual Machine hơn. Do đó, việc nhiều dự án gốc Ethereum triển khai các dapp trên mạng thử nghiệm để đánh giá hoạt động của hợp đồng thông minh trong điều kiện thực tế là điều phổ biến.

[Thông tin thêm về các mạng thử nghiệm Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Kiểm tra và xác minh chính thức {#testing-vs-formal-verification}

Trong khi việc kiểm tra giúp xác nhận rằng một hợp đồng trả về kết quả mong đợi cho một số đầu vào dữ liệu, nó không thể chứng minh một cách kết luận rằng điều tương tự cũng đúng cho các đầu vào không được sử dụng trong quá trình kiểm tra. Do đó, việc kiểm tra một hợp đồng thông minh không thể đảm bảo "tính đúng đắn về chức năng" (tức là, nó không thể cho thấy một chương trình hoạt động như yêu cầu đối với _tất cả_ các bộ giá trị đầu vào).

Xác minh hình thức là một phương pháp đánh giá tính đúng đắn của phần mềm bằng cách kiểm tra xem mô hình chính thức của chương trình có khớp với đặc tả chính thức hay không. Một mô hình hình thức là một biểu diễn toán học trừu tượng của một chương trình, trong khi một đặc tả hình thức định nghĩa các thuộc tính của chương trình (tức là, các khẳng định logic về việc thực thi của chương trình).

Bởi vì các thuộc tính được viết bằng các thuật ngữ toán học, điều này giúp có thể xác minh rằng một mô hình hình thức (toán học) của hệ thống thỏa mãn một đặc tả bằng cách sử dụng các quy tắc suy diễn logic. Vậy nên, các công cụ xác minh chính thức được cho là tạo ra ‘bằng chứng toán học’ về tính đúng đắn của hệ thống.

Không giống như kiểm tra, xác minh chính thức có thể được sử dụng để xác minh việc thực thi một hợp đồng thông minh thỏa mãn một đặc tả chính thức cho _tất cả_ các lần thực thi (tức là, nó không có lỗi) mà không cần thực thi nó với dữ liệu mẫu. Không chỉ giúp tiết kiệm thời gian cho việc chạy hàng tá bài kiểm tra đơn vị, mà nó còn hiệu quả hơn trong việc phát hiện các lỗ hổng ẩn. Nói như vậy, các kỹ thuật xác minh chính thức nằm trên một phổ tùy thuộc vào độ khó thực hiện và tính hữu ích của chúng.

[Thông tin thêm về xác minh chính thức cho các hợp đồng thông minh.](/developers/docs/smart-contracts/formal-verification)

## Kiểm tra và kiểm toán và tiền thưởng săn lỗi {#testing-vs-audits-bug-bounties}

Như đã đề cập, việc kiểm tra kỹ lưỡng hiếm khi đảm bảo hoàn toàn không có lỗi trong một hợp đồng; các phương pháp xác minh hình thức có thể cung cấp sự đảm bảo mạnh mẽ hơn về độ chính xác nhưng hiện tại thì khó sử dụng và tốn kém.

Dù sao, bạn có thể tăng khả năng phát hiện lỗ hổng hợp đồng bằng cách nhờ xem xét mã độc lập. [Kiểm toán hợp đồng thông minh](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) và [tiền thưởng săn lỗi](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) là hai cách để người khác phân tích hợp đồng của bạn.

Các buổi kiểm toán được thực hiện bởi những kiểm toán viên có kinh nghiệm trong việc tìm ra các lỗ hổng bảo mật và các thực hành phát triển kém trong hợp đồng thông minh. Một cuộc kiểm toán thường sẽ bao gồm việc kiểm tra (và có thể là xác minh chính thức) cũng như một đánh giá thủ công về toàn bộ mã nguồn.

Ngược lại, một chương trình tiền thưởng săn lỗi thường bao gồm việc cung cấp một phần thưởng tài chính cho một cá nhân (thường được mô tả là [tin tặc mũ trắng](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))) phát hiện ra một lỗ hổng trong một hợp đồng thông minh và tiết lộ nó cho các nhà phát triển. Giải thưởng lỗi tương tự như các cuộc kiểm toán vì nó liên quan đến việc yêu cầu người khác giúp tìm ra các lỗi trong hợp đồng thông minh.

Sự khác biệt chính là các chương trình bug bounty mở cửa cho cộng đồng lập trình viên/ hacker rộng rãi và thu hút một lớp các hacker mũ trắng và các chuyên gia an ninh độc lập với những kỹ năng và kinh nghiệm độc đáo. Điều này có thể là một lợi thế so với việc kiểm toán hợp đồng thông minh chủ yếu dựa vào các đội ngũ có thể chỉ sở hữu kiến thức hạn hẹp hoặc chuyên môn hạn chế.

## Các công cụ và thư viện kiểm tra {#testing-tools-and-libraries}

### Các công cụ kiểm tra đơn vị {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Công cụ đo độ bao phủ mã cho các hợp đồng thông minh được viết bằng Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework để phát triển và kiểm tra hợp đồng thông minh nâng cao (dựa trên ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Công cụ để kiểm tra các hợp đồng thông minh Solidity. Làm việc dưới Remix IDE với plugin "Kiểm thử Solidity" được sử dụng để viết và chạy các trường hợp test cho một hợp đồng._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Thư viện xác nhận để kiểm tra hợp đồng thông minh Ethereum. Hãy đảm bảo rằng các hợp đồng của bạn hoạt động như mong đợi!_

- **[Framework kiểm tra đơn vị Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie sử dụng Pytest, một framework kiểm tra giàu tính năng cho phép bạn viết các bài kiểm tra nhỏ với mã tối thiểu, có khả năng mở rộng tốt cho các dự án lớn và có khả năng mở rộng cao._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry cung cấp Forge, một framework kiểm tra Ethereum nhanh và linh hoạt có khả năng thực hiện các bài kiểm tra đơn vị đơn giản, kiểm tra tối ưu hóa gas và fuzzing hợp đồng._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework để kiểm tra các hợp đồng thông minh dựa trên ethers.js, Mocha và Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Framework phát triển và kiểm tra dựa trên Python cho các hợp đồng thông minh nhắm vào Máy ảo Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Framework dựa trên Python để kiểm tra đơn vị và fuzzing với khả năng gỡ lỗi mạnh mẽ và hỗ trợ kiểm tra chuỗi chéo, sử dụng pytest và Anvil để có trải nghiệm người dùng và hiệu suất tốt nhất._

### Các công cụ kiểm tra dựa trên thuộc tính {#property-based-testing-tools}

#### Các công cụ phân tích tĩnh {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Framework phân tích tĩnh Solidity dựa trên Python để tìm các lỗ hổng, nâng cao khả năng hiểu mã và viết các phân tích tùy chỉnh cho các hợp đồng thông minh._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Công cụ linter để thực thi các phương pháp hay nhất về văn phong và bảo mật cho ngôn ngữ lập trình hợp đồng thông minh Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Trình phân tích tĩnh dựa trên Rust được thiết kế đặc biệt cho bảo mật và phát triển hợp đồng thông minh Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Framework phân tích tĩnh dựa trên Python với các công cụ phát hiện lỗ hổng và chất lượng mã, các máy in để trích xuất thông tin hữu ích từ mã và hỗ trợ viết các mô-đun con tùy chỉnh._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Một linter đơn giản và mạnh mẽ cho Solidity._

#### Các công cụ phân tích động {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Công cụ fuzzer hợp đồng nhanh để phát hiện các lỗ hổng trong các hợp đồng thông minh thông qua kiểm tra dựa trên thuộc tính._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Công cụ fuzzing tự động hữu ích để phát hiện các vi phạm thuộc tính trong mã hợp đồng thông minh._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework thực thi tượng trưng động để phân tích mã byte EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Công cụ đánh giá mã byte EVM để phát hiện các lỗ hổng hợp đồng bằng cách sử dụng phân tích vết, phân tích kết hợp và kiểm tra luồng điều khiển._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble là một ngôn ngữ đặc tả và công cụ xác minh thời gian chạy cho phép bạn chú thích các hợp đồng thông minh với các thuộc tính cho phép bạn tự động kiểm tra các hợp đồng bằng các công cụ như Diligence Fuzzing hoặc MythX._

## Các hướng dẫn liên quan {#related-tutorials}

- [Tổng quan và so sánh các sản phẩm kiểm tra khác nhau](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Cách sử dụng Echidna để kiểm tra các hợp đồng thông minh](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Cách sử dụng Manticore để tìm lỗi hợp đồng thông minh](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Cách sử dụng Slither để tìm lỗi hợp đồng thông minh](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cách mô phỏng các hợp đồng Solidity để kiểm tra](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Cách chạy các bài kiểm tra đơn vị trong Solidity bằng Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Đọc thêm {#further-reading}

- [Hướng dẫn chuyên sâu về kiểm tra các hợp đồng thông minh Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Cách kiểm tra các hợp đồng thông minh Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Hướng dẫn kiểm tra đơn vị của MolochDAO cho các nhà phát triển](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Cách kiểm tra các hợp đồng thông minh như một ngôi sao nhạc rock](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
