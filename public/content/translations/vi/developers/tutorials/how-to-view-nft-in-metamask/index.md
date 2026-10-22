---
title: "Cách xem NFT trong ví của bạn (Phần 3/3 của Chuỗi hướng dẫn về NFT)"
description: "Hướng dẫn này mô tả cách xem một NFT hiện có trên MetaMask!"
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity"]
skill: beginner
breadcrumb: "Xem NFT trong ví"
lang: vi
published: 2021-04-22
---

Hướng dẫn này là Phần 3/3 trong chuỗi Hướng dẫn về NFT, nơi chúng ta xem token không thể thay thế (NFT) mới được đúc của mình. Tuy nhiên, bạn có thể sử dụng hướng dẫn chung này cho bất kỳ token ERC-721 nào bằng MetaMask, bao gồm cả trên Mạng chính hoặc bất kỳ mạng thử nghiệm nào. Nếu bạn muốn tìm hiểu cách đúc NFT của riêng mình trên Ethereum, bạn nên xem [Phần 1 về Cách viết & Triển khai hợp đồng thông minh NFT](/developers/tutorials/how-to-write-and-deploy-an-nft)!

Chúc mừng! Bạn đã đến với phần ngắn nhất và đơn giản nhất trong chuỗi hướng dẫn về NFT của chúng tôi — cách xem NFT mới đúc của bạn trên một ví ảo. Chúng ta sẽ sử dụng MetaMask cho ví dụ này vì đây là những gì chúng ta đã sử dụng trong hai phần trước.

Như một điều kiện tiên quyết, bạn đã phải cài đặt MetaMask, có thể là tiện ích mở rộng trình duyệt hoặc ứng dụng di động, và nó phải bao gồm tài khoản mà bạn đã đúc NFT của mình. Bạn có thể tải MetaMask miễn phí từ [trang tải xuống MetaMask](https://metamask.io/download).

## Bước 1: Đặt mạng lưới của bạn thành Sepolia {#set-network-to-sepolia}

Vì NFT của chúng ta đã được đúc trên mạng thử nghiệm Sepolia, bạn sẽ muốn chọn Sepolia làm mạng lưới của mình. MetaMask ẩn các mạng thử nghiệm theo mặc định, vì vậy trước tiên hãy bật chúng lên:

1. Mở menu ở góc trên cùng bên phải và chọn "Networks" (Mạng lưới).
2. Cuộn xuống cuối danh sách mạng lưới và bật "Show test networks" (Hiển thị mạng thử nghiệm).
3. Chọn "Sepolia" từ danh sách mạng lưới.

Xem [hướng dẫn của MetaMask về cách xem các mạng thử nghiệm](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) nếu các menu trông khác trong phiên bản MetaMask của bạn.

## Bước 2: Thêm vật phẩm sưu tầm của bạn vào MetaMask {#add-nft-to-metamask}

MetaMask chỉ tự động phát hiện NFT trên một số mạng lưới, không bao gồm Sepolia, vì vậy bạn sẽ cần nhập NFT của mình theo cách thủ công. Để làm điều đó, bạn cần địa chỉ hợp đồng thông minh NFT và ID token ERC-721 của NFT của bạn — những thông tin này bạn có thể tìm thấy trên Etherscan dựa trên mã băm giao dịch từ NFT mà bạn đã đúc trong Phần II của hướng dẫn của chúng tôi. Nếu bạn đã sử dụng hợp đồng từ Phần 1, NFT đầu tiên của bạn có ID token là 1.

![Cách tìm mã băm giao dịch và ID token ERC-721 của bạn](./findNFTEtherscan.png)

Sau đó, trong MetaMask (tiện ích mở rộng hoặc thiết bị di động):

1. Đi tới phần "NFTs" trên màn hình chính và chọn "Import NFT" (Nhập NFT).
2. Chọn Sepolia làm mạng lưới và dán địa chỉ hợp đồng thông minh NFT của bạn vào ô "Address" (Địa chỉ).
3. Nhập ID token của bạn vào ô "Token ID" và chọn "Import" (Nhập).

Bạn có thể cần làm mới vài lần để xem NFT của mình — nhưng nó sẽ ở đó <Emoji text="😄" size={1} />! Nếu MetaMask thông báo bạn không phải là chủ sở hữu của NFT, hãy kiểm tra xem bạn đã chọn đúng tài khoản mà bạn đã đúc NFT vào chưa. Để được trợ giúp thêm, hãy xem [hướng dẫn của MetaMask về NFT](https://support.metamask.io/manage-crypto/nfts/nft-tokens-in-your-metamask-wallet/).

Chúc mừng! Bạn đã đúc thành công một NFT và bây giờ bạn có thể xem nó! Chúng tôi rất nóng lòng muốn xem cách bạn sẽ làm khuynh đảo thế giới NFT!
