---
title: تراکنش‌ها
description: مروری بر تراکنش‌های اتریوم - نحوه‌ی کارکرد، ساختار داده‌های آن‌ها و نحوه ارسالشان از طریق برنامه‌ی کاربردی.
lang: fa
sidebar: true
---

تراکنش‌ها شامل دستورالعمل‌هایی از حساب‌ها هستند که به صورت رمزنگاری‌شده امضا شده‌اند. یک حساب برای به‌روزرسانی وضعیت شبکه اتریوم، تراکنشی را آغاز می‌کند. ساده‌ترین تراکنش، انتقال اتر از یک حساب به حساب دیگر است.

## پیش‌نیازها {#prerequisites}

برای کمک به فهمیدن این صفحه، بهتر است [حساب های کاربری](/developers/docs/accounts/) و [مقدمه‌ای بر اتریوم](/developers/docs/intro-to-ethereum/) را مطالعه کنید.

## تراکنش چیست؟ {#whats-a-transaction}

تراکنش اتریوم به اقدامی اشاره دارد که توسط یک حساب تحت مالکیت خارجی آغاز می‌شود، به عبارت دیگر حسابی که توسط یک انسان مدیریت می‌شود، نه یک قرارداد. به‌عنوان مثال، اگر باب به آلیس 1 اتر ارسال کند، حساب باب باید بدهکار شود و حساب آلیس باید بستانکار شود. این عمل تغییر وضعیت توسط یک تراکنش صورت می‌گیرد.

