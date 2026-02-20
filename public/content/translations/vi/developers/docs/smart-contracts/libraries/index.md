---
title: "Các thư viện hợp đồng thông minh"
description: "Khám phá các thư viện hợp đồng thông minh có thể tái sử dụng và phát triển khối để tăng tốc độ phát triển dự án Ethereum của bạn."
lang: vi
---

Bạn không cần phải viết mọi hợp đồng thông minh trong dự án của mình ngay từ đầu. Có rất nhiều thư viện hợp đồng thông minh mã nguồn mở cung cấp các khối xây dựng có thể tái sử dụng cho dự án của bạn, điều này sẽ giúp bạn không cần phải tạo lại những thứ sẵn có.

## Điều kiện tiên quyết {#prerequisites}

Trước khi đến với các thư viện hợp đồng thông minh, tốt hơn là bạn nên hiểu rõ cấu trúc của một hợp đồng thông minh. Hãy chuyển đến [cấu trúc hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/) nếu bạn chưa thực hiện.

## Thư viện có những gì {#whats-in-a-library}

Bạn có thể thường tìm kiếm hai loại khối xây dựng trong thư viện hợp đồng thông minh: các hành vi tái sử dụng (các hàm được định nghĩa trong một lớp) mà bạn có thể thêm vào hợp đồng, và triển khai nhiều tiêu chuẩn khác nhau.

### Các hành vi {#behaviors}

Khi viết hợp đồng thông minh, rất có thể bạn sẽ thấy mình viết đi viết lại các mẫu tương tự, như chỉ định một địa chỉ _admin_ để thực hiện các hoạt động được bảo vệ trong một hợp đồng, hoặc thêm nút _tạm dừng_ khẩn cấp trong trường hợp xảy ra sự cố không mong muốn.

Các thư viện hợp đồng thông minh thường cung cấp các triển khai có thể tái sử dụng của các hành vi này dưới dạng [thư viện](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) hoặc thông qua [kế thừa](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) trong Solidity.

