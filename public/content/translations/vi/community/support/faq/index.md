---
title: "Những câu hỏi thường gặp"
description: Common Ethereum questions about wallets, transactions, staking, and more.
lang: vi
---

# Những câu hỏi thường gặp {#faq}

## I sent crypto to the wrong address {#wrong-wallet}

Giao dịch ở trên Ethereum là không thể hoàn trả được. Unfortunately, if you sent ETH or tokens to the wrong wallet, there is no way to reverse the transaction.

**What you can do:**

- **If you know the owner of the address**, contact them directly and ask them to return the funds
- **If the address belongs to an exchange or known service**, contact their support team, as they may be able to help
- **If you sent tokens to a contract address**, check whether the contract has a withdrawal or recovery function (this is rare)

In most cases, there is no way to recover the funds. No central organization, entity, or person owns Ethereum, which means no one can reverse transactions. Always double-check the recipient address before confirming.

## I lost access to my wallet {#lost-wallet-access}

Your recovery options depend on the type of wallet you use.

### If you have your seed phrase (recovery phrase)

You can restore your wallet in any compatible wallet app using your seed phrase. This is why it is critical to keep your seed phrase stored safely offline. Check your wallet provider's documentation for restore instructions.

### If you have lost your seed phrase

Without your seed phrase or private keys, your funds cannot be recovered. No one, including ethereum.org, can reset your password or restore access to a self-custody wallet.

### If your account is on an exchange

If your account is on a centralized exchange like Coinbase, Binance, or Kraken, contact the exchange's support team directly. They control accounts on their platform and may be able to help with password resets or account recovery.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Never share your seed phrase with anyone** claiming to help you recover your wallet. This is one of the most common scam tactics. No legitimate service will ever ask for your seed phrase.
</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  How to use a wallet
</DocLink>

## My transaction is stuck or pending {#stuck-transaction}

Transactions on Ethereum can get stuck when the gas fee you set was lower than what the network currently requires. Most wallets let you fix this:

- **Speed up:** Resubmit the same transaction with a higher gas fee
- **Cancel:** Send a 0 ETH transaction to your own address using the same nonce as the pending transaction

### Helpful guides

- [How to speed up or cancel a pending transaction on MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Cách hủy các giao dịch Ethereum đang chờ xử lý](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Làm sao tôi có thể nhận phần thưởng tại các sự kiện cho / tặng Ethereum? Lừa đảo tặng phẩm {#giveaway-scam}

Các sự kiện cho / tặng Ethereum là các trò lừa đảo được thiết kế để đánh cắp ETH của bạn. Do not be tempted by offers that seem too good to be true. If you send ETH to a giveaway address, you will not receive a giveaway, and you will not be able to recover your funds.

[Thông tin thêm về phòng chống lừa đảo](/security/#common-scams)

## How do I stake ETH? {#how-to-stake}

Để trở thành một người vận hành nút xác thực, bạn phải Stake 32 ETH trong hợp đồng Ethereum và thiết lập một nút xác thực. You can also participate with less ETH through staking pools.

More information is available on our [staking pages](/staking/) and at [the staking launchpad](https://launchpad.ethereum.org/).

## Làm sao để tôi đào Ethereum? Đào Ethereum {#mining-ethereum}

Việc đào Ethereum không còn khả thi nữa. Mining was switched off when Ethereum moved from [proof-of-work](/glossary/#pow) to [proof-of-stake](/glossary/#pos) during [The Merge](/roadmap/merge/) in September 2022. Giờ đây, thay vì thợ đào, Ethereum có các nút xác thực (validators). Bất kỳ ai cũng có thể [đặt cược](/glossary/#staking) ETH và nhận phần thưởng staking khi chạy phần mềm trình xác thực để bảo mật mạng lưới.
