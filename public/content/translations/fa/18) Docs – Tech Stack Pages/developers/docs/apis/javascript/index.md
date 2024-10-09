---
title: کتابخانه های API جاوا اسکریپت
description: مقدمه ای بر کتابخانه های کاربرهای جاوا اسکریپت که به شما اجازه تعامل با زنجیره‌ بلوکی را از سوی نرم‌افزارتان می‌دهد.
lang: fa
---

جهت تعامل یک نرم افزار اینترنتی با زنجیره بلوکی اتریوم (مثلا خواندن داده زنجیره بلوکی و یا فرستادن تراکنش به شبکه)، باید به یک گره اتریوم متصل شد.

برای این منظور، هر مشتری اتریوم مشخصات [JSON-RPC](/developers/docs/apis/json-rpc/) را پیاده‌سازی می‌کند، بنابراین مجموعه‌ای یکسان از [روش‌ها](/developers/docs/apis/json-rpc/#json-rpc-methods) وجود دارد که برنامه‌ها می‌توانند به آنها تکیه کنند.

اگر می‌خواهید برای اتصال به یک گره اتریوم از جاوا اسکریپت استفاده کنید، این امکان وجود دارد که از جاوا اسکریپت خالص استفاده کنید اما چندین کتابخانه مناسب درون اکوسیستم وجود دارند که این کار را بسیار ساده‌تر می‌سازند. با استفاده از این کتابخانه ها توسعه‌دهندگان می‌توانند بدون دانستن برنامه نویسی پپشرفته و با استفاده از کد یک خطی درخواست های JSON-RPC بدهند که با اتریوم تعامل داشته باشد.

لطفاً توجه داشته باشید که از زمان [ادغام](/roadmap/merge/)، دو قطعه متصل نرم افزار اتریوم - یک کاربر اجرا و یک کاربر توافقی - برای اجرای یک گره مورد نیاز است. لطفاً مطمئن شوید که گره شما شامل یک کاربر اجرایی و توافقی است. اگر گره شما در دستگاه محلی شما نیست (به عنوان مثال، گره شما در یک نمونه AWS در حال اجرا است) آدرس های IP را در آموزش به روز رسانی کنید. برای اطلاعات بیشتر لطفاً به صفحه ما در [اجرای یک گره](/developers/docs/nodes-and-clients/run-a-node/) مراجعه کنید.

## پیش‌نیازها {#prerequisites}

علاوه بر درک جاوا اسکریپت، فهمیدن [پشته‌ اتریوم](/developers/docs/ethereum-stack/) و [کاربرهای اتریوم](/developers/docs/nodes-and-clients/) نیز احتمالا کمک کننده باشد.

## چرا از کتابخانه ها استفاده کنیم؟ {#why-use-a-library}

این کتابخانه ها بسیاری از سختی های ازتباط مستقیم با گره اتریوم را از بین می‌برند. هم‌چنین توابع کاربردی فراهم می‌کنند (مثال: تبدیل اتر به GWEI) بنابراین به عنوان یک توسعه دهنده شما زمان کمتری صرف کارکردن با پیچیدگی های کاربر اتریوم، و زمان بیشتری صرف عملکرد برنامه خود می‌کنید.

## ویژگی های کتابخانه {#library-features}

### اتصال به گره های اتریوم {#connect-to-ethereum-nodes}

با استفاده از ارائه کنندگان، این کتابخانه ها به شما اجازه اتصال به اتریوم و خواندن داده های آن را می‌دهند، چه روی JASON-RPC، INFURA، Etherscan، Alchemy یا MetaMask.

**مثال های اتر**

```js
// یک BrowserProvider یک ارائه دهنده استاندارد Web3 را می‌پوشاند که این است
// آنچه MetaMask به عنوان window.ethereum به هر صفحه وارد می‌کند
ارائه دهنده const = new ethers.BrowserProvider(window.ethereum)

// پلاگین MetaMask همچنین امکان امضای تراکنش‌ها را فراهم می‌کند
// برای تغییر حالت در بلاک چین اتر ارسال و پرداخت کنید.
// برای این امر، نیاز به امضا کننده حساب داریم...
const singer = provider.getSinger()
```

**مثال Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// یا
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// تغییر فراهم آورنده
web3.setProvider("ws://localhost:8546")
// یا
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// استفاده از فراهم آورنده IPC در نود جی‌اس
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // مسیر mac os
// یا
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
) // مسیر mac os
// در ویندوز مسیر "\\\\.\\pipe\\geth.ipc" است
// در لینوکس مسیر "/users/myuser/.ethereum/geth.ipc" است
```

زمانی که راه‌اندازی شود، می‌توانید موارد زیر را از زنجیره بلوکی ببیند:

- شماره بلوک ها
- تخمین گاز
- رویداد های قرارداد های هوشمند
- شناسه شبکه
- و موارد دیگر...

### عملکرد کیف پول {#wallet-functionality}

این کتابخانه ها، برای ساخت کیف پول، مدیریت کلید ها و امضای تراکنش، به شما امکان عملکرد می‌دهند.

در اینجا مثالی از Ethers را داریم

```js
// ساخت یک کیف پول نمونه از یک یادواره...
// ارسال اتر
wallet.sendTransaction(tx)
```

[همه اسناد را بخوانید](https://docs.ethers.io/v5/api/signer/#Wallet)

زمانی که راه‌اندازی شد، می‌توانید:

- حساب درست کنید
- تراکنش بفرستید
- تراکنش‌ها را امضا کنید
- و موارد دیگر...

### با توابع قرارداد هوشمند تعامل کنید {#interact-with-smart-contract-functions}

کتابخانه های کاربر در جاوا اسکریپت به شما اجازه می‌دهند توابع قرارداد هوشمند را با خواندن اینترفیس باینری (ABI) از قرارداد کامپایل شده فراخوانی کنید.

ABI به شما توابع قراردادها را در فرمت JSON توضیح می‌دهد و به شما امکان آن را می‌دهد که به عنوان یک شئ در جاواسکریپت استفاده کنید.

بنابراین قرارداد solidity در زیر:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

باعث انجام این کد جاواسکریپت می‌شود:

```json
[{
    "type":"constructor",
    "payable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt","type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"","type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },{
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b","type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

این به آن معنیست که شما می‌توانید:

- یک تراکنش برای قرارداد هوشمند بفرستید و روش آن را اجرا کنید
- فراخوانی برای تخمین میزان گازی که یک اجرای روش، زمانی که در ماشین مجازی اتریوم اجرا شده، می‌گیرد
- قرارداد را مستقر کنید
- و موارد دیگر...

### توابع کاربردی {#utility-functions}

توابع کاربردی به شما میانبرهای آسانی می‌دهند تا به وسیله‌ آن ها ساختن با اتریوم را برای شما راحت کنند.

مقادیر ETH به طور پیش فرض در Wei هستند. 1ETH = 1,000,000,000,000,000,000 WEI - این بدان معناست که شما با اعداد زیادی سر و کار دارید! `web3.utils.toWei` اتر را برای شما به Wei تبدیل می کند.

و در اترها به صورت زیر است:

```js
// Get the balance of an account (by address or ENS name)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// Often you will need to format the output for the user
// which prefer to see values in ether (instead of wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [توابع کاربردی Web3js](https://docs.web3js.org/api/web3-utils)
- [توابع کاربردی اترها](https://docs.ethers.io/v5/api/utils/)

## کتابخانه های موجود {#available-libraries}

**Web3.js -** **_API اتریوم جاوا اسکریپت._**

- [مستندات](https://docs.web3js.org/)
- [گیت‌هاب](https://github.com/ethereum/web3.js/)

**Ethers.js -** **_اجرای کامل کیف پول اتریوم و ابزارهای کاربردی در جاوا اسکریپت و تایپ اسکریپت._**

- [مستندات](https://docs.ethers.io/)
- [گیت هاب](https://github.com/ethers-io/ethers.js/)

**The Graph-** **_پروتکلی برای نمایه سازی داده های اتریوم و IPFS و جستجو در آن با استفاده از GraphQL._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [اسناد](https://thegraph.com/docs/)
- [گیت‌هاب](https://github.com/graphprotocol/)
- [ديسكورد](https://thegraph.com/discord)

**light.js -** **_یک کتابخانه JS واکنش‌پذیر سطح بالا که برای کاربرهای سبک بهینه‌سازی شده است._**

- [گیت‌هاب](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper -** **_جایگزین تایپ اسکریپ برای Web3.js_**

- [اسناد](https://0x.org/docs/web3-wrapper#introduction)
- [گیت‌هاب](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3 -** **_یک رپر روی Web3.js با تکرارهای خودکار و apiهای بهبودیافته._**

- [اسناد](https://docs.alchemy.com/reference/api-overview)
- [گیت‌هاب](https://github.com/alchemyplatform/alchemy-web3)

**Alchemy NFT API -** **_API برای واکشی داده های NFT، از جمله مالکیت، ویژگی های فراداده و غیره._**

- [مستندات](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
- [گیت‌هاب](https://github.com/alchemyplatform/alchemy-web3)

**viem -** **_واسط تایپ اسکریپت برای اتریوم._**

- [اسناد](https://viem.sh)
- [گیت هاب](https://github.com/wagmi-dev/viem)

## بیشتر بخوانید {#further-reading}

_می‌خواهید در مورد منابع جامعه که به شما کمک کرده بدانید؟ این صفحه را ویرایش و اضافه کنید!_

## موضوعات مرتبط {#related-topics}

- [گره‌ها و کاربرها](/developers/docs/nodes-and-clients/)
- [چارچوب‌های توسعه](/developers/docs/frameworks/)

## آموزش های مرتبط {#related-tutorials}

- [Web3js را برای استفاده از بلاک چین اتریوم در جاوا اسکریپت راه اندازی کنید](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) *– دستورالعمل هایی برای راه اندازی web3.js در پروژه شما.*
- [فراخوانی قرارداد هوشمند در جاوا اسکریپت](/developers/tutorials/calling-a-smart-contract-from-javascript/)_- با استفاده از توکن Dai، ببینید چگونه می‌شود با استفاده از توابع قراردادها را فراخوانی کرد._
- [ارسال تراکنش‌ها با استفاده از web3 و Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _– راهنمای گام به گام برای ارسال تراکنش‌ها از بک اند._
