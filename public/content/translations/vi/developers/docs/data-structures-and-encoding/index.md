---
title: Cấu trúc dữ liệu và mã hóa
description: Tổng quan về các cấu trúc dữ liệu cơ bản của Ethereum.
lang: vi
sidebarDepth: 2
---

Ethereum tạo, lưu trữ và truyền tải khối lượng lớn dữ liệu. Dữ liệu này phải được định dạng theo những cách tiêu chuẩn hóa và tiết kiệm bộ nhớ để cho phép bất kỳ ai cũng có thể [chạy một nút](/run-a-node/) trên phần cứng cấp tiêu dùng tương đối khiêm tốn. Để đạt được điều này, một số cấu trúc dữ liệu cụ thể được sử dụng trên ngăn xếp Ethereum.

## Điều kiện tiên quyết {#prerequisites}

Bạn nên hiểu các nguyên tắc cơ bản của Ethereum và [phần mềm máy khách](/developers/docs/nodes-and-clients/). Khuyến nghị nên làm quen với lớp mạng và [sách trắng Ethereum](/whitepaper/).

## Cấu trúc dữ liệu {#data-structures}

### Patricia Merkle Trie {#patricia-merkle-tries}

Patricia Merkle Trie là các cấu trúc mã hóa các cặp khóa-giá trị thành một trie xác định và được xác thực bằng mật mã. Chúng được sử dụng rộng rãi trên toàn bộ lớp thực thi của Ethereum.

[Tìm hiểu thêm về Patricia Merkle Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

Recursive Length Prefix (RLP) là một phương pháp tuần tự hóa được sử dụng rộng rãi trên toàn bộ lớp thực thi của Ethereum.

[Tìm hiểu thêm về RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

Simple Serialize (SSZ) là định dạng tuần tự hóa chủ đạo trên lớp đồng thuận của Ethereum vì khả năng tương thích của nó với quá trình merkle hóa (merklelization).

[Tìm hiểu thêm về SSZ](/developers/docs/data-structures-and-encoding/ssz)