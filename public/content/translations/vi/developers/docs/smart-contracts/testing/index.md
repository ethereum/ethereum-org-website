---
title: "Thử nghiệm hợp đồng thông minh"
description: "Tổng quan về các kỹ thuật và lưu ý khi thử nghiệm hợp đồng thông minh Ethereum."
lang: vi
---

Các Chuỗi khối công khai như Ethereum là bất biến, khiến việc thay đổi mã của hợp đồng thông minh sau khi triển khai trở nên khó khăn. [Các mẫu nâng cấp hợp đồng](/developers/docs/smart-contracts/upgrading/) để thực hiện "nâng cấp ảo" có tồn tại, nhưng chúng khó thực hiện và yêu cầu sự đồng thuận của cộng đồng. Hơn nữa, một bản nâng cấp chỉ có thể sửa lỗi _sau khi_ nó được phát hiện—nếu kẻ tấn công phát hiện ra lỗ hổng trước, hợp đồng thông minh của bạn sẽ có nguy cơ bị khai thác.

Vì những lý do này, việc thử nghiệm hợp đồng thông minh trước khi [triển khai](/developers/docs/smart-contracts/deploying/) lên Mạng chính là yêu cầu tối thiểu để đảm bảo [bảo mật](/developers/docs/smart-contracts/security/). Có nhiều kỹ thuật để thử nghiệm hợp đồng và đánh giá tính chính xác của mã; việc bạn chọn kỹ thuật nào phụ thuộc vào nhu cầu của bạn. Tuy nhiên, một bộ thử nghiệm bao gồm các công cụ và phương pháp tiếp cận khác nhau là lý tưởng để phát hiện cả những lỗ hổng bảo mật nhỏ và lớn trong mã hợp đồng.

## Điều kiện tiên quyết {#prerequisites}

Trang này giải thích cách thử nghiệm hợp đồng thông minh trước khi triển khai trên mạng lưới Ethereum. Nó giả định rằng bạn đã quen thuộc với [hợp đồng thông minh](/developers/docs/smart-contracts/).

## Thử nghiệm hợp đồng thông minh là gì? {#what-is-smart-contract-testing}

Thử nghiệm hợp đồng thông minh là quá trình xác minh rằng mã của một hợp đồng thông minh hoạt động như mong đợi. Việc thử nghiệm rất hữu ích để kiểm tra xem một hợp đồng thông minh cụ thể có đáp ứng các yêu cầu về độ tin cậy, khả năng sử dụng và bảo mật hay không.