Ví dụ: sau đây là phiên bản đơn giản hóa của [hợp đồng `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) từ [thư viện Hợp đồng OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), hợp đồng này chỉ định một địa chỉ làm chủ sở hữu hợp đồng và cung cấp một bổ từ để hạn chế quyền truy cập vào một phương thức chỉ dành cho chủ sở hữu đó.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: người gọi không phải là chủ sở hữu");
        _;
    }
}
```

Để sử dụng một khối xây dựng như thế này trong hợp đồng của bạn, bạn sẽ cần khai báo khối đó trước tiên, và sau đó mở rộng nó trong hợp đồng của chính bạn. Điều này sẽ cho phép bạn sử dụng bổ từ do hợp đồng `Ownable` cơ sở cung cấp để bảo mật các hàm của riêng bạn.

```solidity
import ".../Ownable.sol"; // Đường dẫn đến thư viện đã nhập

contract MyContract is Ownable {
    // Hàm sau chỉ có thể được gọi bởi chủ sở hữu
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Một ví dụ phổ biến khác là [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) hoặc [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Đây là những thư viện (trái ngược lại với các hợp đồng gốc) cung cấp các hàm toán học với với kiểm tra Overflow, không được cung cấp bằng ngôn ngữ. Đây là một cách tốt để thực hành khi sử dụng một trong hai thư viện này thay vì các toán tử cơ bản để bảo vệ hợp đồng của bạn khỏi Overflow, điều này có thể gây ra những hậu quả khó lường!

### Các tiêu chuẩn {#standards}

Để tạo điều kiện thuận lợi cho [tính khả hợp và khả năng tương tác](/developers/docs/smart-contracts/composability/), cộng đồng Ethereum đã xác định một số tiêu chuẩn dưới dạng **ERCs**. Bạn có thể đọc thêm về chúng trong phần [tiêu chuẩn](/developers/docs/standards/).

Khi bao gồm ERC như một phần của các hợp đồng của bạn, tốt hơn là bạn nên tìm kiếm các triển khai tiêu chuẩn thay vì cố gắng tự tạo của riêng mình. Nhiều thư viện hợp đồng thông minh bao gồm các triển khai cho các ERC phổ biến nhất. Ví dụ: [tiêu chuẩn token có thể thay thế ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) phổ biến có thể được tìm thấy trong [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) và [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Ngoài ra, một vài ERC cũng cung cấp các triển khai chuẩn như một phần của chính bản thân ERC.

Một điều đáng chú ý đó là một vài ERC không độc lập mà nó là phần bổ sung của các ERC khác. Ví dụ: [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) thêm một tiện ích mở rộng vào ERC20 để cải thiện khả năng sử dụng của nó.

## Cách thêm thư viện {#how-to}

Hãy luôn tham khảo tài liệu của thư viện mà bạn đang sử dụng để đọc những hướng dẫn cụ thể về cách đưa thư viện đó vào dự án của bạn. Một số thư viện hợp đồng Solidity được đóng gói bằng `npm`, vì vậy bạn chỉ cần `npm install` chúng. Hầu hết các công cụ để [biên dịch](/developers/docs/smart-contracts/compiling/) hợp đồng sẽ tìm trong `node_modules` của bạn để tìm các thư viện hợp đồng thông minh, vì vậy bạn có thể làm như sau:

```solidity
// Thao tác này sẽ tải thư viện @openzeppelin/contracts từ node_modules của bạn
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Bất kể bạn sử dụng phương pháp nào, khi đưa vào một thư viện, hãy luôn để mắt đến phiên bản [ngôn ngữ](/developers/docs/smart-contracts/languages/). Ví dụ, bạn có thể không sử dụng được một thư viện cho Solidity 0.6 nếu bạn đang lập trình hợp đồng của bạn bằng Solidity 0.5.

## Khi nào nên sử dụng {#when-to-use}

Sử dụng một thư viện hợp đồng thông minh cho dự án của bạn sẽ mang đến nhiều lợi ích. Đầu tiên và quan trọng nhất, nó sẽ tiết kiệm thời gian cho bạn bằng việc cung cấp các khối xây dựng sẵn sàng sử dụng mà bạn có thể sử dụng trong hệ thống của bạn hơn là tự viết mã cho chúng.

Bảo mật cũng là một điểm cộng lớn. Các thư viện hợp đồng thông minh mã nguồn mở thường được kiểm tra rất kỹ. Với nhiều dự án phụ thuộc vào chúng, cộng đồng có động lực mạnh mẽ để giữ cho các thư viện ấy luôn được kiểm tra liên tục. Việc tìm các lỗi trong đoạn mã của ứng dụng phổ biến hơn là tìm trong các thư viện hợp đồng tái sử dụng. Một số thư viện cũng trải qua [kiểm toán bên ngoài](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) để tăng cường bảo mật.

Tuy nhiên, sử dụng các thư viện hợp đồng thông minh mang đến rủi ro khi chúng sẽ đưa các đoạn mã mà bạn không quen thuộc vào dự án của bạn. Sẽ rất tuyệt khi thêm một hợp đồng và sử dụng nó trực tiếp vào trong dự án của bạn, nhưng nếu không rõ chức năng của hợp đồng đó, bạn có thể vô tình gây ra sự cố trong hệ thống của mình do một hành vi mà bạn không ngờ đến. Hãy luôn chắc chắn là mình đã đọc các tài liệu tham khảo của những đoạn mã mà bạn thêm vào, và sau đó xem xét đoạn mã đó trước khi biến nó thành một phần của dự án!

Cuối cùng, khi quyết định có sử dụng một thư viện hay không, hãy cân nhắc đến tổng thể sử dụng của nó. Một thư viện được áp dụng rộng rãi có lợi ích là sở hữu một cộng đồng lớn mạnh và có nhiều lập trình viên luôn kiểm tra các vấn đề của nó. Bảo mật nên là trọng tâm chính của bạn khi xây dựng hợp đồng thông minh!

## Các công cụ liên quan {#related-tools}

**OpenZeppelin Contracts -** **_Thư viện phổ biến nhất để phát triển hợp đồng thông minh bảo mật._**

- [Tài liệu](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Diễn đàn cộng đồng](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Các khối xây dựng an toàn, đơn giản, linh hoạt cho các hợp đồng thông minh._**

- [Tài liệu](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Một dự án Solidity với các hợp đồng, thư viện và ví dụ để giúp bạn xây dựng các ứng dụng phân tán đầy đủ tính năng cho thế giới thực._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Cung cấp các công cụ cần thiết để xây dựng các hợp đồng thông minh tùy chỉnh một cách hiệu quả._**

- [Tài liệu](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Các hướng dẫn liên quan {#related-tutorials}

- [Những lưu ý về bảo mật cho các nhà phát triển Ethereum](/developers/docs/smart-contracts/security/) _– Hướng dẫn về các lưu ý bảo mật khi xây dựng hợp đồng thông minh, bao gồm cả việc sử dụng thư viện._
- [Tìm hiểu về hợp đồng thông minh token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-Hướng dẫn về tiêu chuẩn ERC20, được cung cấp bởi nhiều thư viện._

## Đọc thêm {#further-reading}

_Biết về nguồn lực cộng đồng đã giúp đỡ bạn? Chỉnh sửa trang này và bổ sung!_
