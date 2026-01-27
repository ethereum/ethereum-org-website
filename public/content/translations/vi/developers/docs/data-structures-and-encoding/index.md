---
title: Cấu trúc dữ liệu và mã hoá
description: Tổng quan về các cấu trúc dữ liệu cơ bản của Ethereum.
lang: vi
sidebarDepth: 2
---

Ethereum tạo, lưu trữ và chuyển một lượng lớn dữ liệu. Dữ liệu này phải được định dạng theo những cách được tiêu chuẩn hóa và tiết kiệm bộ nhớ để cho phép bất kỳ ai [chạy một nút](/run-a-node/) trên phần cứng cấp tiêu dùng tương đối khiêm tốn. Để đạt được điều này, một số cấu trúc dữ liệu cụ thể được sử dụng trên ngăn xếp Ethereum.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu các nguyên tắc cơ bản của Ethereum và [phần mềm máy khách](/developers/docs/nodes-and-clients/). Nên làm quen với lớp mạng và [Giấy trắng Ethereum](/whitepaper/).

## Các cấu trúc dữ liệu {#data-structures}

### Patricia merkle tries {#patricia-merkle-tries}

Patricia Merkle Tries là các cấu trúc mã hóa các cặp khóa-giá trị thành một cây trie mang tính tất định và được xác thực bằng mật mã. Những cấu trúc này được sử dụng rộng rãi trên lớp thực thi của Ethereum.

[Tìm hiểu thêm về Patricia Merkle Tries](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Tiền tố Độ dài Đệ quy {#recursive-length-prefix}

Tiền tố độ dài đệ quy (RLP) là một phương pháp tuần tự hóa được sử dụng rộng rãi trên lớp thực thi của Ethereum.

[Tìm hiểu thêm về RLP](/developers/docs/data-structures-and-encoding/rlp)

### Tuần tự hóa Đơn giản {#simple-serialize}

Tuần tự hóa đơn giản (SSZ) là định dạng tuần tự hóa chủ đạo trên lớp đồng thuận của Ethereum vì khả năng tương thích của nó với việc merkle hóa.

[Tìm hiểu thêm về SSZ](/developers/docs/data-structures-and-encoding/ssz)
