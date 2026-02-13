---
title: "Vyper ERC-721 合約逐步解說"
description: "Ryuya Nakamura 的 ERC-721 合約及其運作方式"
author: Ori Pomerantz
lang: zh-tw
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## 介紹 {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) 標準是用於持有非同質化代幣 (NFT) 所有權的標準。
[ERC-20](/developers/docs/standards/tokens/erc-20/) 代幣的行為類似商品，因為個別代幣之間沒有任何區別。
與之對比，ERC-721 代幣是為相似但不相同的資產所設計，例如不同的貓
卡通或不同房地產的所有權狀。

在本文中，我們將分析 [Ryuya Nakamura 的 ERC-721 合約](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)。
此合約以 [Vyper](https://vyper.readthedocs.io/en/latest/index.html) 編寫，這是一種近似 Python 的合約語言，其設計目的是讓編寫不安全的程式碼比在 Solidity 中更困難。

## 合約 {#contract}

```python
# @dev ERC-721 非同質化代幣標準的實作。
# @author Ryuya Nakamura (@nrryuya)
# 修改自：https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper 中的註解與 Python 相同，以井字號 (`#`) 開頭，並一直延續到該行結尾。 包含 `@<關鍵字>` 的註解會由 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) 用來產生人類可讀的文件。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 介面內建於 Vyper 語言中。
[你可以在這裡看到程式碼定義](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)。
介面定義是以 Python 而非 Vyper 編寫的，因為介面不僅在區塊鏈內部使用，也用於從可能以 Python 編寫的外部用戶端向區塊鏈傳送交易。

第一行匯入介面，第二行則指明我們在此處實作該介面。

### ERC721Receiver 介面 {#receiver-interface}

```python
# safeTransferFrom() 呼叫的合約介面
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 支援兩種轉移類型：

- `transferFrom`，它讓傳送方可以指定任何目標地址，並將轉移的責任歸於傳送方。 這意味著你可以轉移到無效地址，在這種情況下，NFT 將會永久遺失。
- `safeTransferFrom`，它會檢查目標地址是否為合約。 若是，ERC-721 合約會詢問接收合約是否願意接收該 NFT。

為了回應 `safeTransferFrom` 的請求，接收合約必須實作 `ERC721Receiver`。

```python
            _operator: address,
            _from: address,
```

`_from` 地址是代幣的目前擁有者。 `_operator` 地址是請求轉移的地址 (由於有授權額度的關係，這兩個地址可能不相同)。

```python
            _tokenId: uint256,
```

ERC-721 代幣 ID 是 256 位元。 一般而言，它們是透過對代幣所代表之物的描述進行哈希運算而建立的。

```python
            _data: Bytes[1024]
```

此請求最多可包含 1024 位元組的使用者資料。

```python
        ) -> bytes32: view
```

為防止合約意外接受轉移的情況，傳回值不是布林值，而是帶有特定值的 256 位元數值。

此函式為 `view` 函式，代表它可以讀取區塊鏈的狀態，但不能修改它。

### Events {#events}

[事件](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
會被發出以通知區塊鏈外部的使用者和伺服器發生的事件。 請注意，事件的內容對於區塊鏈上的合約是不可用的。

```python
# @dev 當任何 NFT 的所有權因任何機制發生變更時發出。當 NFT 被
#      建立 (`from` == 0) 和銷毀 (`to` == 0) 時會發出此事件。例外：在合約建立期間，可以
#      建立並指派任意數量的 NFT 而不發出 Transfer 事件。在任何
#      轉移時，該 NFT 的核准地址 (若有) 會被重設為無。
# @param _from NFT 的傳送方 (若地址為零地址，則表示代幣建立)。
# @param _to NFT 的接收方 (若地址為零地址，則表示代幣銷毀)。
# @param _tokenId 已轉移的 NFT。
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

這與 ERC-20 的 Transfer 事件相似，差別在於我們回報的是 `tokenId` 而非數量。
沒有人擁有零地址，因此按照慣例，我們用它來回報代幣的建立和銷毀。

