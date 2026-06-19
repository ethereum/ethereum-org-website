---
title: "Thư viện hợp đồng thông minh"
description: "Khám phá các thư viện hợp đồng thông minh và các khối xây dựng có thể tái sử dụng để tăng tốc các dự án phát triển Ethereum của bạn."
lang: vi
---

Bạn không cần phải viết mọi hợp đồng thông minh trong dự án của mình từ đầu. Có rất nhiều thư viện hợp đồng thông minh mã nguồn mở cung cấp các khối xây dựng có thể tái sử dụng cho dự án của bạn, giúp bạn không phải mất công làm lại những thứ đã có sẵn.

## Điều kiện tiên quyết {#prerequisites}

Trước khi tìm hiểu về các thư viện hợp đồng thông minh, bạn nên có hiểu biết tốt về cấu trúc của một hợp đồng thông minh. Hãy xem qua phần [cấu trúc hợp đồng thông minh](/developers/docs/smart-contracts/anatomy/) nếu bạn chưa xem.

## Có gì trong một thư viện {#whats-in-a-library}

Bạn thường có thể tìm thấy hai loại khối xây dựng trong các thư viện hợp đồng thông minh: các hành vi có thể tái sử dụng mà bạn có thể thêm vào hợp đồng của mình và các bản triển khai của nhiều tiêu chuẩn khác nhau.

### Hành vi {#behaviors}

Khi viết các hợp đồng thông minh, rất có thể bạn sẽ thấy mình phải viết đi viết lại các mẫu tương tự nhau, chẳng hạn như chỉ định một địa chỉ _admin_ (quản trị viên) để thực hiện các hoạt động được bảo vệ trong một hợp đồng, hoặc thêm một nút _pause_ (tạm dừng) khẩn cấp trong trường hợp xảy ra sự cố không mong muốn.

Các thư viện hợp đồng thông minh thường cung cấp các bản triển khai có thể tái sử dụng của những hành vi này dưới dạng các [thư viện](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) hoặc thông qua tính [kế thừa](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) trong Solidity.

