---
title: "Các địa chỉ mạng"
description: "Giới thiệu về địa chỉ mạng."
lang: vi
sidebarDepth: 2
---

Các nút Ethereum phải tự nhận dạng bằng một số thông tin cơ bản để kết nối với các nút ngang hàng. Để đảm bảo bất kỳ nút ngang hàng tiềm năng nào cũng có thể diễn giải thông tin này, thông tin sẽ được chuyển tiếp theo một trong ba định dạng được tiêu chuẩn hóa mà bất kỳ nút Ethereum nào cũng có thể hiểu được: multiaddr, enode hoặc Ethereum Node Records (ENRs). ENR là tiêu chuẩn hiện tại cho các địa chỉ mạng Ethereum.

## Điều kiện tiên quyết {#prerequisites}

Cần có một số hiểu biết về [lớp mạng](/developers/docs/networking-layer/) của Ethereum để hiểu trang này.

## Multiaddr {#multiaddr}

Định dạng địa chỉ nút Ethereum ban đầu là 'multiaddr' (viết tắt của 'multi-addresses'). Multiaddr là một định dạng phổ quát được thiết kế cho các mạng ngang hàng. Các địa chỉ được biểu thị dưới dạng các cặp khóa-giá trị với các khóa và giá trị được phân tách bằng dấu gạch chéo. Ví dụ: multiaddr cho một nút có địa chỉ IPv4 `192.168.22.27` đang lắng nghe trên cổng TCP `33000` trông như sau:

`/ip4/192.168.22.27/tcp/33000`

Đối với một nút Ethereum, multiaddr chứa ID nút (một hàm băm của khóa công khai của nút đó):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode là một cách để nhận dạng một nút Ethereum bằng định dạng địa chỉ URL. ID nút dạng thập lục phân được mã hóa trong phần tên người dùng của URL, được phân tách khỏi máy chủ bằng ký hiệu @. Tên máy chủ chỉ có thể được cung cấp dưới dạng địa chỉ IP; tên DNS không được phép. Cổng trong phần tên máy chủ là cổng lắng nghe TCP. Nếu các cổng TCP và UDP (khám phá) khác nhau, cổng UDP được chỉ định là tham số truy vấn "discport".

Trong ví dụ sau, URL nút mô tả một nút có địa chỉ IP `10.3.58.6`, cổng TCP `30303` và cổng khám phá UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Bản ghi nút Ethereum (ENRs) {#enr}

Bản ghi nút Ethereum (ENRs) là một định dạng được tiêu chuẩn hóa cho các địa chỉ mạng trên Ethereum. Chúng thay thế multiaddr và enode. Những bản ghi này đặc biệt hữu ích vì chúng cho phép trao đổi thông tin nhiều hơn giữa các nút. ENR chứa một chữ ký, số thứ tự và các trường mô tả chi tiết sơ đồ nhận dạng được sử dụng để tạo và xác thực các chữ ký. ENR cũng có thể được điền với dữ liệu tùy ý được sắp xếp dưới dạng các cặp khóa-giá trị. Các cặp khóa-giá trị này chứa địa chỉ IP của nút và thông tin về các giao thức con mà nút có thể sử dụng. Máy khách đồng thuận sử dụng [cấu trúc ENR cụ thể](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) để xác định các nút khởi động và cũng bao gồm một trường `eth2` chứa thông tin về phân nhánh Ethereum hiện tại và mạng con tán gẫu chứng thực (mạng này kết nối nút với một tập hợp các nút ngang hàng cụ thể có các chứng thực được tổng hợp lại với nhau).

## Đọc thêm {#further-reading}

- [EIP-778: Bản ghi nút Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
