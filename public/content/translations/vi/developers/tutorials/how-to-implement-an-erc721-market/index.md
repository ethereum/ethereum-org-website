---
title: "Cách triển khai một thị trường ERC-721"
description: "Cách đăng bán các mặt hàng đã được mã hóa trên một bảng rao vặt phi tập trung"
author: "Alberto Cuesta Cañada"
tags: ["hợp đồng thông minh", "erc-721", "Solidity", "token"]
skill: intermediate
breadcrumb: "Thị trường ERC-721"
lang: vi
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Trong bài viết này, tôi sẽ hướng dẫn bạn cách lập trình một trang giống Craigslist cho Chuỗi khối Ethereum.

Trước khi có Gumtree, Ebay và Craigslist, các bảng rao vặt chủ yếu được làm bằng bần hoặc giấy. Đã từng có những bảng rao vặt ở hành lang trường học, trên báo chí, cột đèn đường, và trước cửa hàng.

Tất cả những điều đó đã thay đổi khi có internet. Số lượng người có thể xem một bảng rao vặt cụ thể đã tăng lên gấp nhiều lần. Nhờ đó, các thị trường mà chúng đại diện trở nên hiệu quả hơn nhiều và mở rộng ra quy mô toàn cầu. Ebay là một doanh nghiệp khổng lồ có nguồn gốc từ chính những bảng rao vặt vật lý này.

Với Chuỗi khối, các thị trường này chuẩn bị thay đổi một lần nữa, hãy để tôi chỉ cho bạn cách thức.

## Kiếm tiền {#monetization}

Mô hình kinh doanh của một bảng rao vặt trên Chuỗi khối công khai sẽ cần phải khác biệt so với Ebay và các công ty tương tự.

Đầu tiên là [khía cạnh sự phi tập trung](/developers/docs/web2-vs-web3/). Các nền tảng hiện tại cần phải duy trì máy chủ của riêng họ. Một nền tảng phi tập trung được duy trì bởi chính người dùng của nó, do đó chi phí vận hành nền tảng cốt lõi đối với chủ sở hữu nền tảng sẽ giảm xuống bằng không.

Tiếp theo là front-end (giao diện người dùng), trang web hoặc giao diện cung cấp quyền truy cập vào nền tảng. Ở đây có rất nhiều lựa chọn. Chủ sở hữu nền tảng có thể hạn chế quyền truy cập và buộc mọi người phải sử dụng giao diện của họ, đồng thời thu phí. Chủ sở hữu nền tảng cũng có thể quyết định mở quyền truy cập (Trao quyền cho mọi người!) và cho phép bất kỳ ai xây dựng giao diện cho nền tảng. Hoặc các chủ sở hữu có thể quyết định bất kỳ phương pháp tiếp cận nào nằm giữa hai thái cực đó.

_Những nhà lãnh đạo kinh doanh có tầm nhìn xa hơn tôi sẽ biết cách kiếm tiền từ việc này. Tất cả những gì tôi thấy là điều này khác biệt so với hiện trạng và có khả năng sinh lời._

Hơn nữa, còn có khía cạnh tự động hóa và thanh toán. Một số thứ có thể được [mã hóa thành token một cách rất hiệu quả](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) và giao dịch trên một bảng rao vặt. Các tài sản được mã hóa thành token có thể dễ dàng chuyển nhượng trên một Chuỗi khối. Các phương thức thanh toán cực kỳ phức tạp có thể được triển khai dễ dàng trên một Chuỗi khối.

Tôi chỉ đang đánh hơi thấy một cơ hội kinh doanh ở đây. Một bảng rao vặt không có chi phí vận hành có thể dễ dàng được triển khai, với các luồng thanh toán phức tạp được bao gồm trong mỗi giao dịch. Tôi chắc chắn rằng ai đó sẽ nảy ra ý tưởng về việc sử dụng nó để làm gì.

Tôi chỉ cảm thấy vui khi xây dựng nó. Hãy cùng xem qua mã nguồn.

## Triển khai {#implementation}

