---
title: "Cách triển khai thị trường ERC-721"
description: "Cách đưa các mặt hàng được mã hóa rao bán trên bảng rao vặt phi tập trung"
author: "Alberto Cuesta Cañada"
tags:
  [
    "hợp đồng thông minh",
    "erc-721",
    "solidity",
    "tokens"
  ]
skill: intermediate
lang: vi
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

Trong bài viết này, tôi sẽ hướng dẫn bạn cách viết mã Craigslist cho chuỗi khối Ethereum.

Trước khi có Gumtree, Ebay và Craigslist, các bảng rao vặt chủ yếu được làm bằng nút chai hoặc giấy. Có các bảng rao vặt trong hành lang trường học, trên báo, cột đèn đường, và mặt tiền cửa hàng.

Tất cả đã thay đổi với sự ra đời của internet. Số lượng người có thể xem một bảng rao vặt cụ thể đã tăng lên gấp nhiều lần. Cùng với đó, các thị trường mà chúng đại diện đã trở nên hiệu quả hơn nhiều và mở rộng quy mô ra toàn cầu. Ebay là một doanh nghiệp khổng lồ có nguồn gốc từ những bảng rao vặt vật lý này.

Với chuỗi khối, các thị trường này sẽ một lần nữa thay đổi, hãy để tôi chỉ cho bạn cách thức hoạt động.

## Kiếm tiền {#monetization}

Mô hình kinh doanh của một bảng rao vặt chuỗi khối công khai sẽ cần phải khác với mô hình của Ebay và các công ty tương tự.

Đầu tiên, có [khía cạnh phi tập trung hóa](/developers/docs/web2-vs-web3/). Các nền tảng hiện có cần phải duy trì máy chủ của riêng họ. Một nền tảng phi tập trung được duy trì bởi người dùng của nó, vì vậy chi phí vận hành nền tảng cốt lõi giảm xuống bằng không đối với chủ sở hữu nền tảng.

Sau đó là giao diện người dùng, trang web hoặc giao diện cung cấp quyền truy cập vào nền tảng. Ở đây có nhiều lựa chọn. Chủ sở hữu nền tảng có thể hạn chế quyền truy cập và buộc mọi người sử dụng giao diện của họ, đồng thời tính phí. Chủ sở hữu nền tảng cũng có thể quyết định mở quyền truy cập (Quyền lực về tay nhân dân!) và cho phép bất kỳ ai xây dựng giao diện cho nền tảng. Hoặc chủ sở hữu có thể quyết định bất kỳ cách tiếp cận nào nằm giữa hai thái cực đó.

_Các nhà lãnh đạo doanh nghiệp có tầm nhìn xa hơn tôi sẽ biết cách kiếm tiền từ việc này. Tất cả những gì tôi thấy là điều này khác với hiện trạng và có thể có lãi._

Hơn nữa, có khía cạnh tự động hóa và thanh toán. Một số thứ có thể được [mã hóa rất hiệu quả](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) và được giao dịch trên một bảng rao vặt. Tài sản được mã hóa dễ dàng được chuyển giao trên chuỗi khối. Các phương thức thanh toán rất phức tạp có thể được triển khai dễ dàng trên chuỗi khối.

Tôi chỉ đang ngửi thấy một cơ hội kinh doanh ở đây. Một bảng rao vặt không có chi phí vận hành có thể dễ dàng được triển khai, với các đường thanh toán phức tạp được bao gồm trong mỗi giao dịch. Tôi chắc chắn ai đó sẽ nảy ra ý tưởng về việc sử dụng nó để làm gì.

Tôi chỉ vui vì đã xây dựng nó. Hãy xem qua mã.

## Triển khai {#implementation}