```python
# @dev 當一個 NFT 的核准地址被變更或再次確認時發出。零
#      地址表示沒有核准地址。當 Transfer 事件發出時，這也
#      表示該 NFT 的核准地址 (若有) 被重設為無。
# @param _owner NFT 的擁有者。
# @param _approved 我們正在核准的地址。
# @param _tokenId 我們正在核准的 NFT。
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 的核准類似於 ERC-20 的授權額度。 一個特定的地址被允許轉移一個特定的代幣。 這提供了一種機制，讓合約在接受代幣時能夠做出回應。 合約無法監聽事件，所以如果你只是將代幣轉移給它們，它們不會「知道」這件事。 這樣一來，擁有者首先提交一項核准，然後向合約傳送請求："我已核准你轉移代幣
X，請執行..."。

這是一項設計上的選擇，目的是讓 ERC-721 標準與 ERC-20 標準相似。 由於 ERC-721 代幣並非同質化代幣，合約也可以透過查看代幣的所有權來識別它是否取得了特定的代幣。

```python
# @dev 當擁有者的操作員被啟用或停用時發出。操作員可以管理
#      該擁有者的所有 NFT。
# @param _owner NFT 的擁有者。
# @param _operator 我們要為其設定操作員權限的地址。
# @param _approved 操作員權限的狀態 (true 表示授予操作員權限，false 表示
# 撤銷)。
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

有時候，有一個可以管理某帳戶所有特定類型代幣（由特定合約管理的代幣）的_操作員_是很有用的，這類似於授權書。 例如，我可能會想將此權力賦予一個合約，讓它檢查我是否六個月未與其聯繫，若是，則將我的資產分配給我的繼承人 (前提是其中一位繼承人提出請求，因為合約若無交易呼叫則無法執行任何動作)。 在 ERC-20 中，我們可以只給予繼承合約一個高額的授權額度，但這在 ERC-721 中行不通，因為其代幣並非同質化的。 這就是等效的做法。

`approved` 值告訴我們該事件是進行核准，還是撤銷核准。

### 狀態變數 {#state-vars}

這些變數包含代幣的目前狀態：哪些是可用的以及誰擁有它們。 這些變數大部分是 `HashMap` 物件，是[存在於兩種類型之間的單向映射](https://vyper.readthedocs.io/en/latest/types.html#mappings)。

```python
# @dev 從 NFT ID 到其擁有者地址的映射。
idToOwner: HashMap[uint256, address]

# @dev 從 NFT ID 到核准地址的映射。
idToApprovals: HashMap[uint256, address]
```

在以太坊中，使用者和合約的身分由 160 位元的地址表示。 這兩個變數從代幣 ID 映射到其擁有者以及被核准轉移它們的人 (每個代幣最多一個)。 在以太坊中，未初始化的資料始終為零，所以如果沒有擁有者或核准的轉移者，該代幣的值就是零。

```python
# @dev 從擁有者地址到其代幣數量的映射。
ownerToNFTokenCount: HashMap[address, uint256]
```

此變數持有每個擁有者的代幣數量。 由於沒有從擁有者到代幣的映射，所以識別特定擁有者所擁有的代幣的唯一方法是回顧區塊鏈的事件歷史，並查看相應的 `Transfer` 事件。 我們可以使用這個變數來知道我們何時擁有了所有的 NFT，而不需要再回溯更早的時間。

請注意，此演算法僅適用於使用者介面和外部伺服器。 在區塊鏈上執行的程式碼本身無法讀取過去的事件。

```python
# @dev 從擁有者地址到操作員地址映射的映射。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

一個帳戶可能有多個操作員。 一個簡單的 `HashMap` 並不足以追蹤它們，因為每個鍵只會對應到一個值。 取而代之，你可以使用 `HashMap[address, bool]` 作為值。 預設情況下，每個地址的值為 `False`，這意味著它不是操作員。 你可以視需要將值設定為 `True`。

```python
# @dev 鑄幣者的地址，可以鑄造代幣
minter: address
```

新代幣必須以某種方式被建立出來。 在此合約中，只有一個實體被允許這麼做，即 `minter` (鑄幣者)。 例如，對於一個遊戲來說，這可能就足夠了。 對於其他目的，可能需要建立更複雜的商業邏輯。

```python
# @dev 從介面 ID 到布林值的映射，代表是否支援該介面
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 的 ERC165 介面 ID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721 的 ERC165 介面 ID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) 規定了一種機制，讓合約能夠揭露應用程式可以如何與其通訊，以及它遵循哪些 ERC 標準。 在此例中，合約遵循 ERC-165 和 ERC-721。

### 函數 {#functions}

這些是實際實作 ERC-721 的函式。

#### 建構函式 {#constructor}

```python
@external
def __init__():
```

在 Vyper 中，與 Python 相同，建構函式稱為 `__init__`。

```python
    """
    @dev 合約建構函式。
    """
```

在 Python 和 Vyper 中，你也可以透過指定一個多行字串 (以 `"""` 開頭和結尾) 且不以任何方式使用它來建立註解。 這些註解也可以包含 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