Mặc dù các phương pháp tiếp cận có thể khác nhau, hầu hết các phương pháp thử nghiệm đều yêu cầu thực thi một hợp đồng thông minh với một mẫu dữ liệu nhỏ mà nó dự kiến sẽ xử lý. Nếu hợp đồng tạo ra kết quả chính xác cho dữ liệu mẫu, nó được cho là đang hoạt động bình thường. Hầu hết các công cụ thử nghiệm đều cung cấp tài nguyên để viết và thực thi [các trường hợp thử nghiệm](https://en.m.wikipedia.org/wiki/Test_case) nhằm kiểm tra xem việc thực thi hợp đồng có khớp với kết quả mong đợi hay không.

### Tại sao việc thử nghiệm hợp đồng thông minh lại quan trọng? {#importance-of-testing-smart-contracts}

Vì hợp đồng thông minh thường quản lý các tài sản tài chính có giá trị cao, những lỗi lập trình nhỏ có thể và thường dẫn đến [tổn thất lớn cho người dùng](https://rekt.news/leaderboard/). Tuy nhiên, việc thử nghiệm nghiêm ngặt có thể giúp bạn phát hiện sớm các khiếm khuyết và sự cố trong mã của hợp đồng thông minh và khắc phục chúng trước khi khởi chạy trên Mạng chính.

Mặc dù có thể nâng cấp hợp đồng nếu phát hiện ra lỗi, nhưng việc nâng cấp rất phức tạp và có thể [dẫn đến lỗi](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) nếu xử lý không đúng cách. Việc nâng cấp hợp đồng còn phủ nhận nguyên tắc về tính bất biến và tạo thêm gánh nặng cho người dùng với các giả định tin cậy bổ sung. Ngược lại, một kế hoạch toàn diện để thử nghiệm hợp đồng của bạn sẽ giảm thiểu rủi ro bảo mật của hợp đồng thông minh và giảm nhu cầu thực hiện các nâng cấp logic phức tạp sau khi triển khai.

## Các phương pháp thử nghiệm hợp đồng thông minh {#methods-for-testing-smart-contracts}

Các phương pháp thử nghiệm hợp đồng thông minh Ethereum thuộc hai danh mục lớn: **thử nghiệm tự động** và **thử nghiệm thủ công**. Thử nghiệm tự động và thử nghiệm thủ công mang lại những lợi ích và sự đánh đổi riêng, nhưng bạn có thể kết hợp cả hai để tạo ra một kế hoạch mạnh mẽ nhằm phân tích các hợp đồng của mình.

### Thử nghiệm tự động {#automated-testing}

Thử nghiệm tự động sử dụng các công cụ tự động kiểm tra mã của hợp đồng thông minh để tìm lỗi trong quá trình thực thi. Lợi ích của thử nghiệm tự động đến từ việc sử dụng [các tập lệnh](https://www.techtarget.com/whatis/definition/script?amp=1) để hướng dẫn đánh giá các chức năng của hợp đồng. Các thử nghiệm theo tập lệnh có thể được lên lịch để chạy lặp đi lặp lại với sự can thiệp tối thiểu của con người, làm cho thử nghiệm tự động hiệu quả hơn so với các phương pháp thử nghiệm thủ công.

Thử nghiệm tự động đặc biệt hữu ích khi các thử nghiệm lặp đi lặp lại và tốn thời gian; khó thực hiện thủ công; dễ mắc lỗi do con người; hoặc liên quan đến việc đánh giá các chức năng quan trọng của hợp đồng. Nhưng các công cụ thử nghiệm tự động có thể có những hạn chế—chúng có thể bỏ sót một số lỗi nhất định và tạo ra nhiều [kết quả dương tính giả](https://www.contrastsecurity.com/glossary/false-positive). Do đó, việc kết hợp thử nghiệm tự động với thử nghiệm thủ công cho các hợp đồng thông minh là lý tưởng.

### Thử nghiệm thủ công {#manual-testing}

Thử nghiệm thủ công có sự hỗ trợ của con người và liên quan đến việc thực thi lần lượt từng trường hợp thử nghiệm trong bộ thử nghiệm của bạn khi phân tích tính chính xác của hợp đồng thông minh. Điều này không giống như thử nghiệm tự động, nơi bạn có thể đồng thời chạy nhiều thử nghiệm riêng biệt trên một hợp đồng và nhận được báo cáo hiển thị tất cả các thử nghiệm thất bại và thành công.

Thử nghiệm thủ công có thể được thực hiện bởi một cá nhân duy nhất theo một kế hoạch thử nghiệm bằng văn bản bao gồm các kịch bản thử nghiệm khác nhau. Bạn cũng có thể có nhiều cá nhân hoặc nhóm tương tác với một hợp đồng thông minh trong một khoảng thời gian xác định như một phần của thử nghiệm thủ công. Những người thử nghiệm sẽ so sánh hành vi thực tế của hợp đồng với hành vi mong đợi, đánh dấu bất kỳ sự khác biệt nào là lỗi.

Thử nghiệm thủ công hiệu quả đòi hỏi nguồn lực đáng kể (kỹ năng, thời gian, tiền bạc và công sức), và có thể—do lỗi của con người—bỏ sót một số lỗi nhất định trong khi thực thi các thử nghiệm. Nhưng thử nghiệm thủ công cũng có thể mang lại lợi ích—ví dụ: một người thử nghiệm (ví dụ: kiểm toán viên) có thể sử dụng trực giác để phát hiện các trường hợp ngoại lệ mà một công cụ thử nghiệm tự động sẽ bỏ sót.

## Thử nghiệm tự động cho hợp đồng thông minh {#automated-testing-for-smart-contracts}

### Thử nghiệm đơn vị {#unit-testing-for-smart-contracts}

Thử nghiệm đơn vị đánh giá các chức năng của hợp đồng một cách riêng biệt và kiểm tra xem mỗi thành phần có hoạt động chính xác hay không. Các thử nghiệm đơn vị tốt nên đơn giản, chạy nhanh và cung cấp ý tưởng rõ ràng về những gì đã sai nếu thử nghiệm thất bại.

Thử nghiệm đơn vị rất hữu ích để kiểm tra xem các hàm có trả về giá trị mong đợi hay không và bộ nhớ của hợp đồng có được cập nhật đúng cách sau khi thực thi hàm hay không. Hơn nữa, việc chạy các thử nghiệm đơn vị sau khi thực hiện các thay đổi đối với cơ sở mã của hợp đồng đảm bảo rằng việc thêm logic mới không gây ra lỗi. Dưới đây là một số hướng dẫn để chạy các thử nghiệm đơn vị hiệu quả:

#### Hướng dẫn thử nghiệm đơn vị hợp đồng thông minh {#unit-testing-guidelines}

##### 1. Hiểu logic nghiệp vụ và quy trình làm việc của hợp đồng

Trước khi viết các thử nghiệm đơn vị, việc biết hợp đồng thông minh cung cấp những chức năng gì và cách người dùng sẽ truy cập và sử dụng các chức năng đó là rất hữu ích. Điều này đặc biệt hữu ích để chạy [các thử nghiệm đường dẫn lý tưởng (happy path)](https://en.m.wikipedia.org/wiki/Happy_path) nhằm xác định xem các hàm trong hợp đồng có trả về đầu ra chính xác cho các đầu vào hợp lệ của người dùng hay không. Chúng tôi sẽ giải thích khái niệm này bằng cách sử dụng ví dụ (rút gọn) này về [một hợp đồng đấu giá](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

Đây là một hợp đồng đấu giá đơn giản được thiết kế để nhận giá thầu trong thời gian đấu giá. Nếu `highestBid` tăng lên, người trả giá cao nhất trước đó sẽ nhận lại tiền của họ; khi thời gian đấu giá kết thúc, `beneficiary` sẽ gọi hợp đồng để lấy tiền của họ.

Các thử nghiệm đơn vị cho một hợp đồng như thế này sẽ bao gồm các chức năng khác nhau mà người dùng có thể gọi khi tương tác với hợp đồng. Một ví dụ sẽ là một thử nghiệm đơn vị kiểm tra xem người dùng có thể đặt giá thầu trong khi cuộc đấu giá đang diễn ra hay không (tức là các lệnh gọi đến `bid()` thành công) hoặc một thử nghiệm kiểm tra xem người dùng có thể đặt giá thầu cao hơn `highestBid` hiện tại hay không.

Việc hiểu quy trình hoạt động của hợp đồng cũng giúp viết các thử nghiệm đơn vị kiểm tra xem việc thực thi có đáp ứng các yêu cầu hay không. Ví dụ: hợp đồng đấu giá chỉ định rằng người dùng không thể đặt giá thầu khi cuộc đấu giá đã kết thúc (tức là khi `auctionEndTime` thấp hơn `block.timestamp`). Do đó, một nhà phát triển có thể chạy một thử nghiệm đơn vị kiểm tra xem các lệnh gọi đến hàm `bid()` thành công hay thất bại khi cuộc đấu giá kết thúc (tức là khi `auctionEndTime` > `block.timestamp`).

##### 2. Đánh giá tất cả các giả định liên quan đến việc thực thi hợp đồng

Điều quan trọng là phải ghi lại bất kỳ giả định nào về việc thực thi của hợp đồng và viết các thử nghiệm đơn vị để xác minh tính hợp lệ của những giả định đó. Ngoài việc cung cấp sự bảo vệ chống lại việc thực thi không mong muốn, việc thử nghiệm các khẳng định buộc bạn phải suy nghĩ về các hoạt động có thể phá vỡ mô hình bảo mật của hợp đồng thông minh. Một mẹo hữu ích là vượt ra ngoài "các thử nghiệm người dùng lý tưởng" và viết các thử nghiệm tiêu cực để kiểm tra xem một hàm có thất bại đối với các đầu vào sai hay không.

Nhiều khuôn khổ thử nghiệm đơn vị cho phép bạn tạo các khẳng định—những câu lệnh đơn giản nêu rõ những gì một hợp đồng có thể và không thể làm—và chạy các thử nghiệm để xem liệu những khẳng định đó có được giữ nguyên trong quá trình thực thi hay không. Một nhà phát triển làm việc trên hợp đồng đấu giá được mô tả trước đó có thể đưa ra các khẳng định sau về hành vi của nó trước khi chạy các thử nghiệm tiêu cực:

- Người dùng không thể đặt giá thầu khi cuộc đấu giá đã kết thúc hoặc chưa bắt đầu.

- Hợp đồng đấu giá sẽ hoàn nguyên nếu giá thầu thấp hơn ngưỡng có thể chấp nhận được.

- Những người dùng không trúng thầu sẽ được hoàn lại tiền của họ

**Lưu ý**: Một cách khác để thử nghiệm các giả định là viết các thử nghiệm kích hoạt [các công cụ sửa đổi hàm](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) trong một hợp đồng, đặc biệt là các câu lệnh `require`, `assert` và `if…else`.

##### 3. Đo lường mức độ bao phủ mã

[Mức độ bao phủ mã](https://en.m.wikipedia.org/wiki/Code_coverage) là một số liệu thử nghiệm theo dõi số lượng nhánh, dòng và câu lệnh trong mã của bạn được thực thi trong quá trình thử nghiệm. Các thử nghiệm nên có mức độ bao phủ mã tốt để giảm thiểu rủi ro của các lỗ hổng chưa được thử nghiệm. Nếu không có đủ mức độ bao phủ, bạn có thể lầm tưởng rằng hợp đồng của mình an toàn vì tất cả các thử nghiệm đều vượt qua, trong khi các lỗ hổng vẫn tồn tại trong các đường dẫn mã chưa được thử nghiệm. Tuy nhiên, việc ghi nhận mức độ bao phủ mã cao mang lại sự đảm bảo rằng tất cả các câu lệnh/hàm trong một hợp đồng thông minh đã được thử nghiệm đầy đủ về tính chính xác.

##### 4. Sử dụng các khuôn khổ thử nghiệm được phát triển tốt

Chất lượng của các công cụ được sử dụng trong việc chạy các thử nghiệm đơn vị cho hợp đồng thông minh của bạn là rất quan trọng. Một khuôn khổ thử nghiệm lý tưởng là khuôn khổ được bảo trì thường xuyên; cung cấp các tính năng hữu ích (ví dụ: khả năng ghi nhật ký và báo cáo); và phải được sử dụng rộng rãi cũng như được kiểm duyệt bởi các nhà phát triển khác.

Các khuôn khổ thử nghiệm đơn vị cho hợp đồng thông minh Solidity có sẵn bằng nhiều ngôn ngữ khác nhau (chủ yếu là JavaScript, Python và Rust). Xem một số hướng dẫn bên dưới để biết thông tin về cách bắt đầu chạy các thử nghiệm đơn vị với các khuôn khổ thử nghiệm khác nhau:

- **[Chạy thử nghiệm đơn vị với Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Chạy thử nghiệm đơn vị với Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Chạy thử nghiệm đơn vị với Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Chạy thử nghiệm đơn vị với Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Chạy thử nghiệm đơn vị với Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Chạy thử nghiệm đơn vị với Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Chạy thử nghiệm đơn vị với Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Thử nghiệm tích hợp {#integration-testing-for-smart-contracts}

Trong khi thử nghiệm đơn vị gỡ lỗi các chức năng của hợp đồng một cách riêng biệt, các thử nghiệm tích hợp đánh giá các thành phần của một hợp đồng thông minh một cách tổng thể. Thử nghiệm tích hợp có thể phát hiện các vấn đề phát sinh từ các lệnh gọi giữa các hợp đồng hoặc các tương tác giữa các chức năng khác nhau trong cùng một hợp đồng thông minh. Ví dụ: các thử nghiệm tích hợp có thể giúp kiểm tra xem những thứ như [tính kế thừa](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) và tiêm phụ thuộc (dependency injection) có hoạt động bình thường hay không.

Thử nghiệm tích hợp rất hữu ích nếu hợp đồng của bạn áp dụng kiến trúc mô-đun hoặc giao tiếp với các hợp đồng trên chuỗi khác trong quá trình thực thi. Một cách để chạy các thử nghiệm tích hợp là [Phân nhánh Chuỗi khối](/glossary/#fork) ở một độ cao cụ thể (sử dụng một công cụ như [Forge](https://book.getfoundry.sh/forge/fork-testing) hoặc [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) và mô phỏng các tương tác giữa hợp đồng của bạn và các hợp đồng đã được triển khai.

Chuỗi khối được phân nhánh sẽ hoạt động tương tự như Mạng chính và có các tài khoản với các trạng thái và số dư liên quan. Nhưng nó chỉ hoạt động như một môi trường phát triển cục bộ hộp cát (sandbox), nghĩa là bạn sẽ không cần ETH thật cho các giao dịch, ví dụ như vậy, và các thay đổi của bạn cũng sẽ không ảnh hưởng đến Giao thức Ethereum thực.

### Thử nghiệm dựa trên thuộc tính {#property-based-testing-for-smart-contracts}

Thử nghiệm dựa trên thuộc tính là quá trình kiểm tra xem một hợp đồng thông minh có thỏa mãn một số thuộc tính đã xác định hay không. Các thuộc tính khẳng định các sự kiện về hành vi của hợp đồng được kỳ vọng sẽ luôn đúng trong các kịch bản khác nhau—một ví dụ về thuộc tính của hợp đồng thông minh có thể là "Các phép toán số học trong hợp đồng không bao giờ bị tràn số (overflow) hoặc tràn số dưới (underflow)."

**Phân tích tĩnh** và **phân tích động** là hai kỹ thuật phổ biến để thực hiện thử nghiệm dựa trên thuộc tính, và cả hai đều có thể xác minh rằng mã của một chương trình (trong trường hợp này là hợp đồng thông minh) thỏa mãn một số thuộc tính được xác định trước. Một số công cụ thử nghiệm dựa trên thuộc tính đi kèm với các quy tắc được xác định trước về các thuộc tính hợp đồng mong đợi và kiểm tra mã dựa trên các quy tắc đó, trong khi những công cụ khác cho phép bạn tạo các thuộc tính tùy chỉnh cho một hợp đồng thông minh.

#### Phân tích tĩnh {#static-analysis}

Một bộ phân tích tĩnh lấy mã nguồn của một hợp đồng thông minh làm đầu vào và đưa ra kết quả tuyên bố xem một hợp đồng có thỏa mãn một thuộc tính hay không. Không giống như phân tích động, phân tích tĩnh không liên quan đến việc thực thi một hợp đồng để phân tích tính chính xác của nó. Thay vào đó, phân tích tĩnh suy luận về tất cả các đường dẫn có thể có mà một hợp đồng thông minh có thể thực hiện trong quá trình thực thi (tức là bằng cách kiểm tra cấu trúc của mã nguồn để xác định ý nghĩa của nó đối với hoạt động của hợp đồng trong thời gian chạy).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) và [thử nghiệm tĩnh](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) là các phương pháp phổ biến để chạy phân tích tĩnh trên các hợp đồng. Cả hai đều yêu cầu phân tích các biểu diễn cấp thấp của việc thực thi hợp đồng như [cây cú pháp trừu tượng](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) và [đồ thị luồng điều khiển](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) do trình biên dịch xuất ra.

Trong hầu hết các trường hợp, phân tích tĩnh rất hữu ích để phát hiện các vấn đề an toàn như sử dụng các cấu trúc không an toàn, lỗi cú pháp hoặc vi phạm các tiêu chuẩn mã hóa trong mã của hợp đồng. Tuy nhiên, các bộ phân tích tĩnh được biết là thường không đáng tin cậy trong việc phát hiện các lỗ hổng sâu hơn và có thể tạo ra quá nhiều kết quả dương tính giả.

#### Phân tích động {#dynamic-analysis}

Phân tích động tạo ra các đầu vào tượng trưng (ví dụ: trong [thực thi tượng trưng](https://en.m.wikipedia.org/wiki/Symbolic_execution)) hoặc các đầu vào cụ thể (ví dụ: trong [fuzzing](https://owasp.org/www-community/Fuzzing)) cho các hàm của hợp đồng thông minh để xem liệu có bất kỳ dấu vết thực thi nào vi phạm các thuộc tính cụ thể hay không. Hình thức thử nghiệm dựa trên thuộc tính này khác với các thử nghiệm đơn vị ở chỗ các trường hợp thử nghiệm bao gồm nhiều kịch bản và một chương trình xử lý việc tạo ra các trường hợp thử nghiệm.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) là một ví dụ về kỹ thuật phân tích động để xác minh các thuộc tính tùy ý trong hợp đồng thông minh. Một fuzzer gọi các hàm trong một hợp đồng mục tiêu với các biến thể ngẫu nhiên hoặc bị lỗi của một giá trị đầu vào đã xác định. Nếu hợp đồng thông minh chuyển sang trạng thái lỗi (ví dụ: trạng thái mà một khẳng định thất bại), vấn đề sẽ được đánh dấu và các đầu vào thúc đẩy việc thực thi hướng tới đường dẫn dễ bị tổn thương sẽ được tạo ra trong một báo cáo.

Fuzzing rất hữu ích để đánh giá cơ chế xác thực đầu vào của hợp đồng thông minh vì việc xử lý không đúng cách các đầu vào không mong muốn có thể dẫn đến việc thực thi ngoài ý muốn và tạo ra các tác động nguy hiểm. Hình thức thử nghiệm dựa trên thuộc tính này có thể lý tưởng vì nhiều lý do:

1. **Viết các trường hợp thử nghiệm để bao quát nhiều kịch bản là rất khó.** Một thử nghiệm thuộc tính chỉ yêu cầu bạn xác định một hành vi và một phạm vi dữ liệu để thử nghiệm hành vi đó—chương trình sẽ tự động tạo các trường hợp thử nghiệm dựa trên thuộc tính đã xác định.

2. **Bộ thử nghiệm của bạn có thể không bao quát đủ tất cả các đường dẫn có thể có trong chương trình.** Ngay cả với mức độ bao phủ 100%, vẫn có thể bỏ sót các trường hợp ngoại lệ.

3. **Các thử nghiệm đơn vị chứng minh một hợp đồng thực thi chính xác cho dữ liệu mẫu, nhưng liệu hợp đồng có thực thi chính xác cho các đầu vào nằm ngoài mẫu hay không vẫn chưa được biết.** Các thử nghiệm thuộc tính thực thi một hợp đồng mục tiêu với nhiều biến thể của một giá trị đầu vào nhất định để tìm các dấu vết thực thi gây ra lỗi khẳng định. Do đó, một thử nghiệm thuộc tính cung cấp nhiều đảm bảo hơn rằng một hợp đồng thực thi chính xác cho một lớp dữ liệu đầu vào rộng lớn.

### Hướng dẫn chạy thử nghiệm dựa trên thuộc tính cho hợp đồng thông minh {#running-property-based-tests}

Việc chạy thử nghiệm dựa trên thuộc tính thường bắt đầu bằng việc xác định một thuộc tính (ví dụ: không có [tràn số nguyên](https://github.com/ConsenSysDiligence/mythril/wiki/Integer-Overflow)) hoặc tập hợp các thuộc tính mà bạn muốn xác minh trong một hợp đồng thông minh. Bạn cũng có thể cần xác định một phạm vi giá trị mà trong đó chương trình có thể tạo dữ liệu cho các đầu vào giao dịch khi viết các thử nghiệm thuộc tính.

Sau khi được cấu hình đúng cách, công cụ thử nghiệm thuộc tính sẽ thực thi các hàm của hợp đồng thông minh của bạn với các đầu vào được tạo ngẫu nhiên. Nếu có bất kỳ vi phạm khẳng định nào, bạn sẽ nhận được một báo cáo với dữ liệu đầu vào cụ thể vi phạm thuộc tính đang được đánh giá. Xem một số hướng dẫn bên dưới để bắt đầu chạy thử nghiệm dựa trên thuộc tính với các công cụ khác nhau:

- **[Phân tích tĩnh hợp đồng thông minh với Slither](https://github.com/crytic/slither)**
- **[Phân tích tĩnh hợp đồng thông minh với Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Thử nghiệm dựa trên thuộc tính với Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing hợp đồng với Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing hợp đồng với Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing hợp đồng với Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Thực thi tượng trưng hợp đồng thông minh với Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Thực thi tượng trưng hợp đồng thông minh với Mythril](https://github.com/ConsenSysDiligence/mythril/blob/develop/docs/source/tutorial.rst)**

## Thử nghiệm thủ công cho hợp đồng thông minh {#manual-testing-for-smart-contracts}

Thử nghiệm thủ công các hợp đồng thông minh thường diễn ra muộn hơn trong chu kỳ phát triển sau khi chạy các thử nghiệm tự động. Hình thức thử nghiệm này đánh giá hợp đồng thông minh như một sản phẩm được tích hợp đầy đủ để xem liệu nó có hoạt động như được chỉ định trong các yêu cầu kỹ thuật hay không.

### Thử nghiệm hợp đồng trên một Chuỗi khối cục bộ {#testing-on-local-blockchain}

Mặc dù thử nghiệm tự động được thực hiện trong môi trường phát triển cục bộ có thể cung cấp thông tin gỡ lỗi hữu ích, bạn sẽ muốn biết hợp đồng thông minh của mình hoạt động như thế nào trong môi trường sản xuất. Tuy nhiên, việc triển khai lên chuỗi Ethereum chính sẽ phát sinh phí Gas—chưa kể đến việc bạn hoặc người dùng của bạn có thể mất tiền thật nếu hợp đồng thông minh của bạn vẫn còn lỗi.

Thử nghiệm hợp đồng của bạn trên một Chuỗi khối cục bộ (còn được gọi là [mạng lưới phát triển](/developers/docs/development-networks/)) là một giải pháp thay thế được khuyến nghị cho việc thử nghiệm trên Mạng chính. Một Chuỗi khối cục bộ là một bản sao của Chuỗi khối Ethereum chạy cục bộ trên máy tính của bạn, mô phỏng hành vi của lớp thực thi của Ethereum. Do đó, bạn có thể lập trình các giao dịch để tương tác với một hợp đồng mà không phải chịu chi phí đáng kể.

Việc chạy các hợp đồng trên một Chuỗi khối cục bộ có thể hữu ích như một hình thức thử nghiệm tích hợp thủ công. [Hợp đồng thông minh có khả năng kết hợp cao](/developers/docs/smart-contracts/composability/), cho phép bạn tích hợp với các Giao thức hiện có—nhưng bạn vẫn cần đảm bảo rằng các tương tác phức tạp trên chuỗi như vậy tạo ra kết quả chính xác.

[Tìm hiểu thêm về các mạng lưới phát triển.](/developers/docs/development-networks/)

### Thử nghiệm hợp đồng trên các mạng thử nghiệm {#testing-contracts-on-testnets}

Một mạng thử nghiệm hoạt động chính xác giống như Mạng chính Ethereum, ngoại trừ việc nó sử dụng ether (ETH) không có giá trị thực tế. Việc triển khai hợp đồng của bạn trên một [mạng thử nghiệm](/developers/docs/networks/#ethereum-testnets) có nghĩa là bất kỳ ai cũng có thể tương tác với nó (ví dụ: thông qua giao diện người dùng của ứng dụng phi tập trung (dapp)) mà không gây rủi ro cho tiền của họ.

Hình thức thử nghiệm thủ công này rất hữu ích để đánh giá luồng từ đầu đến cuối của ứng dụng của bạn từ quan điểm của người dùng. Tại đây, những người thử nghiệm beta cũng có thể thực hiện các lần chạy thử và báo cáo bất kỳ vấn đề nào với logic nghiệp vụ và chức năng tổng thể của hợp đồng.

Việc triển khai trên một mạng thử nghiệm sau khi thử nghiệm trên một Chuỗi khối cục bộ là lý tưởng vì mạng thử nghiệm gần với hành vi của Máy ảo Ethereum hơn. Do đó, việc nhiều dự án gốc Ethereum triển khai các dapp trên các mạng thử nghiệm để đánh giá hoạt động của hợp đồng thông minh trong các điều kiện thực tế là rất phổ biến.

[Tìm hiểu thêm về các mạng thử nghiệm Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Thử nghiệm so với xác minh hình thức {#testing-vs-formal-verification}

Mặc dù thử nghiệm giúp xác nhận rằng một hợp đồng trả về kết quả mong đợi cho một số đầu vào dữ liệu, nhưng nó không thể chứng minh một cách thuyết phục điều tương tự đối với các đầu vào không được sử dụng trong quá trình thử nghiệm. Do đó, việc thử nghiệm một hợp đồng thông minh không thể đảm bảo "tính chính xác về chức năng" (tức là nó không thể chỉ ra rằng một chương trình hoạt động như yêu cầu đối với _tất cả_ các tập hợp giá trị đầu vào).

Xác minh hình thức là một phương pháp tiếp cận để đánh giá tính chính xác của phần mềm bằng cách kiểm tra xem một mô hình hình thức của chương trình có khớp với đặc tả hình thức hay không. Một mô hình hình thức là một biểu diễn toán học trừu tượng của một chương trình, trong khi một đặc tả hình thức xác định các thuộc tính của một chương trình (tức là các khẳng định logic về việc thực thi của chương trình).

Vì các thuộc tính được viết bằng các thuật ngữ toán học, nên có thể xác minh rằng một mô hình hình thức (toán học) của hệ thống thỏa mãn một đặc tả bằng cách sử dụng các quy tắc suy luận logic. Do đó, các công cụ xác minh hình thức được cho là tạo ra 'bằng chứng toán học' về tính chính xác của một hệ thống.

Không giống như thử nghiệm, xác minh hình thức có thể được sử dụng để xác minh việc thực thi hợp đồng thông minh thỏa mãn một đặc tả hình thức cho _tất cả_ các lần thực thi (tức là nó không có lỗi) mà không cần phải thực thi nó với dữ liệu mẫu. Điều này không chỉ làm giảm thời gian dành cho việc chạy hàng chục thử nghiệm đơn vị mà còn hiệu quả hơn trong việc phát hiện các lỗ hổng tiềm ẩn. Mặc dù vậy, các kỹ thuật xác minh hình thức nằm trên một phổ tùy thuộc vào độ khó thực hiện và tính hữu ích của chúng.

[Tìm hiểu thêm về xác minh hình thức cho hợp đồng thông minh.](/developers/docs/smart-contracts/formal-verification)

## Thử nghiệm so với kiểm toán và tiền thưởng tìm lỗi (bug bounties) {#testing-vs-audits-bug-bounties}

Như đã đề cập, thử nghiệm nghiêm ngặt hiếm khi có thể đảm bảo không có lỗi trong một hợp đồng; các phương pháp tiếp cận xác minh hình thức có thể cung cấp những đảm bảo mạnh mẽ hơn về tính chính xác nhưng hiện tại rất khó sử dụng và phát sinh chi phí đáng kể.

Tuy nhiên, bạn có thể tăng thêm khả năng phát hiện các lỗ hổng của hợp đồng bằng cách nhờ đánh giá mã độc lập. [Kiểm toán hợp đồng thông minh](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) và [tiền thưởng tìm lỗi](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) là hai cách để nhờ người khác phân tích các hợp đồng của bạn.

Các cuộc kiểm toán được thực hiện bởi các kiểm toán viên có kinh nghiệm trong việc tìm kiếm các trường hợp có lỗ hổng bảo mật và các thực tiễn phát triển kém trong hợp đồng thông minh. Một cuộc kiểm toán thường sẽ bao gồm thử nghiệm (và có thể là xác minh hình thức) cũng như đánh giá thủ công toàn bộ cơ sở mã.

Ngược lại, một chương trình tiền thưởng tìm lỗi thường liên quan đến việc cung cấp phần thưởng tài chính cho một cá nhân (thường được mô tả là [tin tặc mũ trắng](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>) phát hiện ra lỗ hổng trong một hợp đồng thông minh và tiết lộ nó cho các nhà phát triển. Tiền thưởng tìm lỗi tương tự như kiểm toán vì nó liên quan đến việc yêu cầu người khác giúp tìm ra các khiếm khuyết trong hợp đồng thông minh.

Sự khác biệt chính là các chương trình tiền thưởng tìm lỗi mở cửa cho cộng đồng nhà phát triển/tin tặc rộng lớn hơn và thu hút một tầng lớp rộng lớn các tin tặc có đạo đức và các chuyên gia bảo mật độc lập với các kỹ năng và kinh nghiệm độc đáo. Đây có thể là một lợi thế so với các cuộc kiểm toán hợp đồng thông minh chủ yếu dựa vào các nhóm có thể sở hữu chuyên môn hạn chế hoặc hẹp.

## Các công cụ và Thư viện thử nghiệm {#testing-tools-and-libraries}

### Các công cụ thử nghiệm đơn vị {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Công cụ đo lường mức độ bao phủ mã cho các hợp đồng thông minh được viết bằng Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Khuôn khổ để phát triển và thử nghiệm hợp đồng thông minh nâng cao (dựa trên Ethers.js)_.

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Công cụ để thử nghiệm các hợp đồng thông minh Solidity. Hoạt động bên dưới plugin "Solidity Unit Testing" của Remix IDE, được sử dụng để viết và chạy các trường hợp thử nghiệm cho một hợp đồng._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Thư viện khẳng định cho việc thử nghiệm hợp đồng thông minh Ethereum. Đảm bảo các hợp đồng của bạn hoạt động như mong đợi!_

- **[Khuôn khổ thử nghiệm đơn vị Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie sử dụng Pytest, một khuôn khổ thử nghiệm giàu tính năng cho phép bạn viết các thử nghiệm nhỏ với mã tối thiểu, mở rộng tốt cho các dự án lớn và có khả năng mở rộng cao._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry cung cấp Forge, một khuôn khổ thử nghiệm Ethereum nhanh chóng và linh hoạt có khả năng thực thi các thử nghiệm đơn vị đơn giản, kiểm tra tối ưu hóa gas và fuzzing hợp đồng._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Khuôn khổ để thử nghiệm các hợp đồng thông minh dựa trên Ethers.js, Mocha và Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Khuôn khổ phát triển và thử nghiệm dựa trên Python cho các hợp đồng thông minh nhắm mục tiêu đến Máy ảo Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Khuôn khổ dựa trên Python để thử nghiệm đơn vị và fuzzing với khả năng gỡ lỗi mạnh mẽ và hỗ trợ thử nghiệm chuỗi chéo, sử dụng pytest và Anvil để có trải nghiệm người dùng và hiệu suất tốt nhất._

### Các công cụ thử nghiệm dựa trên thuộc tính {#property-based-testing-tools}

#### Các công cụ phân tích tĩnh {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Khuôn khổ phân tích tĩnh Solidity dựa trên Python để tìm kiếm các lỗ hổng, tăng cường khả năng hiểu mã và viết các phân tích tùy chỉnh cho hợp đồng thông minh._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter để thực thi các thực tiễn tốt nhất về phong cách và bảo mật cho ngôn ngữ lập trình hợp đồng thông minh Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Bộ phân tích tĩnh dựa trên Rust được thiết kế đặc biệt cho việc phát triển và bảo mật hợp đồng thông minh Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Khuôn khổ phân tích tĩnh dựa trên Python với các trình phát hiện lỗ hổng và chất lượng mã, các trình in để trích xuất thông tin hữu ích từ mã và hỗ trợ viết các mô-đun con tùy chỉnh._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Một linter đơn giản và mạnh mẽ cho Solidity._

#### Các công cụ phân tích động {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer hợp đồng nhanh chóng để phát hiện các lỗ hổng trong hợp đồng thông minh thông qua thử nghiệm dựa trên thuộc tính._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Công cụ fuzzing tự động hữu ích để phát hiện các vi phạm thuộc tính trong mã hợp đồng thông minh._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Khuôn khổ thực thi tượng trưng động để phân tích mã byte EVM._

- **[Mythril](https://github.com/ConsenSysDiligence/mythril)** - _Công cụ đánh giá mã byte EVM để phát hiện các lỗ hổng của hợp đồng bằng cách sử dụng phân tích taint, phân tích concolic và kiểm tra luồng điều khiển._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble là một ngôn ngữ đặc tả và công cụ xác minh thời gian chạy cho phép bạn chú thích các hợp đồng thông minh với các thuộc tính cho phép bạn tự động thử nghiệm các hợp đồng bằng các công cụ như Diligence Fuzzing hoặc MythX._

## Các hướng dẫn liên quan {#related-tutorials}

- [Tổng quan và so sánh các sản phẩm thử nghiệm khác nhau](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Cách sử dụng Echidna để thử nghiệm hợp đồng thông minh](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Cách sử dụng Manticore để tìm lỗi hợp đồng thông minh](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Cách sử dụng Slither để tìm lỗi hợp đồng thông minh](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Cách tạo dữ liệu giả (mock) cho các hợp đồng Solidity để thử nghiệm](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Cách chạy thử nghiệm đơn vị trong Solidity bằng Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Đọc thêm {#further-reading}

- [Hướng dẫn chuyên sâu về thử nghiệm hợp đồng thông minh Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Cách thử nghiệm hợp đồng thông minh Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Hướng dẫn thử nghiệm đơn vị của MolochDAO dành cho nhà phát triển](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Cách thử nghiệm hợp đồng thông minh như một chuyên gia](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Hướng dẫn: Thử nghiệm hợp đồng thông minh trên Ethereum {#tutorials}

- [Cách phát triển và thử nghiệm một dApp trên một mạng thử nghiệm đa máy khách cục bộ](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Hướng dẫn từng bước triển khai một hợp đồng thông minh lên một mạng thử nghiệm cục bộ và thực hiện các thử nghiệm._
- [Cách tạo dữ liệu giả (mock) cho các hợp đồng thông minh Solidity để thử nghiệm](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Hướng dẫn trung cấp về cách sử dụng dữ liệu giả và triển khai thử nghiệm đơn vị._
- [Cách sử dụng Echidna để thử nghiệm hợp đồng thông minh](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Phương pháp tiếp cận nâng cao đối với fuzzing và thử nghiệm hợp đồng thông minh._