Cách đây một thời gian, chúng tôi đã bắt đầu một [kho lưu trữ mã nguồn mở](https://github.com/HQ20/contracts?ref=hackernoon.com) với các ví dụ triển khai trường hợp kinh doanh và những thứ hay ho khác, mời bạn xem qua.

Mã cho [Bảng rao vặt Ethereum](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) này có ở đó, hãy thoải mái sử dụng. Chỉ cần lưu ý rằng mã chưa được kiểm toán và bạn cần phải tự mình thẩm định trước khi rót tiền vào đó.

Những điều cơ bản của bảng không phức tạp. Tất cả các quảng cáo trong bảng sẽ chỉ là một cấu trúc (struct) với một vài trường:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Mở, Đã thực thi, Đã hủy
}
```

Vậy là có người đăng quảng cáo. Một mặt hàng để bán. Giá cho mặt hàng đó. Trạng thái của giao dịch có thể là đang mở, đã thực thi hoặc đã hủy.

Tất cả các giao dịch này sẽ được lưu giữ trong một ánh xạ (mapping). Bởi vì mọi thứ trong Solidity dường như đều là một ánh xạ. Cũng bởi vì nó tiện lợi.

```solidity
mapping(uint256 => Trade) public trades;
```

Việc sử dụng ánh xạ chỉ có nghĩa là chúng ta phải tạo một id cho mỗi quảng cáo trước khi đăng nó, và chúng ta sẽ cần biết id của một quảng cáo trước khi có thể thao tác trên đó. Có nhiều cách để giải quyết vấn đề này trong hợp đồng thông minh hoặc trong giao diện người dùng. Vui lòng hỏi nếu bạn cần một vài gợi ý.

Tiếp theo là câu hỏi về các mặt hàng mà chúng ta xử lý là gì, và loại tiền tệ nào được sử dụng để thanh toán cho giao dịch.

Đối với các mặt hàng, chúng ta sẽ chỉ yêu cầu chúng triển khai giao diện [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com), đây thực sự chỉ là một cách để đại diện cho các mặt hàng trong thế giới thực trên chuỗi khối, mặc dù nó [hoạt động tốt nhất với các tài sản kỹ thuật số](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). Chúng ta sẽ chỉ định hợp đồng ERC721 của riêng mình trong hàm khởi tạo, nghĩa là bất kỳ tài sản nào trong bảng rao vặt của chúng ta đều cần được mã hóa từ trước.

Đối với các khoản thanh toán, chúng ta sẽ làm điều gì đó tương tự. Hầu hết các dự án chuỗi khối đều định nghĩa tiền mã hóa [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) của riêng họ. Một số khác lại thích sử dụng một loại tiền chính thống như DAI. Trong bảng rao vặt này, bạn chỉ cần quyết định loại tiền tệ của mình sẽ là gì khi xây dựng. Dễ dàng.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

Chúng ta sắp hoàn thành rồi. Chúng ta đã có quảng cáo, các mặt hàng để giao dịch và một loại tiền tệ để thanh toán. Tạo một quảng cáo có nghĩa là đặt một mặt hàng vào ký quỹ để cho thấy rằng bạn có nó và bạn chưa đăng nó hai lần, có thể là trên một bảng khác.

Đoạn mã dưới đây thực hiện chính xác điều đó. Đặt vật phẩm vào ký quỹ, tạo quảng cáo, thực hiện một số công việc dọn dẹp.

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

Chấp nhận giao dịch có nghĩa là chọn một quảng cáo (giao dịch), trả giá và nhận vật phẩm. Đoạn mã dưới đây truy xuất một giao dịch. Kiểm tra xem nó có sẵn không. Thanh toán cho vật phẩm. Truy xuất vật phẩm. Cập nhật quảng cáo.

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

Cuối cùng, chúng ta có một tùy chọn cho người bán để rút lui khỏi một giao dịch trước khi người mua chấp nhận nó. Trong một số mô hình, quảng cáo sẽ hoạt động trong một khoảng thời gian trước khi hết hạn. Lựa chọn là của bạn, tùy thuộc vào thiết kế thị trường của bạn.

Mã này rất giống với mã được sử dụng để thực hiện một giao dịch, chỉ khác là không có tiền tệ nào được trao đổi và vật phẩm sẽ quay trở lại người đăng quảng cáo.

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

Vậy là xong. Bạn đã hoàn thành phần triển khai. Thật đáng ngạc nhiên khi một số khái niệm kinh doanh lại trở nên cô đọng khi được thể hiện bằng mã, và đây là một trong những trường hợp như vậy. Kiểm tra hợp đồng hoàn chỉnh [trong kho lưu trữ của chúng tôi](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Kết luận {#conclusion}

Các bảng rao vặt là một cấu hình thị trường phổ biến đã mở rộng quy mô lớn với sự ra đời của internet, trở thành một mô hình kinh doanh cực kỳ phổ biến với một vài người chiến thắng độc quyền.

Các bảng rao vặt cũng là một công cụ dễ sao chép trong môi trường chuỗi khối, với các tính năng rất cụ thể sẽ có thể thách thức những gã khổng lồ hiện có.

Trong bài viết này, tôi đã cố gắng kết nối thực tế kinh doanh của một doanh nghiệp bảng rao vặt với việc triển khai công nghệ. Kiến thức này sẽ giúp bạn tạo ra một tầm nhìn và một lộ trình để triển khai nếu bạn có những kỹ năng phù hợp.

Như mọi khi, nếu bạn đang xây dựng bất cứ điều gì thú vị và muốn nhận một vài lời khuyên, vui lòng [liên hệ với tôi](https://albertocuesta.es/)! Tôi luôn sẵn lòng giúp đỡ.