若要存取狀態變數，請使用 `self.<變數名稱>`` (同樣，這和 Python 一樣)。

#### 檢視函式 {#views}

這些函式不會修改區塊鏈的狀態，因此如果從外部呼叫它們，可以免費執行。 如果檢視函式是由合約呼叫的，它們仍然必須在每個節點上執行，因此會產生 gas 費用。

```python
@view
@external
```

在函式定義之前，以 at 符號 (`@`) 開頭的這些關鍵字稱為_裝飾器_。 它們指定了可以呼叫函式的條件。

- `@view` 指定此函式為檢視函式。
- `@external` 指定此特定函式可由交易和其他合約呼叫。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

與 Python 不同，Vyper 是一種[靜態型別語言](https://wikipedia.org/wiki/Type_system#Static_type_checking)。
若不指定[資料類型](https://vyper.readthedocs.io/en/latest/types.html)，則無法宣告變數或函式參數。 在此例中，輸入參數為 `bytes32`，一個 256 位元的值 (256 位元是 [以太坊虛擬機](/developers/docs/evm/) 的原生字組大小)。 輸出是一個布林值。 按照慣例，函式參數的名稱以下底線 (`_`) 開頭。

```python
    """
    @dev 介面識別在 ERC-165 中指定。
    @param _interfaceID 介面的 ID
    """
    return self.supportedInterfaces[_interfaceID]
```

從 `self.supportedInterfaces` HashMap 傳回值，該值在建構函式 (`__init__`) 中設定。

```python
### 檢視函式 ###

```

這些是讓使用者和其他合約能取得代幣相關資訊的檢視函式。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev 傳回 `_owner` 擁有的 NFT 數量。
         如果 `_owner` 是零地址，則會擲出錯誤。指派給零地址的 NFT 被視為無效。
    @param _owner 要查詢餘額的地址。
    """
    assert _owner != ZERO_ADDRESS
```

