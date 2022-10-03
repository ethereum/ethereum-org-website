---
title: تراکنش‌ها
description: مروری بر تراکنش‌های اتریوم - نحوه‌ی کارکرد، ساختار داده‌های آن‌ها و نحوه ارسالشان از طریق برنامه‌ی کاربردی.
lang: fa
---

تراکنش‌ها شامل دستورالعمل‌هایی از حساب‌ها هستند که به صورت رمزنگاری‌شده امضا شده‌اند. یک حساب برای به‌روزرسانی وضعیت شبکه اتریوم، تراکنشی را آغاز می‌کند. ساده‌ترین تراکنش، انتقال اتر از یک حساب به حساب دیگر است.

## پیش‌نیازها {#prerequisites}

برای کمک به فهمیدن این صفحه، بهتر است [حساب های کاربری](/developers/docs/accounts/) و [مقدمه‌ای بر اتریوم](/developers/docs/intro-to-ethereum/) را مطالعه کنید.

## تراکنش چیست؟ {#whats-a-transaction}

تراکنش اتریوم به اقدامی اشاره دارد که توسط یک حساب تحت مالکیت خارجی آغاز می‌شود، به عبارت دیگر حسابی که توسط یک انسان مدیریت می‌شود، نه یک قرارداد. به‌عنوان مثال، اگر باب به آلیس 1 اتر ارسال کند، حساب باب باید بدهکار شود و حساب آلیس باید بستانکار شود. این عمل تغییر وضعیت توسط یک تراکنش صورت می‌گیرد.