Cách đây một thời gian, chúng tôi đã bắt đầu một [kho lưu trữ mã nguồn mở](https://github.com/HQ20/contracts?ref=hackernoon.com) với các ví dụ triển khai tình huống kinh doanh và những thứ hay ho khác, vui lòng xem qua.

Mã nguồn cho [Bảng rao vặt Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) này nằm ở đó, hãy thoải mái sử dụng và thử nghiệm nó. Chỉ cần lưu ý rằng mã nguồn này chưa được kiểm toán và bạn cần phải tự mình thẩm định trước khi đưa tiền vào đó.

Những điều cơ bản của bảng rao vặt này không hề phức tạp. Tất cả các quảng cáo trên bảng sẽ chỉ là một struct (cấu trúc) với một vài trường dữ liệu:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Mở, Đã thực thi, Đã hủy
}
```

Vì vậy, có người đăng quảng cáo. Một mặt hàng để bán. Một mức giá cho mặt hàng đó. Trạng thái của giao dịch có thể là đang mở (open), đã thực hiện (executed) hoặc đã hủy (cancelled).

Tất cả các giao dịch này sẽ được lưu giữ trong một mapping (ánh xạ). Bởi vì mọi thứ trong Solidity dường như đều là một mapping. Cũng bởi vì nó rất tiện lợi.

```solidity
mapping(uint256 => Trade) public trades;
```

Việc sử dụng mapping chỉ có nghĩa là chúng ta phải tạo ra một id cho mỗi quảng cáo trước khi đăng nó, và chúng ta sẽ cần biết id của một quảng cáo trước khi có thể thao tác trên nó. Có nhiều cách để xử lý vấn đề này trong hợp đồng thông minh hoặc ở front-end. Vui lòng hỏi nếu bạn cần một vài gợi ý.

Tiếp theo là câu hỏi về những mặt hàng mà chúng ta giao dịch là gì, và loại tiền tệ nào được sử dụng để thanh toán cho giao dịch.

Đối với các mặt hàng, chúng ta chỉ yêu cầu chúng triển khai giao diện [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), đây thực sự chỉ là một cách để đại diện cho các mặt hàng trong thế giới thực trên một Chuỗi khối, mặc dù nó [hoạt động tốt nhất với các tài sản kỹ thuật số](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Chúng ta sẽ chỉ định hợp đồng ERC721 của riêng mình trong hàm khởi tạo, nghĩa là bất kỳ tài sản nào trên bảng rao vặt của chúng ta đều cần phải được mã hóa thành token từ trước.

Đối với các khoản thanh toán, chúng ta sẽ làm một điều tương tự. Hầu hết các dự án Chuỗi khối đều định nghĩa tiền mã hóa [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) của riêng họ. Một số dự án khác thích sử dụng một loại tiền phổ biến như DAI. Trong bảng rao vặt này, bạn chỉ cần quyết định loại tiền tệ của mình sẽ là gì khi khởi tạo. Rất dễ dàng.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Chúng ta sắp hoàn thành rồi. Chúng ta đã có các quảng cáo, các mặt hàng để giao dịch và một loại tiền tệ để thanh toán. Việc tạo một quảng cáo có nghĩa là đưa một mặt hàng vào ký quỹ (escrow) để chứng minh rằng bạn đang sở hữu nó và bạn chưa đăng nó hai lần, có thể là ở một bảng rao vặt khác.

Đoạn mã dưới đây thực hiện chính xác điều đó. Đưa mặt hàng vào ký quỹ, tạo quảng cáo, và thực hiện một số công việc dọn dẹp hệ thống.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

Chấp nhận giao dịch có nghĩa là chọn một quảng cáo (giao dịch), thanh toán mức giá, và nhận mặt hàng. Đoạn mã dưới đây sẽ truy xuất một giao dịch. Kiểm tra xem nó có sẵn hay không. Thanh toán cho mặt hàng. Lấy mặt hàng. Cập nhật quảng cáo.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Cuối cùng, chúng ta có một tùy chọn cho phép người bán rút lui khỏi một giao dịch trước khi người mua chấp nhận nó. Trong một số mô hình, các quảng cáo thay vào đó sẽ tồn tại trong một khoảng thời gian trước khi chúng hết hạn. Sự lựa chọn là của bạn, tùy thuộc vào thiết kế thị trường của bạn.

Đoạn mã này rất giống với đoạn mã được sử dụng để thực hiện một giao dịch, chỉ khác là không có sự trao đổi tiền tệ nào và mặt hàng sẽ được trả lại cho người đăng quảng cáo.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

Vậy là xong. Bạn đã đi đến phần cuối của quá trình triển khai. Thật đáng ngạc nhiên khi một số khái niệm kinh doanh lại trở nên nhỏ gọn như thế nào khi được thể hiện bằng mã nguồn, và đây là một trong những trường hợp đó. Hãy kiểm tra toàn bộ hợp đồng [trong kho lưu trữ của chúng tôi](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Kết luận {#conclusion}

Các bảng rao vặt là một cấu hình thị trường phổ biến đã mở rộng quy mô mạnh mẽ cùng với internet, trở thành một mô hình kinh doanh cực kỳ phổ biến với một vài người chiến thắng độc quyền.

Các bảng rao vặt cũng tình cờ là một công cụ dễ dàng để sao chép trong môi trường Chuỗi khối, với các tính năng rất cụ thể sẽ tạo ra khả năng thách thức những gã khổng lồ hiện tại.

Trong bài viết này, tôi đã nỗ lực làm cầu nối giữa thực tế kinh doanh của một doanh nghiệp bảng rao vặt với việc triển khai công nghệ. Kiến thức này sẽ giúp bạn tạo ra một tầm nhìn và lộ trình triển khai nếu bạn có các kỹ năng phù hợp.

Như thường lệ, nếu bạn đang muốn xây dựng bất cứ điều gì thú vị và muốn nhận được một vài lời khuyên, vui lòng [liên hệ với tôi](https://albertocuesta.es/)! Tôi luôn sẵn lòng giúp đỡ.