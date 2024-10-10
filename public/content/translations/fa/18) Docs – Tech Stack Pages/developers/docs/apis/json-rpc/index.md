---
title: وب سرویس JSON-RPC
description: یک پروتکل فراخوانی روش از راه دور (RPC) بدون حالت و سبک وزن برای کلاینت های اتریوم.
lang: fa
---

برای اینکه یک برنامه نرم افزاری با زنجیره بلوکی اتریوم تعامل داشته باشد (با خواندن داده های زنجیره بلوکی و/یا ارسال تراکنش ها به شبکه)، باید به یک گره (نود) اتریوم متصل شود.

برای این منظور، هر [کلاینت اتریوم](/developers/docs/nodes-and-clients/#execution-clients) یک [مشخصات JSON-RPC](https://github.com/ethereum/execution-apis) را پیاده‌سازی می‌کند، بنابراین مجموعه یکنواختی از روش‌ها وجود دارد که برنامه‌ها می‌توانند بدون توجه به اجرای گره یا کلاینت خاص به آن تکیه کنند.

JSON-RPC یک پروتکل فراخوانی روش راه دور (RPC) سبک وزن و بدون حالت است. در درجه اول مشخصات، چندین ساختار داده و قوانین پیرامون پردازش آنها را تعریف می کند. در این مبحث مهم نیسب که با چه روشی داده‌ها را انتقال داد، از طریق همان فرایند، ار طریق سوکت‌ها، بر روی HTTP یا در بسیاری از محیط‌های مختلف ارسال پیام. از JSON (RFC 4627) به عنوان فرمت داده استفاده می کند.

## پیاده‌سازی کلاینت {#client-implementations}

کلاینت های اتریوم هر کدام ممکن است از زبان های برنامه نویسی متفاوتی در هنگام اجرای مشخصات JSON-RPC استفاده کنند. برای جزئیات بیشتر مربوط به زبان های برنامه نویسی خاص، [مستندات کلاینت](/developers/docs/nodes-and-clients/#execution-clients) را مشاهده کنید. توصیه می‌کنیم اسناد مربوط به هر کلاینت را برای آخرین اطلاعات پشتیبانی وب سرویس بررسی کنید.

## کتابخانه های تسهیل کننده {#convenience-libraries}

در حالی که می‌توانید مستقیماً از طریق JSON-RPC API با کلاینت اتریوم تعامل داشته باشید، اغلب گزینه‌های ساده‌تری برای توسعه‌دهندگان dapp وجود دارد. [جاوا اسکریپت](/developers/docs/apis/javascript/#available-libraries) و کتابخانه های [وب سرویس بک اند](/developers/docs/apis/backend/#available-libraries) بسیاری به منظور ارائه wrapper هایی بر روی وب سرویس JSON-RPC وجود دارد. با استفاده از این کتابخانه‌ها، توسعه‌دهندگان می‌توانند روش‌های بصری و تک خطی را در زبان برنامه‌نویسی انتخابی خود بنویسند تا درخواست‌های JSON-RPC (تحت سرپوش) را که با اتریوم تعامل دارند، تنظیم کنند.

## APIهای لایه اجماع {#consensus-clients}

این صفحه عمدتاً با JSON-RPC API مورد استفاده توسط کلاینت های اجرا در اتریوم سروکار دارد. با این حال، کلاینت های اجماع یک API RPC نیز دارند که به کاربران اجازه می‌دهد اطلاعات مربوط به گره، بلوک‌های بیکن، حالت بیکن و سایر اطلاعات مربوط به اجماع را مستقیماً از یک گره جستجو کنند. این API در [صفحه وب بیکن API](https://ethereum.github.io/beacon-APIs/#/) مستند شده است.

یک API داخلی نیز برای ارتباط بین کلاینت در یک گره استفاده می‌شود - یعنی کلاینت اجماع و کلاینت اجرا را قادر می‌سازد تا داده‌ها را مبادله کنند. این "Engine API" نامیده می شود و مشخصات آن در [گیت‌هاب](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) موجود است.

## مشخصات کلاینت اجرا {#spec}

[مشخصات کامل JSON-RPC API را در گیت‌هاب بخوانید](https://github.com/ethereum/execution-apis). این API در [صفحه وب Execution API](https://ethereum.github.io/execution-apis/api-documentation/) مستند شده است و شامل یک بازرس برای آزمایش همه روش‌های موجود است.

## کنوانسیون‌ها {#conventions}

### رمزگذاری مقدار هگز {#hex-encoding}

دو نوع داده کلیدی از JSON منتقل می شوند: آرایه های بایت فرمت نشده و مقادیر. هر دو با یک رمزگذاری هگز ارسال می شوند اما با الزامات مختلف برای قالب بندی.

#### مقادیر {#quantities-encoding}

هنگام رمزگذاری مقادیر (اعداد صحیح، اعداد): رمزگذاری به صورت هگز، پیشوند با "0x"، فشرده ترین نمایش (استثنای جزئی: صفر باید به عنوان "0x0" نمایش داده شود).

در اینجا چند نمونه آورده شده است:

- 0x41 (65 در اعشار)
- 0x400 (1024 در اعشار)
- اشتباه: 0x (همیشه باید حداقل یک رقم داشته باشد - صفر همان "0x0" است)
- اشتباه: 0x0400 (صفرهای ابتدایی مجاز نیستند)
- اشتباه: ff (باید دارای پیشوند 0x باشد)

### دیتای فرمت نشده {#unformatted-data-encoding}

هنگام رمزگذاری داده های فرمت نشده (آرایه های بایت، آدرس های حساب، هش ها، آرایه های بایت کد): کدگذاری به صورت هگز، پیشوند با "0x"، دو رقم هگز در هر بایت.

در اینجا چند نمونه آورده شده است:

- 0x41 (اندازه 1، "A")
- 0x004200 (اندازه 3، "0B0")
- 0x (اندازه 0، "")
- اشتباه: 0xf0f0f (باید تعداد ارقام زوج باشد)
- اشتباه: 004200 (باید پیشوند 0x باشد)

### پارامتر بلوک پیش فرض {#default-block}

روش های زیر یک پارامتر بلوک پیش فرض اضافی دارند:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

هنگامی که درخواست هایی انجام می شود که بر روی وضعیت اتریوم عمل می کنند، آخرین پارامتر بلوک پیش فرض ارتفاع بلوک را تعیین می کند.

گزینه های زیر برای پارامتر defaultBlock امکان پذیر است:

- `رشته HEX` - یک عدد بلوک عدد صحیح
- `رشته "Earliest"` برای Earliest/Genesis block
- `رشته "آخرین"` - برای آخرین بلوک پیشنهادی
- `رشته "ایمن"` - برای آخرین بلوک سر امن
- `رشته "نهایی شده"` - برای آخرین بلوک نهایی شده
- `رشته "در انتظار"` - برای وضعیت/معاملات در انتظار

## مثال ها

در این صفحه نمونه‌هایی از نحوه استفاده از نقاط انتهایی API منفرد JSON_RPC با استفاده از ابزار خط فرمان، [curl](https://curl.se) ارائه می‌دهیم. این نمونه‌های نقطه پایان جداگانه در زیر در بخش [نمونه‌های Curl](#curl-examples) یافت می‌شوند. در پایین صفحه، ما همچنین یک [نمونه سرتاسری](#usage-example) برای کامپایل و استقرار یک قرارداد هوشمند با استفاده از گره Geth، JSON_RPC API و curl ارائه می‌دهیم.

## نمونه های Curl {#curl-examples}

نمونه هایی از استفاده از JSON_RPC API با درخواست [curl](https://curl.se) به یک گره اتریوم در زیر ارائه شده است. هر نمونه شامل شرحی از نقطه پایانی خاص، پارامترهای آن، نوع بازگشت، و یک مثال کار شده از نحوه استفاده از آن است.

درخواست‌های curl ممکن است پیام خطای مربوط به نوع محتوا را برگردانند. دلیل این امر این است که گزینه `--data` نوع محتوا را روی `application/x-www-form-urlencoded` تنظیم می کند. اگر گره شما از این موضوع شکایت دارد، با قرار دادن `-H "Content-Type: application/json"` در شروع تماس، هدر را به صورت دستی تنظیم کنید. نمونه ها همچنین شامل URL/IP و & ترکیب پورت که باید آخرین آرگومان داده شده به curl باشد (به عنوان مثال `127.0.0.1:8545`). یک درخواست کرل کامل شامل این داده های اضافی به شکل زیر است:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## شایعات، حالت، تاریخ {#gossip-state-history}

تعداد انگشت شماری از روش‌های هسته‌ای JSON-RPC به داده‌هایی از شبکه اتریوم نیاز دارند و به طور منظم در سه دسته اصلی قرار می‌گیرند: _Gossip، State و History_. از پیوندهای موجود در این بخش ها برای رفتن به هر روش استفاده کنید، یا از فهرست مطالب برای بررسی کل لیست روش ها استفاده کنید.

### روش های شایعه پراکنی {#gossip-methods}

> این روش ها سر زنجیره را دنبال می کنند. اینگونه است که تراکنش ها در شبکه راه می یابند، به بلوک ها راه پیدا می کنند و مشتریان چگونه از بلوک های جدید مطلع می شوند.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### روش های حالت {#state_methods}

> روش هایی که وضعیت فعلی تمام داده های ذخیره شده را گزارش می کنند. "وضعیت" مانند یک قطعه RAM مشترک بزرگ است و شامل مانده حساب ها، داده های قرارداد و تخمین گاز است.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### روش های تاریخ {#history_methods}

> سوابق تاریخی هر بلوک را به زمان پیدایش بازمی گرداند. این مانند یک فایل بزرگ است که فقط ضمیمه می شود و شامل تمام سرصفحه های بلوک، بدنه های بلوک، بلوک های عمو و رسیدهای تراکنش است.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## JSON-RPC API Playground

می‌توانید از [ابزار زمین بازی](https://ethereum-json-rpc.com) برای کشف و آزمایش روش‌های API استفاده کنید. همچنین به شما نشان می دهد که کدام روش ها و شبکه ها توسط ارائه دهندگان مختلف گره پشتیبانی می شوند.

## روش های JSON-RPC API {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

نسخه کلاینت فعلی را برمی گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`رشته` - نسخه کلاینت فعلی

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Keccak-256 (_نه_ استاندارد SHA3-256) داده‌های داده شده را برمی‌گرداند.

**پارامترها**

1. `DATA` - داده هایی که باید به هش SHA3 تبدیل شوند

```js
params: ["0x68656c6c6f20776f726c64"]
```

**برمی گرداند**

`DATA` - نتیجه SHA3 رشته داده شده.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

شناسه شبکه فعلی را برمی‌گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`رشته` - شناسه شبکه فعلی.

فهرست کامل شناسه‌های شبکه فعلی در [chainlist.org](https://chainlist.org) موجود است. برخی از موارد رایج عبارتند از:

- `1`：以太坊主网
- `5`: شبکه آزمایشی گورلی
- `11155111`: شبکه آزمایشی Sepolia

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

اگر کلاینت فعالانه به اتصالات شبکه گوش دهد، `true` را برمی‌گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`Boolean` - `درست` هنگام گوش دادن، در غیر این صورت `نادرست`.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

تعداد همتاهایی که در حال حاضر به مشتری متصل هستند را برمی گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`QUANTITY` - عدد صحیح از تعداد همتاهای متصل.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Result
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

نسخه فعلی پروتکل اتریوم را برمی گرداند. توجه داشته باشید که این روش [در Geth موجود نیست](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`رشته` - نسخه فعلی پروتکل اتریوم

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

یک شی را با داده‌های مربوط به وضعیت همگام‌سازی یا `نادرست` برمی‌گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

داده های برگشتی دقیق بین پیاده سازی های مشتری متفاوت است. وقتی گره همگام‌سازی نمی‌شود، همه کلاینت‌ها `False` را برمی‌گردانند و همه کلاینت‌ها فیلدهای زیر را برمی‌گردانند.

`Object|Boolean`، یک شی با داده‌های وضعیت همگام‌سازی یا `FALSE`، در صورت عدم همگام‌سازی:

- `startingBlock`: `QUANTITY` - بلوکی که در آن واردات شروع شد (فقط پس از اینکه همگام‌سازی به سرش رسید بازنشانی می‌شود)
- `currentBlock`: `QUANTITY` - بلوک فعلی، مانند eth_blockNumber
- `highestBlock`: `QUANTITY` - تخمین زده شده بالاترین بلوک

با این حال، کلاینت های منفرد ممکن است داده های اضافی را نیز ارائه دهند. به عنوان مثال Geth موارد زیر را برمی گرداند:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

در حالی که Besu اینها را برمی‌گرداند:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

برای جزئیات بیشتر به اسناد کلاینت خاص خود مراجعه کنید.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

آدرس کوین بیس مشتری را برمی گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`DATA`، 20 بایت - آدرس کوین بیس فعلی.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

چین آیدی مورد استفاده برای امضای تراکنش‌های محافظت شده با پخش مجدد را برمی‌گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`chainId`، مقدار هگزادسیمال به عنوان رشته‌ای که عدد صحیح شناسه زنجیره فعلی را نشان می‌دهد.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

اگر مشتری فعالانه بلوک‌های جدید را استخراج کند، `true` را برمی‌گرداند. این فقط می‌تواند `true` را برای شبکه‌های اثبات کار برگرداند و ممکن است از زمان [ادغام](/roadmap/merge/) در برخی از مشتریان موجود نباشد.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`بولین` - `true` را برمی‌گرداند که مشتری در حال استخراج است، در غیر این صورت `false` برمی‌گرداند.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

تعداد هش‌هایی را که گره با آن استخراج می‌کند، برمی‌گرداند. این فقط می‌تواند `true` را برای شبکه‌های اثبات کار برگرداند و ممکن است از زمان [ادغام](/roadmap/merge/) در برخی از مشتریان موجود نباشد.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`QUANTITY` - تعداد هش در ثانیه.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

تخمینی از قیمت فعلی هر گس را بر حسب wei برمی‌گرداند. به عنوان مثال، مشتری Besu 100 بلوک آخر را بررسی می‌کند و میانگین قیمت واحد گس را به طور پیش فرض برمی‌گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`QUANTITY` - عدد صحیح قیمت فعلی گس در wei.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

فهرستی از آدرس‌های متعلق به مشتری را برمی‌گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`آرایه داده`، 20 بایت - آدرس‌های متعلق به مشتری.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

تعداد بلوک اخیر را برمی‌گرداند.

**پارامترها**

هیچ‌کدام

**برمی گرداند**

`QUANTITY` - عدد صحیح از شماره بلوک فعلی که مشتری روی آن قرار دارد.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

موجودی حساب آدرس داده شده را برمی‌گرداند.

**پارامترها**

1. `DATA`، 20 بایت - آدرس برای بررسی مقدار حساب (موجودی).
2. `QUANTITY|TAG` - شماره بلوک عدد صحیح، یا رشته `"آخرین"`، `"اولین‌ترین"`، `"در انتظار"` ، `"ایمن"` یا `"نهایی"`، به [بلوک پیش‌فرض پارامتر مراجعه کنید ](/developers/docs/apis/json-rpc/#default-block)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**برمی گرداند**

`QUANTITY` - عدد صحیح موجودی فعلی در wei.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

مقدار را از یک موقعیت ذخیره‌سازی در یک آدرس معین برمی‌گرداند.

**پارامترها**

1. `DATA`، 20 بایت - آدرس محل ذخیره.
2. `QUANTITY` - عدد صحیح موقعیت در حافظه.
3. `QUANTITY|TAG` - شماره بلوک عدد صحیح، یا رشته `"آخرین"`، `"اولین"`، `"در انتظار"`, `"safe"`، `"نهایی شده"`، به [پارامتر بلوک پیش‌فرض مراجعه کنید ](/developers/docs/apis/json-rpc/#default-block)

**برمی گرداند**

`DATA` - مقدار در این موقعیت ذخیره‌سازی.

**مثال** محاسبه موقعیت صحیح بستگی به فضای ذخیره‌سازی برای بازیابی دارد. قرارداد زیر را که در `0x295a70b2de5e3953354a6a8344e616ed314d7251` با آدرس `0x391694e7e0b0cce554cb130d723a9d29> مستقر شده است در نظر بگیرید.</p>

<pre><code>contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    function Storage() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
`</pre>

بازیابی مقدار pos0 مستقیم است:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

بازیابی یک عنصر از مپ سخت‌تر است. موقعیت یک عنصر در مپ با موارد زیر محاسبه می‌شود:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

این بدان معناست که برای بازیابی فضای ذخیره‌سازی در pos1 ["0x391694e7e0b0cce554cb130d723a9d27458f9298"] باید موقعیت را با این موارد محاسبه کنیم:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

کنسول geth همراه با کتابخانه web3 می‌تواند برای محاسبه استفاده شود:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

اکنون برای فچ کردن فضای ذخیره‌سازی:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

تعداد تراکنش‌های _ارسال شده_ از یک آدرس را برمی‌گرداند.

**پارامترها**

1. `DATA`، بیست بایت - آدرس.
2. `QUANTITY|TAG` - شماره بلوک عدد صحیح، یا رشته `"آخرین"`، `"اولین"`، `"در انتظار"` ، `"ایمن"` یا `"finalized"`، به [پارامتر بلوک پیش‌فرض مراجعه کنید ](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**برمی گرداند**

`QUANTITY` - عدد صحیح تعداد تراکنش‌های ارسال شده از این آدرس.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

تعداد تراکنش‌های یک بلوک را از یک بلوک منطبق با هش بلوک داده شده برمی‌گرداند.

**پارامترها**

1. `DATA`، سی و دو بایت - هش یک بلوک

```js
پارامترها: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**برمی گرداند**

`QUANTITY` - عدد صحیح تعداد تراکنش‌های این بلوک.

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// نتیجه
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

تعداد تراکنش‌های یک بلوک مطابق با شماره بلوک داده شده را برمی‌گرداند.

**پارامترها**

1. `QUANTITY|TAG` - عدد صحیح یک شماره بلوک، یا رشته `"زودترین"`، `"آخرین"`، `"در انتظار"` code>، `"ایمن"` یا `"نهایی"`، مانند [ پارامتر بلوک پیش فرض](/developers/docs/apis/json-rpc/#default-block).

```js
پارامترها: [
  "0x13738ca", // 20396234
]
```

**برمی گرداند**

`QUANTITY` - عدد صحیح تعداد تراکنش‌های این بلوک.

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// نتیجه
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

تعداد بلاک‌های عمو موجود در یک بلوک را از یک بلوک مطابق با هش بلوک داده شده برمی‌گرداند.

**پارامترها**

1. `DATA`، سی و دو بایت - هش یک بلوک

```js
پارامترها: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**برمی گرداند**

`QUANTITY` - عدد صحیح تعداد عموهای این بلوک (یک اصطلاح است).

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// نتیجه
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

تعداد عموهای موجود در یک بلوک را از یک بلوک مطابق با شماره بلوک داده شده برمی‌گرداند.

**پارامترها**

1. `QUANTITY|TAG` - عدد صحیح یک عدد بلوک، یا رشته `"آخرین"`، `"اولین"`، `"در انتظار"` code>، `"ایمن"` یا `"نهایی شده"`، به [پیش‌فرض مراجعه کنید پارامتر بلوک](/developers/docs/apis/json-rpc/#default-block)

```js
params: [
  "0xe8", // 232
]
```

**برمی گرداند**

`QUANTITY` - عدد صحیح تعداد عموهای این بلوک (یک اصطلاح است).

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// نتیجه
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

کد را در یک آدرس داده شده برمی گرداند.

**پارامترها**

1. `DATA`، بیست بایت - آدرس
2. `QUANTITY|TAG` - شماره بلوک عدد صحیح، یا رشته `"آخرین"`، `"اولین"`، `"در انتظار"` ، `"ایمن"` یا `"finalized"`، به [پارامتر بلوک پیش‌فرض مراجعه کنید ](/developers/docs/apis/json-rpc/#default-block)

```js
پارامترها: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**برمی گرداند**

`DATA` - کد از آدرس داده شده.

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// نتیجه
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

روش امضا، یک امضای خاص اتریوم را با این موارد محاسبه می‌کند: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(پیام) + پیام)))`.

با افزودن یک پیشوند به پیام، امضای محاسبه شده به عنوان یک امضای خاص اتریوم قابل تشخیص است. این از سوء استفاده در جایی که یک برنامه مخرب می‌تواند داده‌های دلخواه (مانند تراکنش) را امضا و از امضا برای جعل هویت قربانی استفاده کند، جلوگیری می‌کند.

توجه: آدرسی که باید با آن امضا کنید باید قفل باشد.

**پارامترها**

1. `DATA`، بیست بایت - آدرس
2. `DATA`، N بایت - پیام برای امضا

**برمی گرداند**

`DATA`: امضا

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

تراکنشی را امضا می‌کند که می‌تواند بعداً با استفاده از [eth_sendRawTransaction](#eth_sendrawtransaction) به شبکه ارسال شود.

**پارامترها**

1. `Object` - شیء معامله

- `نوع`:
- `از`: `DATA`، 20 بایت - آدرسی که تراکنش از آن ارسال می‌شود.
- `به`: `DATA`، 20 بایت - (اختیاری هنگام ایجاد قرارداد جدید) آدرسی که تراکنش به آن هدایت می‌شود.
- `گس`: `QUANTITY` - (اختیاری، پیش‌فرض: 90000) عدد صحیح گس ارائه شده برای اجرای تراکنش. گس استفاده نشده را برمی‌گرداند.
- `gasPrice`: `QUANTITY` - (اختیاری، پیش‌فرض: باید تعیین شود) عدد صحیح گس قیمت مورد استفاده برای هر گس پرداختی، بر حسب Wei.
- `مقدار`: `QUANTITY` - (اختیاری) عدد صحیح از مقدار ارسال شده با این تراکنش، بر حسب Wei.
- `data`: `DATA` - کد کامپایل شده یک قرارداد یا هش امضای متد فراخوانی شده و پارامترهای کدگذاری شده.
- `نانس`: `QUANTITY` - (اختیاری) عدد صحیح یک نانس. این مورد اجازه می‌دهد تا تراکنش‌های در انتظار خود را که از همان نانس استفاده می‌کنند، بازنویسی کند.

**برمی گرداند**

`DATA`، شی تراکنش رمزگذاری شده با RLP که توسط حساب مشخص شده امضا شده است.

**مثال**

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

اگر فیلد داده حاوی کد باشد، تراکنش تماس یا فراخوانی پیام جدید یا ایجاد قرارداد ایجاد می‌کند و آن را با استفاده از حساب مشخص شده در `from` امضا می‌کند.

**پارامترها**

1. `Object` - شیء معامله

- `از`: `DATA`، 20 بایت - آدرسی که تراکنش از آن ارسال می‌شود.
- `به`: `DATA`، 20 بایت - (اختیاری هنگام ایجاد قرارداد جدید) آدرسی که تراکنش به آن هدایت می‌شود.
- `گس`: `QUANTITY` - (اختیاری، پیش‌فرض: 90000) عدد صحیح گس ارائه شده برای اجرای تراکنش. گس استفاده نشده را برمی‌گرداند.
- `gasPrice`: `QUANTITY` - (اختیاری، پیش‌فرض: باید تعیین شود) عدد صحیح gasPrice استفاده شده برای هر گس پرداختی.
- `مقدار`: `QUANTITY` - (اختیاری) عدد صحیح مقدار ارسال شده با این تراکنش.
- `ورودی`: `DATA` - کد کامپایل شده یک قرارداد یا هش امضای متد فراخوانی شده و پارامترهای کدگذاری شده.
- `نانس`: `QUANTITY` - (اختیاری) عدد صحیح یک نانس. این مورد اجازه می‌دهد تا تراکنش‌های در انتظار خود را که از همان نانس استفاده می‌کنند، بازنویسی کند.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**برمی گرداند**

`DATA`، 32 بایت - هش تراکنش، یا هش صفر اگر تراکنش هنوز در دسترس نباشد.

از [eth_getTransactionReceipt](#eth_gettransactionreceipt) برای دریافت آدرس قرارداد، پس از پیشنهاد تراکنش در یک بلوک، هنگام ایجاد قرارداد استفاده کنید.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

تراکنش تماس یا فراخوانی پیام جدید یا ایجاد قرارداد برای تراکنش‌های امضا شده ایجاد می‌کند.

**پارامترها**

1. `DATA`، داده‌های تراکنش امضا شده.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**برمی گرداند**

`DATA`، 32 بایت - هش تراکنش، یا هش صفر اگر تراکنش هنوز در دسترس نباشد.

از [eth_getTransactionReceipt](#eth_gettransactionreceipt) برای دریافت آدرس قرارداد، پس از پیشنهاد تراکنش در یک بلوک، هنگام ایجاد قرارداد استفاده کنید.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

بدون ایجاد تراکنش در زنجیره بلوک، یک تماس پیام جدید را بلافاصله اجرا می‌کند. اغلب برای اجرای توابع قرارداد هوشمند فقط خواندنی، به عنوان مثال `balanceOf` برای قرارداد ERC-20 استفاده می‌شود.

**پارامترها**

1. `Object` - شیء فراخوانی تراکنش

- `از`: `DATA`, 20 بایت - آدرسی که تراکنش از آن فرستاده می‌شود (اختیاری).
- `به`: `DATA`، 20 بایت - آدرسی که تراکنش به آن هدایت می‌شود.
- `گس`: `QUANTITY` - (اختیاری) عدد صحیح گس ارائه شده برای اجرای تراکنش. eth_call گس صفر مصرف می‌کند، اما این پارامتر ممکن است برای برخی از اجراها مورد نیاز باشد.
- `gasPrice`: `QUANTITY` - (اختیاری) عدد صحیح gasPrice استفاده شده برای هر گس پرداختی
- `مقدار`: `QUANTITY` - (اختیاری) عدد صحیح مقدار ارسال شده با این تراکنش
- `ورودی`: `DATA` - (اختیاری) هش امضای روش و پارامترهای کدگذاری شده. برای جزئیات به [ABI قرارداد اتریوم در مستندات یا داکیومنت سالیدیتی](https://docs.soliditylang.org/en/latest/abi-spec.html) مراجعه کنید.

2. `QUANTITY|TAG` - شماره بلوک عدد صحیح، یا رشته `"آخرین"`، `"اولین"`، `"در انتظار"` ، `"ایمن"` یا `"finalized"`، به [پارامتر بلوک پیش‌فرض مراجعه کنید ](/developers/docs/apis/json-rpc/#default-block)

**برمی گرداند**

`DATA` - مقدار بازگشتی قرارداد اجرا شده.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

تخمینی از میزان گس لازم برای تکمیل تراکنش را ایجاد و برمی‌گرداند. تراکنش به بلاک چین اضافه نخواهد شد. توجه داشته باشید که به دلایل مختلفی از جمله مکانیک ماشین مجازی اتریوم و عملکرد گره، تخمین ممکن است به طور قابل توجهی بیشتر از مقدار گس مورد استفاده در معامله باشد.

**پارامترها**

به پارامترهای [eth_call](#eth_call) مراجعه کنید، با این تفاوت که همه ویژگی‌ها اختیاری هستند. اگر محدودیت گس مشخص نشده باشد، گس از حد گس بلوک از بلوک در حال انتظار به عنوان کران بالایی استفاده می‌کند. در نتیجه برآورد برگشتی ممکن است برای اجرای تماس/معامله زمانی که مقدار گس بیشتر از حد گس بلوک در انتظار باشد کافی نباشد.

**برمی گرداند**

`QUANTITY` - مقدار گس مصرفی.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

اطلاعات مربوط به یک بلوک را با هش برمی‌گرداند.

**پارامترها**

1. `DATA`، 32 بایت - هش یک بلوک.
2. `بولین` - اگر `true` اشیاء تراکنش کامل را برمی‌گرداند، اگر `false` فقط هش‌های تراکنش‌ها را برمی‌گرداند.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**برمی گرداند**

`آبجکت` - یک شیء بلوک، یا `null` هنگامی که هیچ بلوکی پیدا نشد:

- `شماره`: `QUANTITY` - شماره بلوک. `null` زمانی که بلوک در حال انتظار است.
- `هش`: `DATA`، 32 بایت - هش بلوک. `null` زمانی که بلوک در حال انتظار است.
- `parentHash`: `DATA`، 32 بایت - هش بلوک والد.
- `nonce`: `DATA`، 8 بایت - هش اثبات کار ایجاد شده. `null` زمانی که بلوک در حال انتظار است.
- `sha3Uncles`: `DATA`، 32 بایت - SHA3 از داده‌های عمو یا آنکل در بلوک.
- `logsBloom`: `DATA`، 256 بایت - فیلتر بلوم گزارش‌های بلوک. `null` زمانی که بلوک در حال انتظار است.
- `transactionsRoot`: `DATA`، 32 بایت - ریشه آزمایش تراکنش بلوک.
- `stateRoot`: `DATA`، 32 بایت - ریشه آزمایش وضعیت نهایی بلوک.
- `receiptsRoot`: `DATA`، 32 بایت - ریشه آزمایشی رسیدهای بلوک.
- `miner`: `DATA`، 20 بایت - آدرس ذینفعی که پاداش استخراج به او داده شده است.
- `سختی`: `QUANTITY` - عدد صحیح دشواری این بلوک.
- `totalDifficulty`: `QUANTITY` - عدد صحیح کل سختی زنجیره تا این بلوک.
- `extraData`: `DATA` - قسمت "داده اضافی" این بلوک.
- `size`: `QUANTITY` - عدد صحیح اندازه این بلوک بر حسب بایت.
- `gasLimit`: `QUANTITY` - حداکثر گس مجاز در این بلوک.
- `gasUsed`: `QUANTITY` - کل گس مصرف شده توسط همه تراکنش‌های این بلوک.
- `مهر زمانی یا تایم استمپ`: `QUANTITY` - مهر زمانی یونیکس برای زمانی که بلوک جمع‌آوری شده است.
- `معاملات`: `آرایه` - آرایه‌ای از اشیاء تراکنش، یا هش تراکنش‌های 32 بایتی بسته به آخرین پارامتر داده شده.
- `عموها`: `آرایه` - آرایه هش‌های عمو.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Result
{
{
"jsonrpc": "2.0",
"id": 1,
"result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
}
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

اطلاعات مربوط به یک بلوک را با شماره بلوک برمی‌گرداند.

**پارامترها**

1. `QUANTITY|TAG` - عدد صحیح یک شماره بلوک، یا رشته `"زودترین"`، `"آخرین"`، `"در انتظار"` code>، `"ایمن"` یا `"نهایی"`، مانند [ پارامتر بلوک پیش فرض](/developers/docs/apis/json-rpc/#default-block).
2. `بولین` - اگر `true` اشیاء تراکنش کامل را برمی‌گرداند، اگر `false` فقط هش‌های تراکنش‌ها را برمی‌گرداند.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**برمی‌گرداند** به [eth_getBlockByHash](#eth_getblockbyhash) مراجعه کنید

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

نتیجه را ببینید [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

اطلاعات مربوط به تراکنش درخواست شده توسط هش تراکنش را برمی‌گرداند.

**پارامترها**

1. `DATA`، 32 بایت - هش تراکنش

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**برمی گرداند**

`آبجکت` - یک شیء تراکنش یا `null` هنگامی که هیچ تراکنشی پیدا نشد:

- `blockHash`: `DATA`، 32 بایت - هش بلوکی که این تراکنش در آن بوده است. `null` زمانی که در حال تعلیق یا سپری شدن است.
- `blockNumber`: `QUANTITY` - شماره بلوکی که این تراکنش در آن بوده است. `null` زمانی که در حال تعلیق یا سپری شدن است.
- `از`: `DATA`، 20 بایت - آدرس فرستنده.
- `گاز`: `QUANTITY` - گس ارائه شده توسط فرستنده.
- `gasPrice`: `QUANTITY` - قیمت گس ارائه شده توسط فرستنده بر حسب Wei.
- `هش`: `DATA`، 32 بایت - هش تراکنش.
- `ورودی`: `DATA` - داده‌ها همراه با تراکنش ارسال می‌شوند.
- `nonce`: `QUANTITY` - تعداد تراکنش‌هایی که فرستنده قبل از این تراکنش انجام داده است.
- `به`: `DATA`، 20 بایت - آدرس گیرنده. `null` زمانی که یک معامله ایجاد قرارداد باشد.
- `transactionIndex`: `QUANTITY` - عدد صحیح موقعیت شاخص تراکنش‌ها در بلوک. `null` زمانی که در حال تعلیق یا سپری شدن است.
- `مقدار`: `QUANTITY` - مقدار منتقل شده بر حسب Wei.
- `v`: `QUANTITY` - شناسه بازیابی ECDSA
- `r`: `QUANTITY` - امضای ECDSA r
- `s`: `QUANTITY` - امضای ECDSA

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

اطلاعات مربوط به تراکنش را بر اساس هش بلوک و موقعیت شاخص تراکنش برمی‌گرداند.

**پارامترها**

1. `DATA`، 32 بایت - هش یک بلوک.
2. `QUANTITY` - عدد صحیح موقعیت شاخص یا ایندکس تراکنش.

```js
پارامترها: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**برمی‌گرداند** ببینید[eth_getTransactionByHash](#eth_gettransactionbyhash)

**مثال**

```js
// درخواست
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

نتیجه را ببینید [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

اطلاعات مربوط به یک تراکنش را بر اساس شماره بلوک و موقعیت شاخص تراکنش برمی‌گرداند.

**پارامترها**

1. `QUANTITY|TAG` - یک شماره بلوک، یا رشته `"زودترین"`، `"آخرین"`، `"در انتظار"` مانند [بلوک پیش‌فرض، `"ایمن"` یا `"نهایی"` پارامتر](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - موقعیت شاخص تراکنش.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**برمی‌گرداند** ببینید[eth_getTransactionByHash](#eth_gettransactionbyhash)

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

نتیجه را ببینید [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

رسید یک تراکنش را با هش تراکنش برمی‌گرداند.

**توجه داشته باشید** که رسید برای تراکنش‌های در انتظار موجود نیست.

**پارامترها**

1. `DATA`، 32 بایت - هش تراکنش

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

`آبجکت` - یک شیء رسید تراکنش، یا `null` زمانی که هیچ رسیدی پیدا نشد:

- `transactionHash`: `DATA`، 32 بایت - هش تراکنش.
- `transactionIndex`: `QUANTITY` - عدد صحیح موقعیت شاخص تراکنش‌ها در بلوک.
- `blockHash`: `DATA`، 32 بایت - هش بلوکی که این تراکنش در آن بوده است.
- `blockNumber`: `QUANTITY` - شماره بلوکی که این تراکنش در آن بوده است.
- `از`: `DATA`، 20 بایت - آدرس فرستنده.
- `به`: `DATA`، 20 بایت - آدرس گیرنده. زمانی که یک معامله ایجاد قرارداد باشد، null است.
- `cumulativeGasUsed` : `QUANTITY` - کل مقدار گسی که هنگام انجام این تراکنش در بلوک استفاده شده است.
- `effectiveGasPrice` : `QUANTITY` - مجموع هزینه پایه و انعام پرداخت شده به ازای هر واحد گس.
- `gasUsed`: `QUANTITY` - مقدار گس مصرفی تنها توسط این تراکنش خاص.
- `contractAddress`: `DATA`, 20 بایت - آدرس قرارداد ایجاد شد، اگر تراکنش یک ایجاد قرارداد بود، در غیر اینصورت `صفر`.
-
- `logsBloom`: `DATA`, 256 Bytes - Bloom filter for light clients to quickly retrieve related logs.
- `type`: `QUANTITY` - integer of the transaction type, `0x0` for legacy transactions, `0x1` for access list types, `0x2` for dynamic fees.

It also returns _either_ :

- `root` : `DATA` 32 bytes of post-transaction stateroot (pre Byzantium)
- `status`: `QUANTITY` either `1` (success) or `0` (failure)

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Returns information about a uncle of a block by hash and uncle index position.

**پارامترها**

1. `DATA`, 32 Bytes - The hash of a block.
2. `QUANTITY` - The uncle's index position.

```js
پارامترها: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**برمی‌گرداند** به [eth_getBlockByHash](#eth_getblockbyhash) مراجعه کنید

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

نتیجه را ببینید [eth_getBlockByHash](#eth_getblockbyhash)

**Note**: An uncle doesn't contain individual transactions.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Returns information about a uncle of a block by number and uncle index position.

**پارامترها**

1. `QUANTITY|TAG` - a block number, or the string `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, as in the [default block parameter](/developers/docs/apis/json-rpc/#default-block).
2. `QUANTITY` - the uncle's index position.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**برمی‌گرداند** به [eth_getBlockByHash](#eth_getblockbyhash) مراجعه کنید

**Note**: An uncle doesn't contain individual transactions.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

نتیجه را ببینید [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**A note on specifying topic filters:** Topics are order-dependent. A transaction with a log with topics [A, B] will be matched by the following topic filters:

- `[]` "anything"
- `[A]` "A in first position (and anything after)"
- `[null, B]` "anything in first position AND B in second position (and anything after)"
- `[A, B]` "A in first position AND B in second position (and anything after)"
- `[[A, B], [A, B]]` "(A OR B) in first position AND (A OR B) in second position (and anything after)"
- **پارامترها**

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last proposed block, `"safe"` for the latest safe block, `"finalized"` for the latest finalized block, or `"pending"`, `"earliest"` for transactions not yet in a block.
- `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last proposed block, `"safe"` for the latest safe block, `"finalized"` for the latest finalized block, or `"pending"`, `"earliest"` for transactions not yet in a block.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Returns** `QUANTITY` - A filter id.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters** None

**Returns** `QUANTITY` - A filter id.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).

**Parameters** None

**Returns** `QUANTITY` - A filter id.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally Filters timeout when they aren't requested with [eth_getFilterChanges](#eth_getfilterchanges) for a period of time.

**پارامترها**

1. `QUANTITY` - The filter id.

```js
params: [
  "0xb", // 11
]
```

**Returns** `Boolean` - `true` if the filter was successfully uninstalled, otherwise `false`.

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Polling method for a filter, which returns an array of logs which occurred since last poll.

**پارامترها**

1. `QUANTITY` - the filter id.

```js
params: [
  "0x16", // 22
]
```

**Returns** `Array` - Array of log objects, or an empty array if nothing has changed since last poll.

- For filters created with `eth_newBlockFilter` the return are block hashes (`DATA`, 32 Bytes), e.g. `["0x3454645634534..."]`.
- For filters created with `eth_newPendingTransactionFilter` the return are transaction hashes (`DATA`, 32 Bytes), e.g. `["0x6345343454645..."]`.
- For filters created with `eth_newFilter` logs are objects with following params:
  - `removed`: `TAG` - `true` when the log was removed, due to a chain reorganization. `false` if its a valid log.
  - `logIndex`: `QUANTITY` - عدد صحیح موقعیت فهرست گزارش در بلوک. `null` زمانی که گزارش در حال انتظار است.
  - `transactionIndex`: `QUANTITY` - integer of the transactions index position log was created from. `null` زمانی که گزارش در حال انتظار است.
  - `transactionHash`: `DATA`, 32 Bytes - hash of the transactions this log was created from. `null` زمانی که گزارش در حال انتظار است.
  - `blockHash`: `DATA`, 32 Bytes - hash of the block where this log was in. `null` زمانی که در حال تعلیق یا سپری شدن است. `null` زمانی که گزارش در حال انتظار است.
  - `blockNumber`: `QUANTITY` - the block number where this log was in. `null` زمانی که در حال تعلیق یا سپری شدن است. `null` زمانی که گزارش در حال انتظار است.
  - `address`: `DATA`, 20 Bytes - address from which this log originated.
  - `data`: `DATA` - contains zero or more 32 Bytes non-indexed arguments of the log.
  - `topics`: `Array of DATA` - Array of 0 to 4 32 Bytes `DATA` of indexed log arguments. (In _solidity_: The first topic is the _hash_ of the signature of the event (e.g. `Deposit(address,bytes32,uint256)`), except you declared the event with the `anonymous` specifier.)
- **مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Returns an array of all logs matching filter with given id.

**پارامترها**

1. `QUANTITY` - The filter id.

```js
params: [
  "0x16", // 22
]
```

**Returns** See [eth_getFilterChanges](#eth_getfilterchanges)

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Result see [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Returns an array of all logs matching a given filter object.

**پارامترها**

1. `Object` - The filter options:

- `fromBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last proposed block, `"safe"` for the latest safe block, `"finalized"` for the latest finalized block, or `"pending"`, `"earliest"` for transactions not yet in a block.
- `toBlock`: `QUANTITY|TAG` - (optional, default: `"latest"`) Integer block number, or `"latest"` for the last proposed block, `"safe"` for the latest safe block, `"finalized"` for the latest finalized block, or `"pending"`, `"earliest"` for transactions not yet in a block.
- `address`: `DATA|Array`, 20 Bytes - (optional) Contract address or a list of addresses from which logs should originate.
- `topics`: `Array of DATA`, - (optional) Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options.
- `blockhash`: `DATA`, 32 Bytes - (optional, **future**) With the addition of EIP-234, `blockHash` will be a new filter option which restricts the logs returned to the single block with the 32-byte hash `blockHash`. Using `blockHash` is equivalent to `fromBlock` = `toBlock` = the block number with hash `blockHash`. If `blockHash` is present in the filter criteria, then neither `fromBlock` nor `toBlock` are allowed.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Returns** See [eth_getFilterChanges](#eth_getfilterchanges)

**مثال**

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Result see [eth_getFilterChanges](#eth_getfilterchanges)

## Usage Example {#usage-example}

### Deploying a contract using JSON_RPC {#deploying-contract}

This section includes a demonstration of how to deploy a contract using only the RPC interface. There are alternative routes to deploying contracts where this complexity is abstracted away—for example, using libraries built on top of the RPC interface such as [web3.js](https://web3js.readthedocs.io/) and [web3.py](https://github.com/ethereum/web3.py). These abstractions are generally easier to understand and less error-prone, but it is still helpful to understand what is happening under the hood.

The following is a straightforward smart contract called `Multiply7` that will be deployed using the JSON-RPC interface to an Ethereum node. This tutorial assumes the reader is already running a Geth node. More information on nodes and clients is available [here](/developers/docs/nodes-and-clients/run-a-node). Please refer to individual [client](/developers/docs/nodes-and-clients/) documentation to see how to start the HTTP JSON-RPC for non-Geth clients. Most clients default to serving on `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

The first thing to do is make sure the HTTP RPC interface is enabled. This means we supply Geth with the `--http` flag on startup. In this example we use the Geth node on a private development chain. Using this approach we don't need ether on the real network.

```bash
geth --http --dev console 2>>geth.log
```

This will start the HTTP RPC interface on `http://localhost:8545`.

We can verify that the interface is running by retrieving the Coinbase address and balance using [curl](https://curl.se). Please note that data in these examples will differ on your local node. If you want to try these commands, replace the request params in the second curl request with the result returned from the first.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_coinbase", "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Because numbers are hex encoded, the balance is returned in wei as a hex string. If we want to have the balance in ether as a number we can use web3 from the Geth console.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Now that there is some ether on our private development chain, we can deploy the contract. The first step is to compile the Multiply7 contract to byte code that can be sent to the EVM. To install solc, the Solidity compiler, follow the [Solidity documentation](https://docs.soliditylang.org/en/latest/installing-solidity.html). (You might want to use an older `solc` release to match [the version of compiler used for our example](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

The next step is to compile the Multiply7 contract to byte code that can be send to the EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Now that we have the compiled code we need to determine how much gas it costs to deploy it. The RPC interface has an `eth_estimateGas` method that will give us an estimate.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

And finally deploy the contract.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

The transaction is accepted by the node and a transaction hash is returned. This hash can be used to track the transaction. The next step is to determine the address where our contract is deployed. Each executed transaction will create a receipt. This receipt contains various information about the transaction such as in which block the transaction was included and how much gas was used by the EVM. If a transaction creates a contract it will also contain the contract address. We can retrieve the receipt with the `eth_getTransactionReceipt` RPC method.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

قرارداد ما در `0x4d03d617d700cf81935d7f797f4e2ae719648262` ایجاد شد. نتیجه صفر به جای رسید به این معنی است که تراکنش هنوز در یک بلوک گنجانده نشده است. یک لحظه صبر و بررسی کنید که آیا کلاینت اجماع شما در حال اجرا است یا خیر و دوباره آن را امتحان کنید.

#### تعامل با قراردادهای هوشمند {#interacting-with-smart-contract}

در این مثال، ما یک تراکنش را با استفاده از `eth_sendTransaction` به روش `multiply` قرارداد ارسال خواهیم کرد.

`eth_sendTransaction` به چندین آرگومان نیاز دارد، به ویژه `از`، `به` و `داده`. `From` آدرس عمومی حساب ما است و `to` آدرس قرارداد است. آرگومان `data` حاوی باری است که مشخص می‌کند کدام متد و با کدام آرگومان باید فراخوانی شود. This is where the [ABI (application binary interface)](https://docs.soliditylang.org/en/latest/abi-spec.html) comes into play. The ABI is a JSON file that defines how to define and encode data for the EVM.

The bytes of the payload defines which method in the contract is called. This is the first 4 bytes from the Keccak hash over the function name and its argument types, hex encoded. The multiply function accepts an uint which is an alias for uint256. This leaves us with:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

The next step is to encode the arguments. There is only one uint256, say, the value 6. The ABI has a section which specifies how to encode uint256 types.

`int<M>: enc(X)` is the big-endian two’s complement encoding of X, padded on the higher-order (left) side with 0xff for negative X and with zero > bytes for positive X such that the length is a multiple of 32 bytes.

This encodes to `0000000000000000000000000000000000000000000000000000000000000006`.

Combining the function selector and the encoded argument our data will be `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

This can now be sent to the node:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Since a transaction was sent, a transaction hash was returned. Retrieving the receipt gives:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

The receipt contains a log. This log was generated by the EVM on transaction execution and included in the receipt. The `multiply` function shows that the `Print` event was raised with the input times 7. Since the argument for the `Print` event was a uint256 we can decode it according to the ABI rules which will leave us with the expected decimal 42. Apart from the data it is worth noting that topics can be used to determine which event created the log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

This was just a brief introduction into some of the most common tasks, demonstrating direct usage of the JSON-RPC.

## موضوعات مرتبط {#related-topics}

- [JSON-RPC specification](http://www.jsonrpc.org/specification)
- [گره‌ها و کاربرها](/developers/docs/nodes-and-clients/)
- [رابط کاربری جاوا اسکریپت](/developers/docs/apis/javascript/)
- [وب سرویس‌های بک‌اند](/developers/docs/apis/backend/)
- [کلاینت‌های اجرا](/developers/docs/nodes-and-clients/#execution-clients)
