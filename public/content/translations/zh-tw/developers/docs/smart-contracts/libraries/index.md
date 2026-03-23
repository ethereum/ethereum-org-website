---
title: "智慧型合約庫"
description: "探索可重複使用的智能合約函式庫與建構模塊，以加速您的以太坊開發專案。"
lang: zh-tw
---

你無需從頭開始編寫專案中的每一個智慧型合約。 因為我們有許多開放原始碼智慧型合約庫可為你的專案提供可重複利用的組件，因此你不必從零開始。

## 先決條件 {#prerequisites}

在使用智慧型合約庫之前，最好先清楚瞭解智慧型合約的結構。 如果您還沒看過[智能合約剖析](/developers/docs/smart-contracts/anatomy/)，請前往該頁面。

## 函式庫中有什麼 {#whats-in-a-library}

你通常可以在智慧型合約庫中找到兩種組件：可以添加到合約的可重複使用行為，與採納的各種標準。

### 行為 {#behaviors}

撰寫智能合約時，您很可能會發現自己需要一再撰寫類似的模式，例如指派_管理員_地址來執行合約中的受保護操作，或是在發生非預期問題時新增緊急_暫停_按鈕。

智能合約函式庫通常會以 Solidity 的 [函式庫](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) 或 [繼承](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) 形式，提供這些行為的可重複使用實作。

舉例來說，下方是 [OpenZeppelin Contracts 函式庫](https://github.com/OpenZeppelin/openzeppelin-contracts) 中 [`Ownable` 合約](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) 的簡化版本，它會指定一個地址作為合約的擁有者，並提供修飾符，將方法的存取權限僅限於該擁有者。

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

若要在你的合約中使用這種組件，首先要匯入，再於自己的合約中擴充。 這可讓您使用基礎 `Ownable` 合約提供的修飾符，來保護您自己的函式。

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

另一個常見的例子是 [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) 或 [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)。 這些庫（與基礎合約不同）提供了語言本身不具備的溢出檢查算術函數。 使用這些庫而非原生算術運算可以防止合約出現溢出，這類錯誤可能導致災難性後果！

### 標準 {#standards}

為了促進[可組合性與互通性](/developers/docs/smart-contracts/composability/)，以太坊社群以 **ERC** 的形式定義了多項標準。 您可以在[標準](/developers/docs/standards/)一節中閱讀更多相關資訊。

將以太坊意見徵求納入合約時，更好的做法是尋找標準實作，而非嘗試推出自己的方式。 許多智慧型合約庫包含採用最熱門 ERC 標準的做法。 例如，在 [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md)、[DappSys](https://github.com/dapphub/ds-token/) 和 [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20) 中，都可以找到無所不在的[ERC20 可替代代幣標準](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。 此外，一些以太坊意見徵求也提供作為以太坊意見徵求本身一部分的規範實作。

值得一提的是，一些以太坊意見徵求並非獨立的，而是對其他以太坊意見徵求的補充。 例如，[ERC2612](https://eips.ethereum.org/EIPS/eip-2612) 為 ERC20 新增了擴充功能，以改善其可用性。

## 如何新增函式庫 {#how-to}

務必參考你要納入的庫文件，以掌握如何將其納入專案的具體說明。 有數個 Solidity 合約函式庫是使用 `npm` 封裝，所以您只要 `npm install` 即可安裝。 大多數[編譯](/developers/docs/smart-contracts/compiling/)合約的工具都會在您的 `node_modules` 中尋找智能合約函式庫，因此您可以執行下列操作：

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

無論使用哪種方法，在加入函式庫時，都務必留意[語言](/developers/docs/smart-contracts/languages/)版本。 例如，如果你使用 Solidity 0.5 編寫合約，就不能使用 Solidity 0.6 庫。

## 使用時機 {#when-to-use}

在你的專案使用智慧型合約庫有幾個好處。 首先，這提供了現成的組件，可以納入你的系統，而不必自己編寫程式碼，從而節省時間。

安全性也是一個重要的優點。 開放原始碼智慧型合約庫也經常接受嚴格審查。 鑑於許多專案都依賴它們，社群有強烈動機加以持續審查。 在應用程式代碼中比起可重複使用的合約庫更容易發現錯誤。 有些函式庫也會經過[外部稽核](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)，以增加安全性。

然而，使用智慧型合約庫可能將你不熟悉的程式碼納入專案。 我們會想匯入合約，並將其直接納入專案，但若未充分理解該合約的作用，可能會由於意外行為，而無意中在系統中引入問題。 務必參閱要匯入的程式碼文件，然後在納入專案前審查程式碼！

最後，在決定是否納入庫時，要考慮其總體使用情況。 獲得廣泛採用的資料庫，好處在於有取得更廣大的社群和關注來審視問題。 在建立智慧型合約時，安全性應為首要考量！

## 相關工具 {#related-tools}

**OpenZeppelin Contracts -** **_最受歡迎的安全智能合約開發函式庫。_**

- [文件](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社群論壇](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_安全、簡單、靈活的智能合約建置組件。_**

- [文件](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_一個包含合約、函式庫和範例的 Solidity 專案，可協助您建置適用於真實世界、功能齊全的分散式應用程式。_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_提供有效率地建置自訂智能合約所需的工具_**

- [文件](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 相關教學 {#related-tutorials}

- [以太坊開發人員的安全性考量](/developers/docs/smart-contracts/security/) _– 關於建置智能合約時安全性考量的教學，包含函式庫的使用。_
- [了解 ERC-20 代幣智能合約](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- 關於 ERC20 標準的教學，由多個函式庫提供。_

## 延伸閱讀 {#further-reading}

_知道一個曾經幫助你學習更多社區或社團資源? 歡迎在本頁自由編輯或添加內容！_
