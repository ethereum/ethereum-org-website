---
title: 智能合約函式庫
description: 探索可重複使用的智能合約函式庫與建構區塊，以加速你的以太坊開發專案。
lang: zh-tw
---

你不需要從頭開始編寫專案中的每一個智能合約。有許多開源的智能合約函式庫可供使用，它們為你的專案提供可重複使用的建構區塊，讓你免於重新發明輪子。

## 先決條件 {#prerequisites}

在深入了解智能合約函式庫之前，最好先對智能合約的結構有充分的了解。如果你還沒有這樣做，請前往[智能合約剖析](/developers/docs/smart-contracts/anatomy/)。

## 函式庫裡有什麼 {#whats-in-a-library}

你通常可以在智能合約函式庫中找到兩種建構區塊：可以新增到合約中的可重複使用行為，以及各種標準的實作。

### 行為 {#behaviors}

在編寫智能合約時，你很有可能會發現自己一遍又一遍地編寫類似的模式，例如指派一個 _admin_ (管理員) 地址來執行合約中受保護的操作，或者在發生意外問題時新增一個緊急的 _pause_ (暫停) 按鈕。

智能合約函式庫通常會以[函式庫](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries)的形式，或透過 Solidity 中的[繼承](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)，來提供這些行為的可重複使用實作。

舉例來說，以下是來自 [歐本齊柏林合約函式庫](https://github.com/OpenZeppelin/openzeppelin-contracts) 中 [`Ownable` 合約](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)的簡化版本，它將一個地址指定為合約的擁有者，並提供一個修飾符 (modifier) 來限制只有該擁有者才能存取某個方法。

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

要在你的合約中使用像這樣的建構區塊，你需要先將其匯入，然後在自己的合約中繼承它。這將允許你使用基礎 `Ownable` 合約提供的修飾符來保護你自己的函式。

```solidity
import ".../Ownable.sol"; // 匯入函式庫的路徑

contract MyContract is Ownable {
    // 以下函式只能由擁有者呼叫
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

另一個受歡迎的例子是 [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) 或 [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)。這些是函式庫（與基礎合約相反），它們提供了帶有溢位檢查的算術函式，而這是語言本身未提供的。使用這些函式庫之一來取代原生算術運算是一個好習慣，可以保護你的合約免受溢位影響，因為溢位可能會帶來災難性的後果！

### 標準 {#standards}

為了促進[可組合性與互操作性](/developers/docs/smart-contracts/composability/)，以太坊社群以 **ERC** 的形式定義了多項標準。你可以在[標準](/developers/docs/standards/)章節中閱讀更多相關資訊。

當將 ERC 納入你的合約時，尋找標準實作會是個好主意，而不是試圖自己開發。許多智能合約函式庫都包含了最受歡迎的 ERC 實作。例如，無處不在的 [ERC-20 同質化代幣標準](/developers/tutorials/understand-the-erc-20-token-smart-contract/) 可以在 [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md)、[DappSys](https://github.com/dapphub/ds-token/) 和 [歐本齊柏林](https://docs.openzeppelin.com/contracts/3.x/erc20) 中找到。此外，某些 ERC 也會提供規範實作作為 ERC 本身的一部分。

值得一提的是，有些 ERC 並非獨立存在，而是其他 ERC 的附加元件。例如，[ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) 為 ERC-20 新增了一個擴充功能，以提高其可用性。

## 如何新增函式庫 {#how-to}

請務必參考你所引入之函式庫的文件，以取得如何將其納入專案的具體指示。有幾個 Solidity 合約函式庫是使用 `npm` 打包的，因此你可以直接 `npm install` 它們。大多數用於[編譯](/developers/docs/smart-contracts/compiling/)合約的工具都會在你的 `node_modules` 中尋找智能合約函式庫，因此你可以執行以下操作：

```solidity
// 這將從您的 node_modules 載入 @openzeppelin/contracts 函式庫
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

無論你使用哪種方法，在引入函式庫時，請務必留意[語言](/developers/docs/smart-contracts/languages/)版本。例如，如果你使用 Solidity 0.5 編寫合約，就不能使用適用於 Solidity 0.6 的函式庫。

## 何時使用 {#when-to-use}

在專案中使用智能合約函式庫有幾個好處。首先也是最重要的是，它為你提供了可以納入系統中現成的建構區塊，從而節省了你的時間，而無需自己編寫程式碼。

安全性也是一大優勢。開源智能合約函式庫通常會受到嚴格的審查。由於許多專案都依賴它們，社群有強烈的動機對其進行持續的審查。在應用程式碼中發現錯誤的情況，比在可重複使用的合約函式庫中發現錯誤要常見得多。有些函式庫還會進行[外部稽核](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)以獲得額外的安全性。

然而，使用智能合約函式庫也伴隨著將你不熟悉的程式碼引入專案的風險。直接匯入合約並將其納入專案是很誘人的，但如果沒有充分了解該合約的作用，你可能會因為非預期的行為而無意中在系統中引入問題。請務必閱讀你所匯入之程式碼的文件，然後在將其納入專案之前審查程式碼本身！

最後，在決定是否引入函式庫時，請考慮其整體使用情況。被廣泛採用的函式庫具有社群規模較大、有更多人關注並尋找問題的優勢。在使用智能合約進行建構時，安全性應該是你的首要考量！

## 相關工具 {#related-tools}

**歐本齊柏林合約 -** **_最受歡迎的安全智能合約開發函式庫。_**

- [文件](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社群論壇](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_安全、簡單、靈活的智能合約建構區塊。_**

- [文件](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_一個包含合約、函式庫和範例的 Solidity 專案，可協助你建構適用於現實世界的全功能分散式應用程式。_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_提供高效建構自訂智能合約所需的工具_**

- [文件](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 相關教學 {#related-tutorials}

- [以太坊開發者的安全考量](/developers/docs/smart-contracts/security/) _– 關於建構智能合約時安全考量的教學，包含函式庫的使用。_
- [了解 ERC-20 代幣智能合約](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– 關於 ERC-20 標準的教學，由多個函式庫提供。_

## 延伸閱讀 {#further-reading}

_知道有什麼社群資源對你有幫助嗎？編輯此頁面並加入它！_