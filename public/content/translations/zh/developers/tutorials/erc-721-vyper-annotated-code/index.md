---
title: "Vyper ERC-721 合约概览"
description: Ryuya Nakamura 编写的 ERC-721 合约及其原理
author: Ori Pomerantz
lang: zh
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## 简介 {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) 标准的作用是持有非同质化代币 (NFT) 的所有权。 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代币如同商品一样，因为每个代币之间没有任何区别。 相比之下，ERC-721 代币专门用来代表类似但又不同的资产，例如表示不同的[卡通猫咪](https://www.cryptokitties.co/) 或各种房地产的所有权。

在本文中，我们将分析 [Ryuya Nakamura 编写的 ERC-721 合约](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)。 该合约是用 [Vyper](https://vyper.readthedocs.io/en/latest/index.html) 语言编写的，Vyper 是一种类似 Python 的合约语言，与使用 Solidity 相比，编写不安全的代码变得更加困难。

## 合约 {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper 中的注释与 Python 中一样，以哈希 (`#`) 开头并且持续一整行。 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) 使用包含 `@<keyword>` 的注释生成方便人阅读的文档。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 接口内置在 Vyper 语言中。 [您可以点击此处查看代码定义。](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py) 接口定义是用 Python 而不是 Vyper 编写的，因为接口不仅在区块链内使用， 而且在外部客户端向区块链发送交易时也使用，而客户端可能 是用 Python 编写的。

第一行导入接口，第二行指定我们在这里执行它。

### ERC721 接收者接口 {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 支持两类转账：

- `transferFrom`，让发送者指定任何目的地地址并让发送者 承担转账责任。 这意味着您可以转账到一个无效的地址，在这种情况下，NFT 将永远丢失。
- `safeTransferFrom`，检查目的地址是否是合约。 如果是，ERC-721 合约 将会询问接收合约是否要接收这笔 NFT 转账。

接收合约必须执行 `ERC721Receiver` 才能回应 `safeTransferFrom` 请求。

```python
            _operator: address,
            _from: address,
```

`_from` 地址是代币的当前所有者。 `_operator` 地址是请求转账的 地址（由于限额，这两个地址可能不同）。

```python
            _tokenId: uint256,
```

ERC-721 代币 ID 是 256 位的。 通常，这些 ID 是通过对代币所代表的 任何东西进行哈希运算创建的。

```python
            _data: Bytes[1024]
```

请求最多可以有 1024 字节的用户数据。

```python
        ) -> bytes32: view
```

为了防止发生合约意外接受转账的情况，返回值不是布尔值， 而是一个具有特定值的 256 位数字串。

此函数是 `view`，这意味着它可以读取区块链的状态，但不能修改。

### 事件 {#events}

[事件](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) 的触发是为了向区块链外部的用户和服务器通知事件。 请注意，事件 的内容不向区块链上的合约提供。

```python
# @dev Emits when ownership of any NFT changes by any mechanism. This event emits when NFTs are
#      created (`from` == 0) and destroyed (`to` == 0). Exception: during contract creation, any
#      number of NFTs may be created and assigned without emitting Transfer. At the time of any
#      transfer, the approved address for that NFT (if any) is reset to none.
# @param _from Sender of NFT (if address is zero address it indicates token creation).
# @param _to Receiver of NFT (if address is zero address it indicates token destruction).
# @param _tokenId The NFT that got transferred.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

这类似于 ERC-20 转账事件，不同之处在于我们报告的是 `tokenId` 而不是金额。 没有人拥有零地址，所以根据惯例我们用它来报告代币的创建和销毁。

```python
# @dev This emits when the approved address for an NFT is changed or reaffirmed. The zero
#      address indicates there is no approved address. When a Transfer event emits, this also
#      indicates that the approved address for that NFT (if any) is reset to none.
# @param _owner Owner of NFT.
# @param _approved Address that we are approving.
# @param _tokenId NFT which we are approving.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 批准与 ERC-20 限额类似。 特定地址只允许转移特定 代币。 这就形成了一种合约在接受代币时作出回应的机制。 合约不能侦听 事件，所以如果您只是把代币转移给合约，它们不会“知道”这笔转账。 因此，代币所有者 首先提交批准，然后向合约发送请求：“我批准你转移 代币 X，请执行......”。

这是一种设计选择，使 ERC-721 标准与 ERC-20 标准类似。 由于 ERC-721 代币 为非同质化代币，合约还可以通过查看代币的所有权来确定 它得到了一个特定代币。

```python
# @dev This emits when an operator is enabled or disabled for an owner. The operator can manage
#      all NFTs of the owner.
# @param _owner Owner of NFT.
# @param _operator Address to which we are setting operator rights.
# @param _approved Status of operator rights(true if operator rights are given and false if
# revoked).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

有时候，拥有一个能够管理某个帐户所有特定类型代币（由一个特定合约 管理的所有代币）的*运营者*是很有用的，这类似于委托书。 例如，我可能想把这样一种权力赋予一个合约，即 检查我是否已经 6 个月没有联系它了，如果属实，就会把我的资产分配给我的继承者（如果他们中一人要求这样做，合约在没有 被交易调用时什么都做不了）。 在 ERC-20 中，我们只需给继承合约提供一个高限额即可。 但这对 ERC-721 不起作用，因为代币是非同质化的。 这是对应的。

`approved` 值表示事件是等待批准，还是等待撤回批准。

### 状态变量 {#state-vars}

这些变量包含代币的当前状态：哪些是可用的以及谁拥有它们。 其中大多数 是 `HashMap` 对象，即[存在于两个类型之间的单向映射](https://vyper.readthedocs.io/en/latest/types.html#mappings)。

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

以太坊中的用户和合约标识用 160 位地址表示。 这两个变量从代币 ID 映射 到代币所有者及批准的转让者（一次最多 1 个映射）。 在以太坊中，未初始化 数据始终为零，因此如果没有所有者或批准的转让者，该代币的值 为零。

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

此变量保存每个所有者的代币数量。 没有从所有者到代币的映射，因此 识别特定所有者所拥有代币的唯一方法是在区块链的事件历史记录 中回溯并查看相应的 `Transfer` 事件。 我们可以使用此变量了解我们拥有全部非同质化代币的 时间，而无需进一步回溯。

注意，此算法只适用于用户接口和外部服务器。 在区块链自身运行的代码无法 读取过去的事件。

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

一个帐户可能有多个运营者。 仅有 `HashMap` 不足以跟踪它们，因为每个键都会生成单一值。 然而，可以将 `HashMap[address, bool]` 作为值。 默认情况下，每个地址的都值是 `False`，这意味着它 不是运营者。 您可以根据需要将值设置为 `True`。

```python
# @dev Address of minter, who can mint a token
minter: address
```

必须以某种方式创建新代币。 在此合约中，只允许一个实体创建 代币，即 `minter`。 例如，这可能足以满足游戏的需要。 但对于其他用途，可能需要创建一个 更复杂的业务逻辑。

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) 为合约规定了一种机制，用来表明应用程序 如何与合约通信以及合约符合哪些 ERC。 在这种情况下，合约符合 ERC-165 和 ERC-721。

### 函数 {#functions}

以下函数确实实现了 ERC-721。

#### 构造函数 {#constructor}

```python
@external
def __init__():
```

和 Python 中一样，在 Vyper 中，构造函数也被称为 `__init__`。

```python
    """
    @dev Contract constructor.
    """
```

在 Python 和 Vyper 中，通过指定多行字符串（以 `"""` 起始和结束），您还可以创建注释，但不能以任何方式使用它。 这些注释也可以包括 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) 注释。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

要访问状态变量，可以使用 `self.<variable name>`（也是与 Python 中的相同）。

#### 视图函数 {#views}

这些函数不修改区块链状态，因此在外部调用时它们可以 免费执行。 如果视图函数是合约调用的，它们仍然必须在每个节点 上执行，因此需要消耗燃料。

```python
@view
@external
```

函数定义前面以 (`@`) 开头的这些关键词称为*修饰符*。 它们 规定能够调用函数的环境。

- `@view` 指定此函数为 view 函数。
- `@external` 指定该特定函数可以由交易及其它合约调用。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

与 Python 相比，Vyper 是一种[静态类型语言](https://wikipedia.org/wiki/Type_system#Static_type_checking)。 如果没有先确定[数据类型](https://vyper.readthedocs.io/en/latest/types.html)，就无法声明变量或函数参数。 因此在上例中，输入参数是一个 256 位的 `bytes32` 值 （256 位是[以太坊虚拟机](/developers/docs/evm/)的原生字长宽度）。 输出是一个 布尔值。 按照惯例，函数参数的名称以下划线 (`_`) 开头。

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

返回 HashMap `self.supportedInterfaces` 中的值，该 HashMap 在构造函数 (`__init__`) 中设置。

```python
### VIEW FUNCTIONS ###
```

下面这些视图函数让用户和其它合约可以获得代币相关信息。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Returns the number of NFTs owned by `_owner`.
         Throws if `_owner` is the zero address. NFTs assigned to the zero address are considered invalid.
    @param _owner Address for whom to query the balance.
    """
    assert _owner != ZERO_ADDRESS
```

此行[宣称](https://vyper.readthedocs.io/en/latest/statements.html#assert) `_owner` 不 为 0。 如果为 0，就会出现错误，操作会被回滚。

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Returns the address of the owner of the NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId The identifier for an NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    return owner
```

在以太坊虚拟机 (evm) 中，任何没有存储值的存储都为零。 如果 `_tokenId` 处没有代币，那么 `self.idToOwner[_tokenId]` 的值为 0。 在这种情况下，该函数 会回滚操作。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Get the approved address for a single NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId ID of the NFT to query the approval of.
    """
    # Throws if `_tokenId` is not a valid NFT
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

注意，`getApproved` *可以*返回零。 如果代币有效，则返回 `self.idToApprovals[_tokenId]`。 如果没有批准者，该值为 0。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Checks if `_operator` is an approved operator for `_owner`.
    @param _owner The address that owns the NFTs.
    @param _operator The address that acts on behalf of the owner.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

此函数检查是否允许 `_operator` 管理 `_owner` 在此合约中的所有代币。 因为可以有多个运营者，所以这是一个两级 HashMap。

#### 转账帮助函数 {#transfer-helpers}

这些函数执行代币转账或管理过程中的一些操作。

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

修饰符 `@internal` 表示该函数只能由 同一合约内的其他函数访问。 按照惯例，这些函数名称也以下划线 (`_`) 开头。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Returns whether the given spender can transfer a given token ID
    @param spender address of the spender to query
    @param tokenId uint256 ID of the token to be transferred
    @return bool whether the msg.sender is approved for the given token ID,
        is an operator of the owner, or is the owner of the token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

有三种方式可以允许地址转移代币：

1. 该地址是代币的所有者
2. 该地址经批准可以使用该代币
3. 该地址是代表代币所有者的运营者

上面的函数可以是一个视图函数，因为它并不改变状态。 为了降低运营成本，任何*可以* 成为视图函数的函数都*应该*成为视图函数。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Add a NFT to a given address
         Throws if `_tokenId` is owned by someone.
    """
    # Throws if `_tokenId` is owned by someone
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Change the owner
    self.idToOwner[_tokenId] = _to
    # Change count tracking
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove a NFT from a given address
         Throws if `_from` is not the current owner.
    """
    # Throws if `_from` is not the current owner
    assert self.idToOwner[_tokenId] == _from
    # Change the owner
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Change count tracking
    self.ownerToNFTokenCount[_from] -= 1
```

当转账出现问题时，我们会撤销调用。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Clear an approval of a given address
         Throws if `_owner` is not the current owner.
    """
    # Throws if `_owner` is not the current owner
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Reset approvals
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

仅在必要时更改值。 状态变量位于存储中。 写入存储是 EVM（以太坊虚拟机）执行的最昂贵的操作之一（就 [燃料](/developers/docs/gas/)而言）。 因此，尽量减少写入操作，即使是写入现有值， 成本也很高。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Execute transfer of a NFT.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT. (NOTE: `msg.sender` not allowed in private function so pass `_sender`.)
         Throws if `_to` is the zero address.
         Throws if `_from` is not the current owner.
         Throws if `_tokenId` is not a valid NFT.
    """
```

我们使用此内部函数是因为有两种代币转账方式（常规和安全方式），但 我们希望代码中只有一个位置进行此操作，以使审计更容易。

```python
    # Check requirements
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Throws if `_to` is the zero address
    assert _to != ZERO_ADDRESS
    # Clear approval. Throws if `_from` is not the current owner
    self._clearApproval(_from, _tokenId)
    # Remove NFT. Throws if `_tokenId` is not a valid NFT
    self._removeTokenFrom(_from, _tokenId)
    # Add NFT
    self._addTokenTo(_to, _tokenId)
    # Log the transfer
    log Transfer(_from, _to, _tokenId)
```

要在 Vyper 中触发一个事件，可以使用 `log` 语句（[请点击此处了解更多详情](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)）。

#### 转账函数 {#transfer-funs}

```python

### TRANSFER FUNCTIONS ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
    @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
            they maybe be permanently lost.
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

此函数允许您向任意地址转账。 除非该地址是用户或是知道如何转移代币的 合约，否则您转移的任何代币都将卡在该地址中变得毫无用处。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfers the ownership of an NFT from one address to another address.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the
         approved address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
         If `_to` is a smart contract, it calls `onERC721Received` on `_to` and throws if
         the return value is not `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTE: bytes4 is represented by bytes32 with padding
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    @param _data Additional data with no specified format, sent in call to `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

可以先进行转账，因为如果出现问题，我们无论如何都会回滚该操作，因此 调用中的一切操作都会被取消。

```python
    if _to.is_contract: # check if `_to` is a contract address
```

首先检查地址是否为合约（如果有代码）。 如果不是，假定它是一个用户 地址，并且该用户能够使用或转移代币。 但不要让该地址 给您一种虚假的安全感。 如果您将代币转移到一个没有人知道私钥的地址，即使使用了 `safeTransferFrom`，也可能损失代币。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

调用目标合约，看它是否可以接收 ERC-721 代币。

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

如果目的地是一个合约，但它不接受 ERC-721 代币（或者决定不接受这笔特定转账），则回滚。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
```

根据惯例，如果您不想要批准者，可以指定零地址而不是您自己。

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

要设置批准，您可以是所有者，也可以是所有者授权的运营者。

```python
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 铸造新代币和销毁现有代币 {#mint-burn}

创建合约的帐户就是 `minter`，是获得授权可以铸造 新非同质化代币的超级用户。 然而，即使是铸币者，也不允许其销毁现有代币。 只有所有者或所有者授权的实体 才能那样做。

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

此函数始终返回 `True`，因为如果操作失败，它将被回滚。

```python
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
```

只有铸币者（创建 ERC-721 合约的帐户）可以铸造新代币。 如果我们将来想改变铸币者的 身份，这可能会成为一个问题。 在生产合约 中，您可能需要一个函数，允许 铸币者将铸币者特权转让给其他人。

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

根据惯例，新代币铸造视作来自零地址的转账。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

任何可以转移代币的人都可以销毁它。 虽然销毁代币看起来等同于 转移到零地址，但零地址实际上并没有接收到代币。 这样我们可以释放所有用于代币的 存储，因而可以降低交易的燃料成本。

# 使用此合约 {#using-contract}

与 Solidity 相比，Vyper 中没有继承。 这种有意而为之的设计选择，是为了使代码 更清晰，从而更容易受保护。 因此，要创建您自己的 Vyper ERC-721 合约，您可以 利用[此合约](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)，并修改 它以实现想要的业务逻辑。

# 总结 {#conclusion}

回顾一下，下面是此合约中最重要的几点：

- 要通过安全转账方式接收 ERC-721 代币，合约必须实现 `ERC721Receiver` 接口。
- 即使使用了安全转账方式，如果您将代币发送到私钥未知 的地址，代币仍然会被卡住。
- 当操作出现问题时，最好 `revert` 该调用，而不是只返回 失败值。
- 有了所有者，ERC-721 代币才存在。
- 有三种经过授权的 NFT 转账方式。 您可以是所有者，可以针对特定代币获得批准， 或者可以是所有者全部代币的运营者。
- 过去的事件只在区块链之外可见。 区块链中运行的代码无法看到它们。

现在去实现安全的 Vyper 合约吧。
