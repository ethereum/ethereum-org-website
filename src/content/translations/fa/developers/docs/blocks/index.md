---
title: بلوک‌ها
description: یک بررسی اجمالی از بلوک‌ها در زنجیره‌ی بلوکی اتریوم - ساختار داده‌های آن، چرا مورد نیاز هستند و چگونه ساخته می‌شوند.
lang: fa
sidebar: true
---

بلوک‌ها دسته‌هایی از تراکنش با یک هش به بلوک قبلی خود در زنجیره هستند. این کار بلوک‌ها را (در یک زنجیره) به هم متصل می‌کند، چون هش‌ها به‌صورت رمزنگاری‌شده از داده‌های بلوک‌ها به دست می‌آیند. این کار همچنین از تقلب جلوگیری می‌کند، چرا که یک تغییر کوچک در هر بلوکی در تاریخچه تمام بلوک‌های بعدی را از اعتبار خواهد انداخت چرا که تمام هش‌های متعاقب تغییر خواهند کرد و هر کسی که زنجیره‌ی بلوکی را اجرا می‌کند متوجه خواهد شد.

## پیش‌نیازها {#prerequisites}

فهم بلوک‌ها موضوعی ساده برای افراد مبتدی است. اما برای کمک به فهمیدن این صفحه، بهتر است [حساب‌ها](/developers/docs/accounts/) ،[تراکنش‌ها](/developers/docs/transactions/) و [مقدمه‌ای بر اتریوم](/developers/docs/intro-to-ethereum/) را مطالعه کنید.

## چرا بلوک‌ها؟ {#why-blocks}

برای اطمینان از این که تمام افرادی که در شبکه‌ی اتریوم مشارکت دارند در یک وضعیت مشترک هستند و بر یک تاریخچه‌ی مشترک از تراکنش‌های توافق دارند، ما تراکنش‌ها را به بلوک‌ها دسته‌بندی می‌کنیم. This means dozens (or hundreds) of transactions are committed, agreed on, and synchronized all at once.