![شکلی نشان‌دهنده‌ی یک تراکنش که باعث تغییر وضعیت می‌شود](./tx.png) _نمودار برگرفته از [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

تراکنش‌هایی که وضعیت EVM را تغییر می‌دهند، باید در کل شبکه پخش شوند. هر گره‌ای می‌تواند درخواستی برای اجرای تراکنش در EVM ارسال کند. پس از این اتفاق، یک استخراج‌گر تراکنش را اجرا می‌کند و تغییر حالت حاصل را به بقیه‌ی شبکه پخش می‌کند.

تراکنش‌ها نیاز به کارمزد دارند و برای معتبر شدن باید استخراج شوند. برای ساده‌تر کردن این نمای کلی، کارمزدهای گاز و استخراج را در جای دیگری پوشش خواهیم داد.

تراکنش ارسالی شامل اطلاعات زیر است:

- `recipient` - آدرس دریافت‌کننده (اگر یک حساب با مالکیت خارجی باشد، تراکنش یک ارزش را منتقل می‌کند. اگر یک حساب قرارداد باشد، تراکنش کد قرارداد را اجرا می‌کند)
- `signature` - شناسه‌ی فرستنده. زمانی ایجاد می‌شود که کلید خصوصی فرستنده تراکنش را امضا کند و تأیید کند که فرستنده این تراکنش را مجاز کرده است
- `value` - مقدار اتر برای انتقال از فرستنده به گیرنده (به WEI، واحد خردی از اتر)
- `data` - فیلد اختیاری برای گنجاندن داده‌های دلخواه
- `gasLimit` - حداکثر مقدار واحدهای گازی که می‌تواند توسط تراکنش مصرف شود. واحدهای گاز مراحل محاسباتی را نشان می‌دهند
- `maxPriorityFeePerGas` - حداکثر مقدار گازی که باید به‌عنوان پاداش برای استخراج‌گر لحاظ شود
- `maxFeePerGas` - حداکثر مقدار گازی که مایل به پرداخت برای تراکنش است (شامل `baseFeePerGas` و `maxPriorityFeePerGas`)

گاز به محاسباتی اشاره می‌کند که برای پردازش تراکنش توسط یک استخراج‌گر لازم است. کاربران برای این محاسبه باید هزینه‌ای بپردازند. `gasLimit` و `maxPriorityFeePerGas` حداکثر کارمزد تراکنش پرداختی به استخراج‌گر را تعیین می‌کنند. [درباره‌ی گاز بیشتر بدانید](/developers/docs/gas/).

شی‌ء تراکنش کمی شبیه به این خواهد بود:

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

اما یک شیء تراکنش باید با استفاده از کلید خصوصی فرستنده امضا شود. این کار ثابت می‌کند که تراکنش فقط می‌تواند از طرف فرستنده انجام شود و به صورت تقلبی ارسال نشده است.

یک کلاینت اتریوم مانند Geth این فرایند امضا را انجام می‌دهد.

نمونه‌ی فراخوانی [JSON-RPC](https://eth.wiki/json-rpc/API):

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

نمونه‌ی پاسخ:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` تراکنش امضاشده به شکل رمزگذاری‌شده با پیشوند طول بازگشتی (RLP) است
- `tx` تراکنش امضاشده به شکل JSON است

با هش امضا، می‌توان به صورت رمزنگاری ثابت کرد که تراکنش از فرستنده آمده و به شبکه ارسال شده است.

### The data field {#the-data-field}

The vast majority of transactions access a contract from an externally-owned account. Most contracts are written in Solidity and interpret their data field in accordance with the [application binary interface (ABI)](/glossary/#abi).

The first four bytes specify which function to call, using the hash of the function's name and arguments. You can sometimes identify the function from the selector using [this database](https://www.4byte.directory/signatures/).

The rest of the calldata is the arguments, [encoded as specified in the ABI specs](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

For example, lets look at [this transaction](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1). Use **Click to see More** to see the calldata.

The function selector is `0xa9059cbb`. There are several [known functions with this signature](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). In this case [the contract source code](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) has been uploaded to Etherscan, so we know the function is `transfer(address,uint256)`.

The rest of the data is:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

According to the ABI specifications, integer values (such as addresses, which are 20-byte integers) appear in the ABI as 32-byte words, padded with zeros in the front. So we know that the `to` address is [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279). The `value` is 0x3b0559f4 = 990206452.

## انواع تراکنش‌ها {#types-of-transactions}

در اتریوم چند نوع مختلف تراکنش وجود دارد:

- تراکنش‌های منظم: تراکنش از یک کیف پول به کیف پولی دیگر.
- تراکنش‌های استقرار قرارداد: تراکنش بدون آدرس «to»، که در آن از فیلد داده‌ها برای کد قرارداد استفاده می‌شود.
- Execution of a contract: a transaction that interacts with a deployed smart contract. In this case, 'to' address is the smart contract address.

### درباره‌ی گاز {#on-gas}

همان‌طور که گفته شد، انجام تراکنش‌ها [گاز](/developers/docs/gas/) مصرف می‌کند. تراکنش‌های انتقال ساده به 21000 واحد گاز نیاز دارند.

بنابراین برای اینکه باب 1 اتر را به آلیس با `baseFeePerGas` 190 gwei و `maxPriorityFeePerGas` 10 gwei ارسال کند، باب باید هزینه‌ی زیر را بپردازد:

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

حساب باب **1.0042- اتر** بدهکار خواهد شد

به حساب آلیس **1.0+ اتر** بستانکار خواهد شد

کارمزد پایه **0.00399- اتر** خواهد شد

استخراج‌گر **0.000210+ اتر** را نگه می‌دارد

گاز برای هر تعامل قرارداد هوشمند نیز لازم است.

![شکلی نشان‌دهنده‌ی نحوه‌ی بازپرداخت گاز مصرف‌نشده](./gas-tx.png) _نمودار برگرفته از [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

هر گازی که در تراکنش استفاده نشده باشد به حساب کاربری مسترد می‌شود.

## چرخه‌ی حیات تراکنش {#transaction-lifecycle}

هنگامی که تراکنش ارسال شد، موارد زیر اتفاق می‌افتد:

1. وقتی یک تراکنش را ارسال می‌کنید، رمزنگاری یک هش تراکنش ایجاد می‌کند: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. تراکنش سپس به شبکه پخش می‌شود و در یک استخر با بسیاری از تراکنش‌های دیگر گنجانده می‌شود.
3. یک استخراج‌گر باید تراکنش شما را انتخاب کند و آن را در یک بلوک قرار دهد تا تراکنش را تأیید کند و آن را «موفق» در نظر بگیرد.
   - اگر شبکه مشغول باشد و استخراج‌گرها قادر به ادامه دادن نباشند، ممکن است در این مرحله منتظر بمانید.
4. تراکنش شما «تأییدات» را دریافت خواهد کرد. تعداد تأییدیه‌ها برابر با تعداد بلوک‌های ایجاد شده از زمان بلوکی است که شامل تراکنش شما می‌شود. هرچه این عدد بیشتر باشد، نشان دهنده‌ی اطمینان بیشتر از پردازش و شناسایی تراکنش توسط شبکه خواهد بود.
   - بلوک‌های اخیر ممکن است دوباره سازماندهی شوند و این تصور را ایجاد کنند که تراکنش ناموفق بوده است. با این حال، تراکنش ممکن است همچنان معتبر باشد اما در بلوک دیگری گنجانده شود.
   - احتمال سازماندهی مجدد با استخراج هر بلوک بعدی کاهش می‌یابد، یعنی هر چه تعداد تأییدات بیشتر باشد، تراکنش تغییرناپذیرتر است.

## یک نسخه‌ی آزمایشی تصویری {#a-visual-demo}

آستین را تماشا کنید که شما را درباره‌ی تراکنش‌ها، گاز و استخراج راهنمایی می‌کند.

<YouTube id="er-0ihqFQB0" />

## پاکت تراکنش تایپ‌شده {#typed-transaction-envelope}

اتریوم در ابتدا یک قالب برای تراکنش‌ها داشت. هر تراکنش حاوی نانش (nonce)، قیمت گاز، حد گاز، آدرس گیرنده، مقدار، داده، v، r و s بود. این فیلدها به صورت RLP کدگذاری شده‌اند و چیزی شبیه به این هستند:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

اتریوم به گونه‌ای تکامل یافته است که از چندین نوع تراکنش پشتیبانی می‌کند تا پیاده‌سازی ویژگی‌های جدیدی مانند لیست‌های دسترسی و [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) را بدون تأثیر بر قالب‌های تراکنش قدیمی امکان‌پذیر سازد.

[EIP-2718: پاکت تراکنش تایپ‌شده](https://eips.ethereum.org/EIPS/eip-2718) نوعی از تراکنش را تعریف می‌کند که پوششی برای انواع تراکنش‌های آینده است.

EIP-2718 یک پاکت جدید تعمیم یافته برای تراکنش‌های تایپ‌شده است. در استاندارد جدید، تراکنش‌ها به صورت زیر تفسیر می‌شوند:

`TransactionType || TransactionPayload`

که در آن فیلدها به صورت زیر تعریف می‌شوند:

- `TransactionType` - عددی بین 0 و 0x7f، برای مجموع 128 نوع تراکنش ممکن.
- `TransactionPayload` - یک آرایه‌ی بایت دلخواه که توسط نوع تراکنش تعریف شده است.

## بیشتر بخوانید {#further-reading}

- [EIP-2718: پاکت تراکنش تایپ‌شده](https://eips.ethereum.org/EIPS/eip-2718)

_آیا منبعی اجتماعی می‌شناسید که به شما کمک کرده باشد؟ این صفحه را ویرایش کنید و آن را اضافه کنید!_

## موضوعات مرتبط {#related-topics}

- [حساب‌ها](/developers/docs/accounts/)
- [ماشین مجازی اتریوم (EVM)](/developers/docs/evm/)
- [گاز](/developers/docs/gas/)
- [استخراج](/developers/docs/consensus-mechanisms/pow/mining/)