![شکلی نشان‌دهنده‌ی یک تراکنش که باعث تغییر وضعیت می‌شود](./tx.png) _نمودار برگرفته از [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

تراکنش‌هایی که وضعیت EVM را تغییر می‌دهند، باید در کل شبکه پخش شوند. Any node can broadcast a request for a transaction to be executed on the EVM; after this happens, a validator will execute the transaction and propagate the resulting state change to the rest of the network.

Transactions require a fee and must be included in a validated block. To make this overview simpler we'll cover gas fees and validation elsewhere.

تراکنش ارسالی شامل اطلاعات زیر است:

- `recipient` - آدرس دریافت‌کننده (اگر یک حساب با مالکیت خارجی باشد، تراکنش یک ارزش را منتقل می‌کند. اگر یک حساب قرارداد باشد، تراکنش کد قرارداد را اجرا می‌کند)
- `signature` - شناسه‌ی فرستنده. زمانی ایجاد می‌شود که کلید خصوصی فرستنده تراکنش را امضا کند و تأیید کند که فرستنده این تراکنش را مجاز کرده است
- `nonce` - a sequencially incrementing counter which indicate the transaction number from the account
- `value` - مقدار اتر برای انتقال از فرستنده به گیرنده (به WEI، واحد خردی از اتر)
- `data` - فیلد اختیاری برای گنجاندن داده‌های دلخواه
- `gasLimit` - حداکثر مقدار واحدهای گازی که می‌تواند توسط تراکنش مصرف شود. واحدهای گاز مراحل محاسباتی را نشان می‌دهند
- `maxPriorityFeePerGas` - the maximum amount of gas to be included as a tip to the validator
- `maxFeePerGas` - حداکثر مقدار گازی که مایل به پرداخت برای تراکنش است (شامل `baseFeePerGas` و `maxPriorityFeePerGas`)

Gas is a reference to the computation required to process the transaction by a validator. کاربران برای این محاسبه باید هزینه‌ای بپردازند. The `gasLimit`, and `maxPriorityFeePerGas` determine the maximum transaction fee paid to the validator. [درباره‌ی گاز بیشتر بدانید](/developers/docs/gas/).

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

### فیلد داده‌ها {#the-data-field}

اکثریت قریب‌به‌اتفاق تراکنش‌ها از طریق یک حساب دارای مالکیت خارجی به یک قرارداد دسترسی دارند. اکثر قراردادها در Solidity نوشته شده‌اند و فیلد داده‌های آن‌ها را مطابق با [رابط باینری برنامه (ABI)](/glossary/#abi) تفسیر می‌کنند.

چهار بایت اول با استفاده از هش نام تابع و آرگومان‌ها مشخص می‌کند که کدام تابع را فراخوانی کند. گاهی اوقات می‌توانید تابع را از انتخابگر با استفاده از [این پایگاه داده](https://www.4byte.directory/signatures/) شناسایی کنید.

بقیه فراخوان‌داده‌ها (calldata) آرگومان هستند، که [مطابق با مشخصات ABI مشخص شده‌اند](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

برای مثال، بیایید به [این تراکنش](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1) نگاه کنیم. از **برای مشاهده‌ی بیشتر کلیک کنید** برای دیدن فراخوان‌داده‌ها استفاده کنید.

انتخابگر تابع `0xa9059cbb` است. چندین [تابع شناخته‌شده با این امضا وجود دارد](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb). در این مورد [کد منبع قرارداد](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code) در Etherscan آپلود شده است، بنابراین می‌دانیم که این تابع `transfer(address, uint256)` است.

بقیه داده‌ها عبارتند از:

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

با توجه به مشخصات ABI، مقادیر صحیح (مانند آدرس‌ها که اعداد صحیح 20 بایتی هستند) در ABI به صورت کلمات 32 بایتی ظاهر می‌شوند که ممکن است یک یا چند صفر در ابتدای آن‌ها قرار داده شود. بنابراین ما می‌دانیم که آدرس `«to»‏`
` 4f6742badb049791cd9a302791cd9a302791cd99a32791cd99a310.com است. <code>مقدار``0 `x3b0559f4 = 990206452 است.

## انواع تراکنش‌ها {#types-of-transactions}

در اتریوم چند نوع تراکنش مختلف وجود دارد:

- تراکنش های منظم: تراکنش از یک حساب به حساب دیگر.
- تراکنش‌های استقرار قرارداد: تراکنش بدون آدرس «to»، که در آن از فیلد داده‌ها برای کد قرارداد استفاده می‌شود.
- اجرای قرارداد: تراکنشی که با یک قرارداد هوشمند مستقر تعامل دارد. در این مورد، آدرس «to»، آدرس قرارداد هوشمند است.

### درباره‌ی گاز {#on-gas}

همان‌طور که گفته شد، انجام تراکنش‌ها [گاز](/developers/docs/gas/) مصرف می‌کند. تراکنش‌های انتقال ساده به 21000 واحد گاز نیاز دارند.

بنابراین برای اینکه باب 1 اتر را به آلیس با `baseFeePerGas` به میزان 190 gwei و `maxPriorityFeePerGas` به میزان 10 gwei ارسال کند، باب باید هزینه‌ی زیر را بپردازد:

```
(190 + 10) * 21000 = 4,200,000 gwei
--یا--
0.0042 اتر
```

حساب باب **1.0042- اتر** بدهکار خواهد شد

به حساب آلیس **1.0+ اتر** بستانکار خواهد شد

کارمزد پایه **0.00399- اتر** خواهد شد

Validator keeps the tip **+0.000210 ETH**

گاز برای هر تعامل قرارداد هوشمند نیز لازم است.

![شکلی نشان‌دهنده‌ی نحوه‌ی بازپرداخت گاز مصرف‌نشده](./gas-tx.png) _نمودار برگرفته از [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

هر گازی که در تراکنش استفاده نشده باشد به حساب کاربری مسترد می‌شود.

## چرخه‌ی حیات تراکنش {#transaction-lifecycle}

هنگامی که تراکنش ارسال شد، موارد زیر اتفاق می‌افتد:

1. وقتی یک تراکنش را ارسال می‌کنید، رمزنگاری یک هش تراکنش ایجاد می‌کند: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`

2. تراکنش سپس به شبکه پخش می‌شود و در یک استخر با بسیاری از تراکنش‌های دیگر گنجانده می‌شود.

3. A validator must pick your transaction and include it in a block in order to verify the transaction and consider it "successful".
4. As time passes the block containing your transaction will be upgraded to "justified" then "finalized". These upgrades make it much more certain that your transaction was successful and will never be altered. Once a block is "finalized" it could only ever be changed by an attack that would cost many billions of dollars.

## یک نسخه‌ی آزمایشی تصویری {#a-visual-demo}

آستین را تماشا کنید که شما را درباره‌ی تراکنش‌ها، گاز و استخراج راهنمایی می‌کند.

<YouTube id="er-0ihqFQB0" />

## پاکت تراکنش تایپ‌شده {#typed-transaction-envelope}

اتریوم در ابتدا یک قالب برای تراکنش‌ها داشت. هر تراکنش حاوی نانس (nonce)، قیمت گاز، حد گاز، آدرس گیرنده، مقدار، داده، v، r و s بود. این فیلدها به صورت RLP کدگذاری شده‌اند و چیزی شبیه به این هستند:

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

اتریوم به گونه‌ای تکامل یافته است که از چندین نوع تراکنش پشتیبانی می‌کند تا پیاده‌سازی ویژگی‌های جدیدی مانند لیست‌های دسترسی و [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) را بدون تأثیر بر قالب‌های تراکنش قدیمی امکان‌پذیر سازد.

[EIP-2718: پاکت تراکنش تایپ‌شده](https://eips.ethereum.org/EIPS/eip-2718) نوعی از تراکنش را تعریف می‌کند که پوششی برای انواع تراکنش‌های آینده است.

EIP-2718 یک پاکت جدید تعمیم یافته برای تراکنش‌های تایپ‌شده است. در استاندارد جدید، تراکنش‌ها به صورت زیر تفسیر می‌شوند:

`نوع معامله || TransactionPayload`

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