Ví dụ, dưới đây là một phiên bản đơn giản hóa của [hợp đồng `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) từ [thư viện OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), chỉ định một địa chỉ làm chủ sở hữu của một hợp đồng và cung cấp một modifier để hạn chế quyền truy cập vào một phương thức chỉ dành cho chủ sở hữu đó.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Để sử dụng một khối xây dựng như thế này trong hợp đồng của bạn, trước tiên bạn cần import (nhập) nó, và sau đó kế thừa từ nó trong các hợp đồng của riêng bạn. Điều này sẽ cho phép bạn sử dụng modifier được cung cấp bởi hợp đồng `Ownable` cơ sở để bảo mật các hàm của riêng bạn.

```solidity
import ".../Ownable.sol"; // Đường dẫn đến thư viện được nhập

contract MyContract is Ownable {
    // Hàm dưới đây chỉ có thể được gọi bởi chủ sở hữu
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Một ví dụ phổ biến khác là [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) hoặc [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Đây là các thư viện (trái ngược với các hợp đồng cơ sở) cung cấp các hàm số học với các kiểm tra tràn số, điều mà ngôn ngữ không cung cấp sẵn. Một phương pháp hay là sử dụng một trong hai thư viện này thay vì các phép toán số học gốc để bảo vệ hợp đồng của bạn khỏi các lỗi tràn số, vốn có thể gây ra những hậu quả tai hại!

### Tiêu chuẩn {#standards}

Để tạo điều kiện thuận lợi cho [khả năng kết hợp và khả năng tương tác](/developers/docs/smart-contracts/composability/), cộng đồng Ethereum đã định nghĩa một số tiêu chuẩn dưới dạng các **ERC**. Bạn có thể đọc thêm về chúng trong phần [tiêu chuẩn](/developers/docs/standards/).

Khi đưa một ERC vào làm một phần trong các hợp đồng của bạn, bạn nên tìm kiếm các bản triển khai tiêu chuẩn thay vì cố gắng tự xây dựng. Nhiều thư viện hợp đồng thông minh bao gồm các bản triển khai cho những ERC phổ biến nhất. Ví dụ, [tiêu chuẩn token có thể thay thế ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) phổ biến ở khắp mọi nơi có thể được tìm thấy trong [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) và [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). Ngoài ra, một số ERC cũng cung cấp các bản triển khai chuẩn mực như một phần của chính ERC đó.

Đáng chú ý là một số ERC không hoạt động độc lập mà là các phần bổ sung cho các ERC khác. Ví dụ, [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) thêm một tiện ích mở rộng vào ERC-20 để cải thiện khả năng sử dụng của nó.

## Cách thêm một thư viện {#how-to}

Luôn tham khảo tài liệu của thư viện mà bạn đang đưa vào để biết các hướng dẫn cụ thể về cách tích hợp nó vào dự án của bạn. Một số thư viện hợp đồng Solidity được đóng gói bằng `npm`, vì vậy bạn chỉ cần `npm install` chúng. Hầu hết các công cụ để [biên dịch](/developers/docs/smart-contracts/compiling/) các hợp đồng sẽ tìm kiếm trong `node_modules` của bạn để tìm các thư viện hợp đồng thông minh, vì vậy bạn có thể làm như sau:

```solidity
// Điều này sẽ tải thư viện @openzeppelin/contracts từ node_modules của bạn
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Bất kể bạn sử dụng phương pháp nào, khi đưa vào một thư viện, hãy luôn chú ý đến phiên bản [ngôn ngữ](/developers/docs/smart-contracts/languages/). Ví dụ, bạn không thể sử dụng một thư viện dành cho Solidity 0.6 nếu bạn đang viết các hợp đồng của mình bằng Solidity 0.5.

## Khi nào nên sử dụng {#when-to-use}

Việc sử dụng một thư viện hợp đồng thông minh cho dự án của bạn mang lại một số lợi ích. Đầu tiên và quan trọng nhất, nó giúp bạn tiết kiệm thời gian bằng cách cung cấp cho bạn các khối xây dựng sẵn sàng sử dụng mà bạn có thể đưa vào hệ thống của mình, thay vì phải tự code chúng.

Bảo mật cũng là một điểm cộng lớn. Các thư viện hợp đồng thông minh mã nguồn mở thường được xem xét rất kỹ lưỡng. Do có nhiều dự án phụ thuộc vào chúng, cộng đồng có động lực mạnh mẽ để liên tục đánh giá chúng. Việc tìm thấy lỗi trong mã ứng dụng phổ biến hơn nhiều so với trong các thư viện hợp đồng có thể tái sử dụng. Một số thư viện cũng trải qua các đợt [kiểm toán từ bên ngoài](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) để tăng cường bảo mật.

Tuy nhiên, việc sử dụng các thư viện hợp đồng thông minh mang lại rủi ro khi đưa mã mà bạn không quen thuộc vào dự án của mình. Việc import một hợp đồng và đưa nó trực tiếp vào dự án của bạn rất hấp dẫn, nhưng nếu không hiểu rõ hợp đồng đó làm gì, bạn có thể vô tình gây ra sự cố trong hệ thống của mình do một hành vi không mong muốn. Luôn đảm bảo đọc tài liệu của mã bạn đang import, và sau đó tự xem xét mã trước khi biến nó thành một phần trong dự án của bạn!

Cuối cùng, khi quyết định xem có nên đưa vào một thư viện hay không, hãy xem xét mức độ sử dụng tổng thể của nó. Một thư viện được áp dụng rộng rãi có lợi ích là có một cộng đồng lớn hơn và nhiều người theo dõi để tìm ra các vấn đề. Bảo mật nên là trọng tâm chính của bạn khi xây dựng với các hợp đồng thông minh!

## Các công cụ liên quan {#related-tools}

**OpenZeppelin Contracts -** **_Thư viện phổ biến nhất để phát triển hợp đồng thông minh an toàn._**

- [Tài liệu](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Diễn đàn cộng đồng](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Các khối xây dựng an toàn, đơn giản, linh hoạt cho các hợp đồng thông minh._**

- [Tài liệu](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Một dự án Solidity với các hợp đồng, thư viện và ví dụ để giúp bạn xây dựng các ứng dụng phân tán đầy đủ tính năng cho thế giới thực._**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_Cung cấp các công cụ cần thiết để xây dựng các hợp đồng thông minh tùy chỉnh một cách hiệu quả_**

- [Tài liệu](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Các hướng dẫn liên quan {#related-tutorials}

- [Các cân nhắc về bảo mật dành cho nhà phát triển Ethereum](/developers/docs/smart-contracts/security/) _– Một hướng dẫn về các cân nhắc bảo mật khi xây dựng hợp đồng thông minh, bao gồm cả việc sử dụng thư viện._
- [Tìm hiểu về hợp đồng thông minh token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- Hướng dẫn về tiêu chuẩn ERC-20, được cung cấp bởi nhiều thư viện._

## Đọc thêm {#further-reading}

_Bạn biết một tài nguyên cộng đồng nào đó đã giúp ích cho bạn? Hãy chỉnh sửa trang này và thêm nó vào!_