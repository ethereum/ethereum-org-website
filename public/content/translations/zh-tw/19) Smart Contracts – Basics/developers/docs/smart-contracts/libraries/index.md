---
title: 智慧型合約庫
description:
lang: zh-tw
---

你無需從頭開始編寫專案中的每一個智慧型合約。 因為我們有許多開放原始碼智慧型合約庫可為你的專案提供可重複利用的組件，因此你不必從零開始。

## 基本資訊 {#prerequisites}

在使用智慧型合約庫之前，最好先清楚瞭解智慧型合約的結構。 如果尚未完成，請前往[智慧型合約結構](/developers/docs/smart-contracts/anatomy/)。

## 庫的內容 {#whats-in-a-library}

你通常可以在智慧型合約庫中找到兩種組件：可以添加到合約的可重複使用行為，與採納的各種標準。

### 行為 {#behaviors}

編寫智慧型合約時，你很可能會發現自己在重複編寫類似代碼。比如說在合約中指派一個_管理員_地址執行受保護的操作；或添加一個緊急_暫停_按鈕以應對預料之外的問題。

智慧型合約庫通常透過[庫](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries)或在Solidity 中[繼承](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)，讓這些行為可以重複使用。

例如，以下是[OpenZepelin Contracts 資料庫](https://github.com/OpenZeppelin/openzeppelin-contracts)的 [`Ownable` 合約](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)簡化版，此合約指定了合約擁有者的地址，並提供將存取方法限制為只有擁有者可存取的修飾符。

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

若要在你的合約中使用這種組件，首先要匯入，再於自己的合約中擴充。 這會允許你使用基礎 `Ownable` 合約提供的修飾符來保護函數

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

另一個比較受歡迎的例子是 [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) 或 [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)。 這些庫（與基礎合約不同）提供了語言本身不具備的溢出檢查算術函數。 使用這些庫而非原生算術運算可以防止合約出現溢出，這類錯誤可能導致災難性後果！

### 標準 {#standards}

為了促進[可組合性和互通性](/developers/docs/smart-contracts/composability/)，以太坊社群已使用**以太坊意見徵求**的形式定義了幾個標準。 你可以在[標準](/developers/docs/standards/)部分閱讀更多相關資訊。

將以太坊意見徵求納入合約時，更好的做法是尋找標準實作，而非嘗試推出自己的方式。 許多智慧型合約庫包含採用最熱門 ERC 標準的做法。 例如，[ERC20 可互換代幣標準](/developers/tutorials/understand-the-erc-20-token-smart-contract/)可在 [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md)、[DappSys](https://github.com/dapphub/ds-token/) 和 [OpenZepelin](https://docs.openzeppelin.com/contracts/3.x/erc20) 中找到。 此外，一些以太坊意見徵求也提供作為以太坊意見徵求本身一部分的規範實作。

值得一提的是，一些以太坊意見徵求並非獨立的，而是對其他以太坊意見徵求的補充。 例如，[ERC2612](https://eips.ethereum.org/EIPS/eip-2612) 拓展了 ERC20，提高其可用性。

## 如何新增庫 {#how-to}

務必參考你要納入的庫文件，以掌握如何將其納入專案的具體說明。 有些 Solidity 合約庫使用 `npm` 來封裝，所以你可以直接透過 `npm install`。 大多數[編譯](/developers/docs/smart-contracts/compiling/)合約的工具會在你的 `node_modules` 中尋找智慧型合約庫，所以你可以執行：

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

無論使用哪種方法，納入庫時，務必留意[程式語言](/developers/docs/smart-contracts/languages/)的版本。 例如，如果你使用 Solidity 0.5 編寫合約，就不能使用 Solidity 0.6 庫。

## 使用時機 {#when-to-use}

在你的專案使用智慧型合約庫有幾個好處。 首先，這提供了現成的組件，可以納入你的系統，而不必自己編寫程式碼，從而節省時間。

安全性也是一個重要的優點。 開放原始碼智慧型合約庫也經常接受嚴格審查。 鑑於許多專案都依賴它們，社群有強烈動機加以持續審查。 在應用程式代碼中比起可重複使用的合約庫更容易發現錯誤。 有些庫甚至接受[外部審核](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)，以提高安全性。

然而，使用智慧型合約庫可能將你不熟悉的程式碼納入專案。 我們會想匯入合約，並將其直接納入專案，但若未充分理解該合約的作用，可能會由於意外行為，而無意中在系統中引入問題。 務必參閱要匯入的程式碼文件，然後在納入專案前審查程式碼！

最後，在決定是否納入庫時，要考慮其總體使用情況。 獲得廣泛採用的資料庫，好處在於有取得更廣大的社群和關注來審視問題。 在建立智慧型合約時，安全性應為首要考量！

## 相關工具 {#related-tools}

**OpenZeppelin Contracts：** **_最熱門的智慧型合約開發資料庫。 _**

- [文件](https://docs.openzeppelin.com/contracts/)
- [Github](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社群論壇](https://forum.openzeppelin.com/c/general/16)

**DappSys：****_安全、簡單、靈活的智慧型合約建置組件。_**

- [文件檔案](https://dappsys.readthedocs.io/)
- [Github](https://github.com/dapphub/dappsys)

**HQ20：** **_提供合約、資料庫與範例的 Solidity 專案，幫助你建立現實世界可用、功能齊全的分散式應用程式。 _**

- [Github](https://github.com/HQ20/contracts)

**Web3 Solidity SDK：** **_提供有效率建立自訂智慧型合約所需的工具_**

- [文件](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 相關教程 {#related-tutorials}

- [以太坊開發者的安全考量](/developers/docs/smart-contracts/security/) _– 構建智慧型合約時的安全考量使用教學，包括庫的使用。_
- [瞭解 ERC-20 代幣智慧型合約](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _：關於 ERC20 標準的教學，由多個資料庫提供。_

## 衍生閱讀 {#further-reading}

_知道對你有幫助的社群資源嗎？ 請編輯此頁面並新增資源！_