![یک نمودار که تراکنش‌های یک بلوک که باعث تغییر وضعیت می‌شوند را نشان می‌دهد](./tx-block.png) _نمودار برگرفته از [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

By spacing out commits, we give all network participants enough time to come to consensus: even though transaction requests occur dozens of times per second, blocks are only created and committed on Ethereum once every twelve seconds.

## بلوک‌ها چگونه کار می‌کنند {#how-blocks-work}

برای حفظ تاریخچه‌ی تراکنش‌ها، بلوک‌ها ترتیب کاملاً مشخصی دارند‌ (هر بلوک جدیدی که ساخته می‌شود شامل یک ارجاع به بلوک والد خود است)، و تراکنش‌های درون هر بلوک هم ترتیب کاملاً مشخصی دارند. جز در موارد نادر، همواره همه‌ی مشارکت‌کنندگان شبکه بر سر تعداد دقیق و تاریخچه‌ی بلوک‌ها توافق دارند و در حال کار بر روی درخواست‌های تراکنش در حال انجام فعلی برای بلوک بعدی هستند.

Once a block is put together by some validator on the network, it is propagated to the rest of the network; all nodes add this block to the end of their blockchain, and a new validator is selected to create the next block. The exact block-assembly process and commitment/consensus process is currently specified by Ethereum’s “proof-of-stake” protocol.

## Proof-of-stake protocol {#proof-of-work-protocol}

Proof-of-stake means the following:

- Validating nodes have to stake 32 ETH into a deposit contract as collateral against bad behavior. This helps protect the network because provably dishonest activity leads to some or all of that stake being destroyed.
- In every slot (spaced twelve seconds apart) a validator is randomly selected to be the block proposer. They bundle transactions together, execute them and determine a new 'state'. They wrap this information into a block and pass it around to other validators.
- Other validators who hear about a new block re-execute the transactions to ensure they agree with the proposed change to the global state. Assuming the block is valid they add it to their own database.
- If a validator hears about two conflicting blocks for the same slot they use their fork-choice algorithm to pick the one supported by the most staked ETH.

[اطلاعات بیشتر درباره‌ی اثبات سهام](/developers/docs/consensus-mechanisms/pos)

## چه چیزی در یک بلوک است؟ {#block-anatomy}

There is a lot of information contained within a block. At the highest level a block contains the following fields:

```
slot: the slot the block belongs to
proposer_index: the ID of the validator proposing the block
parent_root: the hash of the preceding block
state_root: the root hash of the state object
body: an object containing several fields, as defined below
```

The block `body` contains several fields of its own:

```
randao_reveal: a value used to select the next block proposer
eth1_data: information about the deposit contract
graffiti: arbitrary data used to tag blocks
proposer_slashings: list of validators to be slashed
attester_slashings: list of validators to be slashed
attestations: list of attestations in favor of the current block
deposits: list of new deposits to the deposit contract
voluntary_exits: list of validators exiting the network
sync_aggregate: subset of validators used to serve light clients
execution_payload: transactions passed from the execution client
```

The `attestations` field contains a list of all the attestations in the block. Attestations have their own data type that contains several pieces of data. Each attestation contains:

```
aggregation_bits: a list of which validators participated in this attestation
data: a container with multiple subfields
signature: aggregate signature of all attesting validators
```

The `data` field in the `attestation` contains the following:

```
slot: the slot the attestation relates to
index: indices for attesting validators
beacon_block_root: the root hash of the Beacon block containing this object
source: the last justified checkpoint
target: the latest epoch boundary block
```

Executing the transactions in the `execution_payload` updates the global state. All clients re-execute the transactions in the `execution_payload` to ensure the new state matches that in the new block `state_root` field. This is how clients can tell that a new block is valid and safe to add to their blockchain. The `execution payload` itself is an object with several fields. There is also an `execution_payload_header` that contains important summary information about the execution data. These data structures are organized as follows:

The `execution_payload_header` contains the following fields:

```
parent_hash: hash of the parent block
fee_recipient: account address for paying transaction fees to
state_root: root hash for the global state after applying changes in this block
receipts_root: hash of the transaction receipts trie
logs_bloom: data structure containign event logs
prev_randao: value used in random validator selection
block_number: the number of the current block
gas_limit: maximum gas allowed in this block
gas_used: the actual amount of gas used in this block
timestamp: the block time
extra_data: arbitrary additional data as raw bytes
base_fee_per_gas: the base fee value
block_hash: Hash of execution block
transactions_root: root hash of the transactions in the payload
```

The `execution_payload` itself contains the following (notice this is idential to the header except that instead of the root hash of the transactions it includes the actual list of transactions:

```
parent_hash: hash of the parent block
fee_recipient: account address for paying transaction fees to
state_root: root hash for the global state after applying changes in this block
receipts_root: hash of the transaction receipts trie
logs_bloom: data structure containign event logs
prev_randao: value used in random validator selection
block_number: the number of the current block
gas_limit: maximum gas allowed in this block
gas_used: the actual amount of gas used in this block
timestamp: the block time
extra_data: arbitrary additional data as raw bytes
base_fee_per_gas: the base fee value
block_hash: Hash of execution block
transactions: list of transactions to be executed
```

## زمان بلوک {#block-time}

Block time refers to the time separating blocks. In Ethereum, time is divided up into twelve second units called 'slots'. In each slot a single validator is selected to propose a block. Assuming all validators are online and fully functional there will be a block in every slot, meaning the block time is 12s. However, occasionally validators might be offline when called to propose a block, meaning slots can sometimes go empty. This is different to proof-of-work based systems where block times are probabilistic and tuned by the mining difficulty.

## اندازه‌ی بلوک {#block-size}

یک نکته‌ی مهم نهایی این است که بلوک‌ها از نظر اندازه محدود هستند. هر بلوک اندازه‌ی هدفی به میزان 15 میلیون گاز دارد، اما اندازه‌ی بلوک‌ها می‌تواند بسته به تقاضای شبکه‌ بیشتر یا کمتر شود و بیشترین حد آن 30 میلیون گاز است (2 برابر اندازه‌ی هدف بلوک). مجموع کل گاز خرج‌شده توسط تراکنش‌ها در یک بلوک باید کمتر از حد گاز بلوک باشد. این نکته‌ی مهمی است، چون نشان می‌دهد یک بلوک نمی‌تواند به‌اندازه‌ی دلخواه بزرگ باشد. اگر بلوک‌ها بتوانند به اندازه‌ی دلخواه بزرگ باشند، آن‌گاه گره‌های کاملی که اندکی قدرت کمتری دارند با توجه به سرعت و فضای مورد نیاز نمی‌توانند با شبکه پیش بیایند. The larger the block, the greater the computing power required to process them in time for the next slot. This is a centralizing force, which is resisted by capping block sizes.

## بیشتر بدانید {#further-reading}

_آیا منبعی اجتماعی می‌شناسید که به شما کمک کرده باشد؟ این صفحه را ویرایش کنید و به آن اضافه کنید!_

## موضوعات مرتبط {#related-topics}

- [تراکنش‌ها](/developers/docs/transactions/)
- [گاز](/developers/docs/gas/)
- [اثبات سهام](/developers/docs/consensus-mechanisms/pos)