此行[斷言](https://vyper.readthedocs.io/en/latest/statements.html#assert)`_owner` 不為零。 如果為零，則會出現錯誤並且操作將被還原。

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev 傳回 NFT 擁有者的地址。
         如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤。
    @param _tokenId NFT 的識別碼。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤
    assert owner != ZERO_ADDRESS
    return owner
```

在以太坊虛擬機 (evm) 中，任何沒有儲存值的儲存空間都為零。
如果 `_tokenId` 沒有代幣，則 `self.idToOwner[_tokenId]` 的值為零。 在這種情況下，函式會還原。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 取得單一 NFT 的核准地址。
         如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤。
    @param _tokenId 要查詢核准的 NFT ID。
    """
    # 如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

注意，`getApproved` _可以_傳回零。 如果代幣有效，它會傳回 `self.idToApprovals[_tokenId]`。
如果沒有核准者，該值為零。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev 檢查 `_operator` 是否為 `_owner` 的核准操作員。
    @param _owner 擁有 NFT 的地址。
    @param _operator 代表擁有者行事的地址。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

此函式檢查 `_operator` 是否被允許管理此合約中 `_owner` 的所有代幣。
因為可以有多個操作員，這是一個兩層的 HashMap。

#### 轉移輔助函式 {#transfer-helpers}

這些函式實作了轉移或管理代幣的部分操作。

```python

### 轉移函式輔助工具 ###

@view
@internal
```

這個裝飾器 `@internal` 表示該函式只能在同一個合約內的其他函式中存取。 按照慣例，這些函式名稱也以下底線 (`_`) 開頭。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 傳回給定的花費者是否可以轉移給定的代幣 ID
    @param spender 要查詢的花費者地址
    @param tokenId 要轉移的代幣的 uint256 ID
    @return bool 表示 msg.sender 是否被核准用於給定的代幣 ID、
        是否為擁有者的操作員，或是否為代幣的擁有者
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

有三種方式可以讓一個地址被允許轉移代幣：

1. 該地址是代幣的擁有者
2. 該地址被核准花費該代幣
3. 該地址是代幣擁有者的操作員

上面的函式可以是檢視函式，因為它不會改變狀態。 為了降低操作成本，任何_可以_成為檢視函式的函式都_應該_是檢視函式。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 將 NFT 新增到給定地址
         如果 `_tokenId` 已被他人擁有，則會擲出錯誤。
    """
    # 如果 `_tokenId` 已被他人擁有，則會擲出錯誤
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 變更擁有者
    self.idToOwner[_tokenId] = _to
    # 變更計數追蹤
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 從給定地址移除 NFT
         如果 `_from` 不是目前的擁有者，則會擲出錯誤。
    """
    # 如果 `_from` 不是目前的擁有者，則會擲出錯誤
    assert self.idToOwner[_tokenId] == _from
    # 變更擁有者
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # 變更計數追蹤
    self.ownerToNFTokenCount[_from] -= 1
```

當轉移出現問題時，我們會還原該呼叫。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 清除給定地址的核准
         如果 `_owner` 不是目前的擁有者，則會擲出錯誤。
    """
    # 如果 `_owner` 不是目前的擁有者，則會擲出錯誤
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # 重設核准
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

只有在必要時才變更值。 狀態變數存在儲存空間中。 寫入儲存空間是 EVM (以太坊虛擬機) 執行成本最昂貴的操作之一 (以 [gas](/developers/docs/gas/) 費用計算)。 因此，最好盡量減少寫入，即使寫入現有值也具有高成本。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev 執行 NFT 的轉移。
         除非 `msg.sender` 是目前的擁有者、授權的操作員或此 NFT 的核准
         地址，否則會擲出錯誤。(注意：私有函式中不允許 `msg.sender`，所以傳入 `_sender`。)
         如果 `_to` 是零地址，則會擲出錯誤。
         如果 `_from` 不是目前的擁有者，則會擲出錯誤。
         如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤。
    """
```

我們有這個內部函式，因為有兩種轉移代幣的方式 (常規和安全)，但我們希望只在程式碼中的一個位置執行它，以便於審核。

```python
    # 檢查需求
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # 如果 `_to` 是零地址，則會擲出錯誤
    assert _to != ZERO_ADDRESS
    # 清除核准。如果 `_from` 不是目前的擁有者，則會擲出錯誤
    self._clearApproval(_from, _tokenId)
    # 移除 NFT。如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤
    self._removeTokenFrom(_from, _tokenId)
    # 新增 NFT
    self._addTokenTo(_to, _tokenId)
    # 記錄轉移
    log Transfer(_from, _to, _tokenId)
```

若要在 Vyper 中發出事件，請使用 `log` 陳述式 ([在此處查看更多詳細資訊](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging))。

#### 轉移函式 {#transfer-funs}

```python

### 轉移函式 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev 除非 `msg.sender` 是目前的擁有者、授權的操作員或此 NFT 的核准
         地址，否則會擲出錯誤。
         如果 `_from` 不是目前的擁有者，則會擲出錯誤。
         如果 `_to` 是零地址，則會擲出錯誤。
         如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤。
    @notice 呼叫者有責任確認 `_to` 能夠接收 NFT，否則
            它們可能會永久遺失。
    @param _from NFT 的目前擁有者。
    @param _to 新的擁有者。
    @param _tokenId 要轉移的 NFT。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

此函式可讓你轉移到任意地址。 除非該地址是使用者，或是知道如何轉移代幣的合約，否則你轉移的任何代幣都會卡在該地址中而無法使用。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev 將 NFT 的所有權從一個地址轉移到另一個地址。
         除非 `msg.sender` 是目前的擁有者、授權的操作員或此
         NFT 的核准地址，否則會擲出錯誤。
         如果 `_from` 不是目前的擁有者，則會擲出錯誤。
         如果 `_to` 是零地址，則會擲出錯誤。
         如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤。
         如果 `_to` 是智慧合約，它會在 `_to` 上呼叫 `onERC721Received`，如果
         傳回值不是 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`，則會擲出錯誤。
         注意：bytes4 由帶有填充的 bytes32 表示
    @param _from NFT 的目前擁有者。
    @param _to 新的擁有者。
    @param _tokenId 要轉移的 NFT。
    @param _data 額外資料，無指定格式，在對 `_to` 的呼叫中傳送。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

先執行轉移是沒問題的，因為如果出現問題，我們無論如何都會還原，所以在呼叫中完成的所有事情都將被取消。

```python
    if _to.is_contract: # 檢查 `_to` 是否為合約地址
```

首先檢查該地址是否為合約 (如果它有程式碼)。 如果不是，則假設它是一個使用者地址，使用者將能夠使用或轉移該代幣。 但不要讓它讓你產生虛假的安全感。 即使使用 `safeTransferFrom`，如果你將代幣轉移到一個沒人知道私鑰的地址，你仍然可能會遺失代幣。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

呼叫目標合約，看它是否能接收 ERC-721 代幣。

```python
        # 如果轉移目標是不實作 'onERC721Received' 的合約，則會擲出錯誤
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

如果目標是一個合約，但不接受 ERC-721 代幣 (或決定不接受此特定轉移)，則還原。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev 設定或再次確認 NFT 的核准地址。零地址表示沒有核准地址。
         除非 `msg.sender` 是目前的 NFT 擁有者，或目前擁有者的授權操作員，否則會擲出錯誤。
         如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤。(注意：這未在 EIP 中撰寫)
         如果 `_approved` 是目前的擁有者，則會擲出錯誤。(注意：這未在 EIP 中撰寫)
    @param _approved 要為給定 NFT ID 核准的地址。
    @param _tokenId 要核准的代幣 ID。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤
    assert owner != ZERO_ADDRESS
    # 如果 `_approved` 是目前的擁有者，則會擲出錯誤
    assert _approved != owner
```

按照慣例，如果你不想有核准者，你應該指定零地址，而不是你自己。

```python
    # 檢查需求
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

要設定核准，你可以是擁有者，也可以是擁有者授權的操作員。

```python
    # 設定核准
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev 啟用或停用第三方 (「操作員」) 管理 `msg.sender`
         所有資產的核准。它也會發出 ApprovalForAll 事件。
         如果 `_operator` 是 `msg.sender`，則會擲出錯誤。(注意：這未在 EIP 中撰寫)
    @notice 即使傳送方當時沒有任何代幣，此函式也有效。
    @param _operator 要新增到授權操作員集合的地址。
    @param _approved 如果操作員被核准則為 True，若要撤銷核准則為 false。
    """
    # 如果 `_operator` 是 `msg.sender`，則會擲出錯誤
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 鑄造新代幣和銷毀現有代幣 {#mint-burn}

建立合約的帳戶是 `minter` (鑄幣者)，即有權鑄造新 NFT 的超級使用者。 然而，即使是鑄幣者也不被允許銷毀現有的代幣。 只有擁有者或由擁有者授權的實體才能這麼做。

```python
### 鑄幣與銷毀函式 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

此函式始終傳回 `True`，因為如果操作失敗，它將會被還原。

```python
    """
    @dev 鑄造代幣的函式
         如果 `msg.sender` 不是鑄幣者，則會擲出錯誤。
         如果 `_to` 是零地址，則會擲出錯誤。
         如果 `_tokenId` 已被他人擁有，則會擲出錯誤。
    @param _to 將接收鑄造代幣的地址。
    @param _tokenId 要鑄造的代幣 id。
    @return 一個布林值，表示操作是否成功。
    """
    # 如果 `msg.sender` 不是鑄幣者，則會擲出錯誤
    assert msg.sender == self.minter
```

只有鑄幣者 (建立 ERC-721 合約的帳戶) 才能鑄造新代幣。 如果我們未來想變更鑄幣者的身分，這可能會成為一個問題。 在一個生產合約中，你可能需要一個函式，允許鑄幣者將鑄幣權限轉移給其他人。

```python
    # 如果 `_to` 是零地址，則會擲出錯誤
    assert _to != ZERO_ADDRESS
    # 新增 NFT。如果 `_tokenId` 已被他人擁有，則會擲出錯誤
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

按照慣例，鑄造新代幣被視為從零地址轉出。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 銷毀特定的 ERC721 代幣。
         除非 `msg.sender` 是目前的擁有者、授權的操作員或此 NFT 的核准
         地址，否則會擲出錯誤。
         如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤。
    @param _tokenId 要銷毀的 ERC721 代幣的 uint256 id。
    """
    # 檢查需求
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT，則會擲出錯誤
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

任何被允許轉移代幣的人都可以銷毀它。 雖然銷毀看起來等同於轉移到零地址，但零地址實際上並不會收到代幣。 這讓我們可以釋放用於該代幣的所有儲存空間，這可以降低交易的 gas 成本。

## 使用此合約 {#using-contract}

與 Solidity 不同，Vyper 沒有繼承機制。 這是一項刻意的設計選擇，旨在讓程式碼更清晰，從而更容易確保其安全性。 因此，若要建立自己的 Vyper ERC-721 合約，你可以拿取[此合約](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)並修改它，以實作你想要的商業邏輯。

## 結論 {#conclusion}

為了複習，以下是此合約中一些最重要的概念：

- 要透過安全轉移接收 ERC-721 代幣，合約必須實作 `ERC721Receiver` 介面。
- 即使你使用安全轉移，如果你將代幣傳送到私鑰未知的地址，代幣仍然可能會卡住。
- 當操作出現問題時，最好是 `revert` (還原) 該呼叫，而不是只傳回一個失敗值。
- ERC-721 代幣在其有擁有者時存在。
- 有三種方式可以獲得轉移 NFT 的授權。 你可以是擁有者、被核准用於特定代幣，或是擁有者所有代幣的操作員。
- 過去的事件只有在區塊鏈外部才可見。 在區塊鏈內部執行的程式碼無法檢視它們。

現在去實作安全的 Vyper 合約吧。

[在此查看我的更多作品](https://cryptodocguy.pro/)。

