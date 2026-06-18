---
title: "Vyper ERC-721 合約導覽"
description: "Ryuya Nakamura 的 ERC-721 合約及其運作方式"
author: "奧里·波梅蘭茨"
lang: zh-tw
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## 簡介 {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) 標準用於持有非同質化代幣 (NFT) 的所有權。
[ERC-20](/developers/docs/standards/tokens/erc-20/) 代幣的表現如同商品，因為個別代幣之間沒有差異。
相較之下，ERC-721 代幣專為相似但不完全相同的資產而設計，例如不同的[卡通貓](https://www.cryptokitties.co/)或不同房地產的產權。

在本文中，我們將分析 [Ryuya Nakamura 的 ERC-721 合約](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)。
此合約使用 [Vyper](https://vyper.readthedocs.io/en/latest/index.html) 撰寫，這是一種類似 Python 的合約語言，其設計目的是讓撰寫不安全程式碼的難度高於 Solidity。

## 合約 {#contract}

```python
# @dev 實作 ERC-721 非同質化代幣標準。
# @author Ryuya Nakamura (@nrryuya)
# 修改自：https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

與 Python 一樣，Vyper 中的註解以雜湊符號 (`#`) 開頭，並持續到該行結束。包含 `@<keyword>` 的註解會被 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) 用來產生人類可讀的文件。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 介面內建於 Vyper 語言中。
[你可以在這裡查看程式碼定義](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)。
介面定義是使用 Python 而非 Vyper 撰寫的，因為介面不僅在區塊鏈內部使用，當從外部客戶端（可能使用 Python 撰寫）向區塊鏈發送交易時也會用到。

第一行匯入介面，第二行指定我們在此處實作它。

### ERC721Receiver 介面 {#receiver-interface}

```python
# safeTransferFrom() 呼叫的合約介面
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 支援兩種類型的轉帳：

- `transferFrom`，允許發送者指定任何目標地址，並將轉帳責任交給發送者。這意味著你可以轉帳到無效地址，在這種情況下，NFT 將永遠遺失。
- `safeTransferFrom`，會檢查目標地址是否為合約。如果是，ERC-721 合約會詢問接收合約是否願意接收該 NFT。

為了回應 `safeTransferFrom` 請求，接收合約必須實作 `ERC721Receiver`。

```python
            _operator: address,
            _from: address,
```

`_from` 地址是代幣的目前擁有者。`_operator` 地址是請求轉帳的地址（由於授權額度的關係，這兩者可能不同）。

```python
            _tokenId: uint256,
```

ERC-721 代幣 ID 為 256 位元。通常，它們是透過對代幣所代表內容的描述進行雜湊運算而建立的。

```python
            _data: Bytes[1024]
```

該請求最多可包含 1024 位元組的使用者資料。

```python
        ) -> bytes32: view
```

為了防止合約意外接受轉帳的情況，回傳值不是布林值，而是具有特定值的 256 位元資料。

此函式是一個 `view`，這意味著它可以讀取區塊鏈的狀態，但不能修改它。

### 事件 {#events}

觸發[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是為了通知區塊鏈外部的使用者和伺服器發生了事件。請注意，區塊鏈上的合約無法存取事件的內容。

```python
# @dev 當任何 NFT 的所有權透過任何機制改變時觸發。此事件在 NFT 被
#      建立（`from` == 0）和銷毀（`to` == 0）時觸發。例外：在合約建立期間，任何
#      數量的 NFT 可以被建立和分配，而不會觸發 Transfer 事件。在任何
#      轉帳時，該 NFT 的已授權地址（如果有的話）會被重設為無。
# @param _from NFT 的發送者（如果地址是零地址，則表示代幣建立）。
# @param _to NFT 的接收者（如果地址是零地址，則表示代幣銷毀）。
# @param _tokenId 被轉帳的 NFT。
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

這類似於 ERC-20 的 Transfer 事件，差別在於我們報告的是 `tokenId` 而不是數量。沒有人擁有零地址，因此按照慣例，我們使用它來報告代幣的鑄造和銷毀。

```python
# @dev 當 NFT 的已授權地址被更改或重新確認時觸發。零
#      地址表示沒有已授權地址。當 Transfer 事件觸發時，這也
#      表示該 NFT 的已授權地址（如果有的話）被重設為無。
# @param _owner NFT 的擁有者。
# @param _approved 我們正在授權的地址。
# @param _tokenId 我們正在授權的 NFT。
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 的 approval（授權）類似於 ERC-20 的授權額度。允許特定地址轉帳特定代幣。這為合約在接受代幣時提供了一種回應機制。合約無法監聽事件，因此如果你只是將代幣轉帳給它們，它們並不會「知道」。透過這種方式，擁有者首先提交授權，然後向合約發送請求：「我已授權你轉帳代幣 X，請執行...」。

這是一項設計選擇，旨在使 ERC-721 標準與 ERC-20 標準相似。因為 ERC-721 代幣是不可替代的，合約也可以透過查看代幣的所有權來識別它獲得了特定代幣。

```python
# @dev 當擁有者啟用或停用操作員時觸發。操作員可以管理
#      擁有者的所有 NFT。
# @param _owner NFT 的擁有者。
# @param _operator 我們正在設定操作員權限的地址。
# @param _approved 操作員權限的狀態（如果賦予操作員權限則為 true，如果
# 撤銷則為 false）。
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

有時擁有一個可以管理帳戶中所有特定類型代幣（由特定合約管理的代幣）的_操作員 (operator)_ 是很有用的，這類似於委託書。例如，我可能想將此權力授予一個合約，該合約會檢查我是否已有六個月未與其聯繫，如果是，則將我的資產分配給我的繼承人（如果其中一人提出要求，因為合約在沒有被交易呼叫的情況下無法執行任何操作）。在 ERC-20 中，我們只需給予繼承合約很高的授權額度即可，但這對 ERC-721 不起作用，因為代幣是不可替代的。這就是等效的機制。

`approved` 值告訴我們該事件是為了授權，還是撤銷授權。

### 狀態變數 {#state-vars}

這些變數包含代幣的目前狀態：哪些代幣可用以及誰擁有它們。其中大部分是 `HashMap` 物件，即[存在於兩種類型之間的單向對映](https://vyper.readthedocs.io/en/latest/types.html#mappings)。

```python
# @dev 從 NFT ID 到擁有它的地址的映射。
idToOwner: HashMap[uint256, address]

# @dev 從 NFT ID 到已授權地址的映射。
idToApprovals: HashMap[uint256, address]
```

以太坊中的使用者和合約身分由 160 位元地址表示。這兩個變數將代幣 ID 對映到其擁有者以及被授權轉帳它們的地址（每個代幣最多一個）。在以太坊中，未初始化的資料始終為零，因此如果沒有擁有者或被授權的轉帳者，該代幣的值為零。

```python
# @dev 從擁有者地址到其代幣數量的映射。
ownerToNFTokenCount: HashMap[address, uint256]
```

此變數保存每個擁有者的代幣數量。沒有從擁有者到代幣的對映，因此識別特定擁有者擁有的代幣的唯一方法是回顧區塊鏈的事件歷史記錄，並查看相應的 `Transfer` 事件。我們可以使用此變數來了解何時已取得所有 NFT，而無需進一步回溯時間。

請注意，此演算法僅適用於使用者介面和外部伺服器。在區塊鏈本身上執行的程式碼無法讀取過去的事件。

```python
# @dev 從擁有者地址到操作員地址映射的映射。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

一個帳戶可能有多個操作員。簡單的 `HashMap` 不足以追蹤它們，因為每個金鑰只對應一個值。相反地，你可以使用 `HashMap[address, bool]` 作為值。預設情況下，每個地址的值為 `False`，這意味著它不是操作員。你可以根據需要將值設定為 `True`。

```python
# @dev 鑄造者的地址，可以鑄造代幣
minter: address
```

必須以某種方式鑄造新代幣。在此合約中，只有一個實體被允許這樣做，即 `minter`。例如，這對於遊戲來說可能已經足夠了。對於其他目的，可能需要建立更複雜的商業邏輯。

```python
# @dev 介面 ID 到布林值的映射，表示是否支援該介面
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC-165 的 ERC-165 介面 ID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC-721 的 ERC-165 介面 ID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) 指定了一種機制，讓合約可以揭露應用程式如何與其通訊，以及它符合哪些 ERC 標準。在這種情況下，該合約符合 ERC-165 和 ERC-721。

### 函式 {#functions}

這些是實際實作 ERC-721 的函式。

#### 建構函式 {#constructor}

```python
@external
def __init__():
```

在 Vyper 中，與 Python 一樣，建構函式被稱為 `__init__`。

```python
    """
    @dev 合約建構函式。
    """
```

在 Python 和 Vyper 中，你也可以透過指定多行字串（以 `"""` 開頭和結尾）來建立註解，並且不以任何方式使用它。這些註解也可以包含 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

要存取狀態變數，你可以使用 `self.<variable name>`（同樣地，與 Python 相同）。

#### 視圖函式 {#views}

這些是不會修改區塊鏈狀態的函式，因此如果從外部呼叫它們，可以免費執行。如果視圖函式由合約呼叫，它們仍然必須在每個節點上執行，因此會消耗燃料。

```python
@view
@external
```

在函式定義之前，這些以 at 符號 (`@`) 開頭的關鍵字稱為_裝飾器 (decorations)_。它們指定了可以呼叫函式的情況。

- `@view` 指定此函式為視圖。
- `@external` 指定此特定函式可以由交易和其他合約呼叫。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

與 Python 相反，Vyper 是一種[靜態型別語言](https://wikipedia.org/wiki/Type_system#Static_type_checking)。如果不指定[資料型別](https://vyper.readthedocs.io/en/latest/types.html)，就無法宣告變數或函式參數。在這種情況下，輸入參數是 `bytes32`，一個 256 位元的值（256 位元是[以太坊虛擬機](/developers/docs/evm/)的原生字組大小）。輸出是一個布林值。按照慣例，函式參數的名稱以底線 (`_`) 開頭。

```python
    """
    @dev 介面識別在 ERC-165 中指定。
    @param _interfaceID 介面的 ID
    """
    return self.supportedInterfaces[_interfaceID]
```

從 `self.supportedInterfaces` HashMap 回傳值，該值在建構函式 (`__init__`) 中設定。

```python
### 檢視函式 ###
```

這些是視圖函式，可讓使用者和其他合約取得有關代幣的資訊。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev 回傳 `_owner` 擁有的 NFT 數量。
         如果 `_owner` 是零地址則拋出錯誤。分配給零地址的 NFT 被視為無效。
    @param _owner 要查詢餘額的地址。
    """
    assert _owner != ZERO_ADDRESS
```

此行[斷言](https://vyper.readthedocs.io/en/latest/statements.html#assert) `_owner` 不為零。如果為零，則表示發生錯誤，操作將被回滾。

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev 回傳 NFT 擁有者的地址。
         如果 `_tokenId` 不是有效的 NFT 則拋出錯誤。
    @param _tokenId NFT 的識別碼。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT 則拋出錯誤
    assert owner != ZERO_ADDRESS
    return owner
```

在以太坊虛擬機 (EVM) 中，任何未儲存值的儲存空間皆為零。如果在 `_tokenId` 處沒有代幣，則 `self.idToOwner[_tokenId]` 的值為零。在這種情況下，函式會回滾。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 取得單一 NFT 的已授權地址。
         如果 `_tokenId` 不是有效的 NFT 則拋出錯誤。
    @param _tokenId 要查詢授權的 NFT ID。
    """
    # 如果 `_tokenId` 不是有效的 NFT 則拋出錯誤
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

請注意，`getApproved` <em>可以</em>回傳零。如果代幣有效，它會回傳 `self.idToApprovals[_tokenId]`。如果沒有授權者，該值為零。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev 檢查 `_operator` 是否為 `_owner` 的已授權操作員。
    @param _owner 擁有 NFT 的地址。
    @param _operator 代表擁有者行事的地址。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

此函式檢查 `_operator` 是否被允許管理此合約中 `_owner` 的所有代幣。因為可以有多個操作員，所以這是一個兩層的 HashMap。

#### 轉帳輔助函式 {#transfer-helpers}

這些函式實作了屬於轉帳或管理代幣一部分的操作。

```python

### 轉帳函式輔助工具 ###

@view
@internal
```

這個裝飾器 `@internal` 意味著該函式只能從同一合約內的其他函式存取。按照慣例，這些函式名稱也以底線 (`_`) 開頭。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 回傳給定的花費者是否可以轉帳給定的代幣 ID
    @param spender 要查詢的花費者地址
    @param tokenId 要轉帳的代幣的 uint256 ID
    @return bool msg.sender 是否被授權使用給定的代幣 ID、
        是否為擁有者的操作員，或是否為代幣的擁有者
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

有三種方式可以允許一個地址轉帳代幣：

1. 該地址是代幣的擁有者
2. 該地址被授權花費該代幣
3. 該地址是代幣擁有者的操作員

上面的函式可以是一個視圖，因為它不會改變狀態。為了降低營運成本，任何_可以_是視圖的函式都_應該_是視圖。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 將 NFT 新增至給定地址
         如果 `_tokenId` 已被某人擁有則拋出錯誤。
    """
    # 如果 `_tokenId` 已被某人擁有則拋出錯誤
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 更改擁有者
    self.idToOwner[_tokenId] = _to
    # 更改數量追蹤
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 從給定地址移除 NFT
         如果 `_from` 不是目前的擁有者則拋出錯誤。
    """
    # 如果 `_from` 不是目前的擁有者則拋出錯誤
    assert self.idToOwner[_tokenId] == _from
    # 更改擁有者
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # 更改數量追蹤
    self.ownerToNFTokenCount[_from] -= 1
```

當轉帳出現問題時，我們會回滾該呼叫。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 清除給定地址的授權
         如果 `_owner` 不是目前的擁有者則拋出錯誤。
    """
    # 如果 `_owner` 不是目前的擁有者則拋出錯誤
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # 重設授權
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

僅在必要時才更改值。狀態變數存在於儲存空間中。寫入儲存空間是 EVM（以太坊虛擬機）執行的最昂貴操作之一（就[燃料](/developers/docs/gas/)而言）。因此，最好盡量減少寫入操作，即使寫入現有值的成本也很高。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev 執行 NFT 的轉帳。
         除非 `msg.sender` 是目前的擁有者、已授權的操作員，或是此 NFT 的已授權
         地址，否則拋出錯誤。（注意：私有函式中不允許使用 `msg.sender`，因此傳遞 `_sender`。）
         如果 `_to` 是零地址則拋出錯誤。
         如果 `_from` 不是目前的擁有者則拋出錯誤。
         如果 `_tokenId` 不是有效的 NFT 則拋出錯誤。
    """
```

我們有這個內部函式是因為有兩種轉帳代幣的方式（一般和安全），但我們希望程式碼中只有一個執行轉帳的位置，以使稽核更容易。

```python
    # 檢查條件
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # 如果 `_to` 是零地址則拋出錯誤
    assert _to != ZERO_ADDRESS
    # 清除授權。如果 `_from` 不是目前的擁有者則拋出錯誤
    self._clearApproval(_from, _tokenId)
    # 移除 NFT。如果 `_tokenId` 不是有效的 NFT 則拋出錯誤
    self._removeTokenFrom(_from, _tokenId)
    # 新增 NFT
    self._addTokenTo(_to, _tokenId)
    # 記錄轉帳
    log Transfer(_from, _to, _tokenId)
```

要在 Vyper 中觸發事件，你可以使用 `log` 語句（[請參閱此處以了解更多詳細資訊](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)）。

#### 轉帳函式 {#transfer-funs}

```python

### 轉帳函式 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev 除非 `msg.sender` 是目前的擁有者、已授權的操作員，或是此 NFT 的已授權
         地址，否則拋出錯誤。
         如果 `_from` 不是目前的擁有者則拋出錯誤。
         如果 `_to` 是零地址則拋出錯誤。
         如果 `_tokenId` 不是有效的 NFT 則拋出錯誤。
    @notice 呼叫者有責任確認 `_to` 能夠接收 NFT，否則
            它們可能會永久遺失。
    @param _from NFT 的目前擁有者。
    @param _to 新擁有者。
    @param _tokenId 要轉帳的 NFT。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

此函式可讓你轉帳到任意地址。除非該地址是使用者，或者是知道如何轉帳代幣的合約，否則你轉帳的任何代幣都將卡在該地址中且毫無用處。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev 將 NFT 的所有權從一個地址轉帳到另一個地址。
         除非 `msg.sender` 是目前的擁有者、已授權的操作員，或是
         此 NFT 的已授權地址，否則拋出錯誤。
         如果 `_from` 不是目前的擁有者則拋出錯誤。
         如果 `_to` 是零地址則拋出錯誤。
         如果 `_tokenId` 不是有效的 NFT 則拋出錯誤。
         如果 `_to` 是智慧合約，它會在 `_to` 上呼叫 `onERC721Received`，如果
         回傳值不是 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` 則拋出錯誤。
         注意：bytes4 由帶有填充的 bytes32 表示
    @param _from NFT 的目前擁有者。
    @param _to 新擁有者。
    @param _tokenId 要轉帳的 NFT。
    @param _data 沒有指定格式的額外資料，在呼叫 `_to` 時發送。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

先進行轉帳是可以的，因為如果出現問題，我們無論如何都會回滾，因此呼叫中所做的一切都將被取消。

```python
    if _to.is_contract: # 檢查 `_to` 是否為合約地址
```

首先檢查該地址是否為合約（是否包含程式碼）。如果不是，則假設它是一個使用者地址，且使用者將能夠使用或轉帳該代幣。但不要因此產生虛假的安全感。即使使用 `safeTransferFrom`，如果你將代幣轉帳到一個沒有人知道私鑰的地址，你仍然會遺失代幣。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

呼叫目標合約以查看它是否可以接收 ERC-721 代幣。

```python
        # 如果轉帳目的地是未實作 'onERC721Received' 的合約則拋出錯誤
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

如果目標是一個合約，但它不接受 ERC-721 代幣（或者決定不接受這次特定的轉帳），則回滾。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev 設定或重新確認 NFT 的已授權地址。零地址表示沒有已授權地址。
         除非 `msg.sender` 是目前的 NFT 擁有者，或是目前擁有者的已授權操作員，否則拋出錯誤。
         如果 `_tokenId` 不是有效的 NFT 則拋出錯誤。（注意：這沒有寫在 EIP 中）
         如果 `_approved` 是目前的擁有者則拋出錯誤。（注意：這沒有寫在 EIP 中）
    @param _approved 要為給定 NFT ID 授權的地址。
    @param _tokenId 要授權的代幣 ID。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT 則拋出錯誤
    assert owner != ZERO_ADDRESS
    # 如果 `_approved` 是目前的擁有者則拋出錯誤
    assert _approved != owner
```

按照慣例，如果你不想有授權者，你應該指定零地址，而不是你自己。

```python
    # 檢查條件
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

要設定授權，你可以是擁有者，或者是擁有者授權的操作員。

```python
    # 設定授權
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev 啟用或停用第三方（「操作員」）管理所有
         `msg.sender` 資產的授權。它也會觸發 ApprovalForAll 事件。
         如果 `_operator` 是 `msg.sender` 則拋出錯誤。（注意：這沒有寫在 EIP 中）
    @notice 即使發送者當時沒有擁有任何代幣，這也能運作。
    @param _operator 要新增至已授權操作員集合的地址。
    @param _approved 如果授權操作員則為 true，撤銷授權則為 false。
    """
    # 如果 `_operator` 是 `msg.sender` 則拋出錯誤
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 鑄造新代幣與銷毀現有代幣 {#mint-burn}

建立合約的帳戶是 `minter`，即被授權鑄造新 NFT 的超級使用者。然而，即使是它也不允許銷毀現有代幣。只有擁有者或擁有者授權的實體才能這樣做。

```python
### 鑄造與銷毀函式 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

此函式始終回傳 `True`，因為如果操作失敗，它將被回滾。

```python
    """
    @dev 鑄造代幣的函式
         如果 `msg.sender` 不是鑄造者則拋出錯誤。
         如果 `_to` 是零地址則拋出錯誤。
         如果 `_tokenId` 已被某人擁有則拋出錯誤。
    @param _to 將接收鑄造代幣的地址。
    @param _tokenId 要鑄造的代幣 ID。
    @return 指示操作是否成功的布林值。
    """
    # 如果 `msg.sender` 不是鑄造者則拋出錯誤
    assert msg.sender == self.minter
```

只有鑄造者（建立 ERC-721 合約的帳戶）可以鑄造新代幣。如果我們將來想要更改鑄造者的身分，這可能會成為一個問題。在生產環境的合約中，你可能會需要一個允許鑄造者將鑄造權限轉移給其他人的函式。

```python
    # 如果 `_to` 是零地址則拋出錯誤
    assert _to != ZERO_ADDRESS
    # 新增 NFT。如果 `_tokenId` 已被某人擁有則拋出錯誤
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

按照慣例，鑄造新代幣被視為從零地址轉帳。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 銷毀特定的 ERC-721 代幣。
         除非 `msg.sender` 是目前的擁有者、已授權的操作員，或是此 NFT 的已授權
         地址，否則拋出錯誤。
         如果 `_tokenId` 不是有效的 NFT 則拋出錯誤。
    @param _tokenId 要銷毀的 ERC-721 代幣的 uint256 ID。
    """
    # 檢查條件
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT 則拋出錯誤
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

任何被允許轉帳代幣的人都被允許銷毀它。雖然銷毀看起來等同於轉帳到零地址，但零地址實際上並沒有接收到代幣。這使我們能夠釋放用於該代幣的所有儲存空間，從而降低交易的燃料成本。

## 使用此合約 {#using-contract}

與 Solidity 相反，Vyper 沒有繼承。這是一個刻意的設計選擇，目的是使程式碼更清晰，從而更容易確保安全。因此，要建立你自己的 Vyper ERC-721 合約，你可以採用[此合約](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)並對其進行修改，以實作你想要的商業邏輯。

## 結論 {#conclusion}

作為複習，以下是此合約中一些最重要的概念：

- 為了透過安全轉帳接收 ERC-721 代幣，合約必須實作 `ERC721Receiver` 介面。
- 即使你使用安全轉帳，如果你將代幣發送到一個私鑰未知的地址，代幣仍然可能會卡住。
- 當操作出現問題時，最好`revert`該呼叫，而不是僅僅回傳一個失敗值。
- 當 ERC-721 代幣擁有擁有者時，它們才存在。
- 有三種方式可以獲得轉帳 NFT 的授權。你可以是擁有者、被授權轉帳特定代幣，或者是擁有者所有代幣的操作員。
- 過去的事件只能在區塊鏈外部看到。在區塊鏈內部執行的程式碼無法查看它們。

現在去實作安全的 Vyper 合約吧。

[點擊此處查看我的更多作品](https://cryptodocguy.pro/)。