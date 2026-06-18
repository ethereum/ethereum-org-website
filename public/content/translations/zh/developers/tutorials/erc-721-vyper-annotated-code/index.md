---
title: "Vyper ERC-721 合约演练"
description: Ryuya Nakamura 的 ERC-721 合约及其工作原理
author: 奥里·波梅兰茨
lang: zh
tags: ["vyper", "erc-721", "python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## 简介 {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) 标准用于持有非同质化代币 (NFT) 的所有权。
[ERC-20](/developers/docs/standards/tokens/erc-20/) 代币表现得像商品，因为各个代币之间没有区别。
相比之下，ERC-721 代币专为相似但不完全相同的资产而设计，例如不同的[卡通猫](https://www.cryptokitties.co/)或不同房地产的产权。

在本文中，我们将分析 [Ryuya Nakamura 的 ERC-721 合约](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)。
该合约使用 [Vyper](https://vyper.readthedocs.io/en/latest/index.html) 编写，这是一种类似 Python 的合约语言，旨在使其比 Solidity 更难编写出不安全的代码。

## 合约 {#contract}

```python
# @dev ERC-721非同质化代币标准的实现。
# @author Ryuya Nakamura (@nrryuya)
# 修改自：https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

与 Python 一样，Vyper 中的注释以哈希符号 (`#`) 开头，并一直持续到行尾。包含 `@<keyword>` 的注释被 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) 用于生成人类可读的文档。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 接口内置于 Vyper 语言中。
[你可以在这里查看代码定义](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)。
接口定义是用 Python 而不是 Vyper 编写的，因为接口不仅在区块链内部使用，而且在从外部客户端（可能是用 Python 编写的）向区块链发送交易时也会使用。

第一行导入接口，第二行指定我们在此处实现它。

### ERC721Receiver 接口 {#receiver-interface}

```python
# safeTransferFrom() 调用的合约接口
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 支持两种类型的转账：

- `transferFrom`，它允许发送者指定任何目标地址，并将转账的责任交给发送者。这意味着你可以转账到一个无效地址，在这种情况下，NFT 将永远丢失。
- `safeTransferFrom`，它会检查目标地址是否为合约。如果是，ERC-721 合约会询问接收合约是否想要接收该 NFT。

为了响应 `safeTransferFrom` 请求，接收合约必须实现 `ERC721Receiver`。

```python
            _operator: address,
            _from: address,
```

`_from` 地址是代币的当前所有者。`_operator` 地址是请求转账的地址（由于授权额度的原因，这两个地址可能不同）。

```python
            _tokenId: uint256,
```

ERC-721 代币 ID 为 256 位。通常，它们是通过对代币所代表内容的描述进行哈希处理来创建的。

```python
            _data: Bytes[1024]
```

该请求最多可以包含 1024 字节的用户数据。

```python
        ) -> bytes32: view
```

为了防止合约意外接受转账的情况，返回值不是布尔值，而是具有特定值的 256 位数据。

此函数是一个 `view`，这意味着它可以读取区块链的状态，但不能修改它。

### 事件 {#events}

触发[事件](/developers/docs/smart-contracts/anatomy/#events-and-logs)是为了向区块链外部的用户和服务器通知事件。请注意，区块链上的合约无法获取事件的内容。

```python
# @dev 当任何NFT的所有权通过任何机制发生变化时触发。当NFT被
#      创建（`from` == 0）和销毁（`to` == 0）时触发此事件。例外：在合约创建期间，可以
#      创建和分配任意数量的NFT而不触发Transfer事件。在任何
#      转账时，该NFT的授权地址（如果有）将被重置为无。
# @param _from NFT的发送者（如果地址是零地址，则表示代币创建）。
# @param _to NFT的接收者（如果地址是零地址，则表示代币销毁）。
# @param _tokenId 被转账的NFT。
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

这类似于 ERC-20 的 Transfer 事件，不同之处在于我们报告的是 `tokenId` 而不是金额。没有人拥有零地址，因此按照惯例，我们使用它来报告代币的创建和销毁。

```python
# @dev 当NFT的授权地址被更改或重新确认时触发。零
#      地址表示没有授权地址。当触发Transfer事件时，这也
#      表示该NFT的授权地址（如果有）被重置为无。
# @param _owner NFT的所有者。
# @param _approved 我们正在授权的地址。
# @param _tokenId 我们正在授权的NFT。
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 授权类似于 ERC-20 授权额度。允许特定地址转账特定代币。这为合约在接受代币时提供了一种响应机制。合约无法监听事件，因此如果你只是将代币转账给它们，它们并“不知道”。通过这种方式，所有者首先提交授权，然后向合约发送请求：“我已经授权你转账代币 X，请执行……”

这是一种设计选择，旨在使 ERC-721 标准类似于 ERC-20 标准。由于 ERC-721 代币是不可替代的，合约也可以通过查看代币的所有权来识别它获得了特定的代币。

```python
# @dev 当为所有者启用或禁用操作员时触发。操作员可以管理
#      所有者的所有NFT。
# @param _owner NFT的所有者。
# @param _operator 我们正在设置操作员权限的地址。
# @param _approved 操作员权限的状态（如果赋予操作员权限则为true，如果
# 撤销则为false）。
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

有时，拥有一个可以管理账户中所有特定类型代币（由特定合约管理的代币）的_操作员_（operator）是很有用的，类似于委托书。例如，我可能想将这种权力赋予一个合约，该合约会检查我是否已有六个月没有联系它，如果是，则将我的资产分配给我的继承人（如果其中一人提出要求，因为如果没有通过交易调用，合约什么也做不了）。在 ERC-20 中，我们只需给继承合约一个很高的授权额度即可，但这对于 ERC-721 不起作用，因为代币是不可替代的。这就是等效的机制。

`approved` 值告诉我们该事件是用于授权，还是撤销授权。

### 状态变量 {#state-vars}

这些变量包含代币的当前状态：哪些代币可用以及谁拥有它们。其中大多数是 `HashMap` 对象，即[存在于两种类型之间的单向映射](https://vyper.readthedocs.io/en/latest/types.html#mappings)。

```python
# @dev 从NFT ID到拥有它的地址的映射。
idToOwner: HashMap[uint256, address]

# @dev 从NFT ID到授权地址的映射。
idToApprovals: HashMap[uint256, address]
```

以太坊中的用户和合约身份由 160 位地址表示。这两个变量将代币 ID 映射到其所有者以及被授权转账它们的人（每个代币最多一个）。在以太坊中，未初始化的数据始终为零，因此如果没有所有者或授权转账人，该代币的值为零。

```python
# @dev 从所有者地址到其代币数量的映射。
ownerToNFTokenCount: HashMap[address, uint256]
```

此变量保存每个所有者的代币数量。没有从所有者到代币的映射，因此识别特定所有者拥有的代币的唯一方法是回顾区块链的事件历史记录并查看相应的 `Transfer` 事件。我们可以使用此变量来了解何时我们已经获得了所有的 NFT，而无需在时间上进一步追溯。

请注意，此算法仅适用于用户界面和外部服务器。在区块链本身上运行的代码无法读取过去的事件。

```python
# @dev 从所有者地址到操作员地址映射的映射。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

一个账户可能有多个操作员。一个简单的 `HashMap` 不足以跟踪它们，因为每个键只对应一个值。相反，你可以使用 `HashMap[address, bool]` 作为值。默认情况下，每个地址的值为 `False`，这意味着它不是操作员。你可以根据需要将值设置为 `True`。

```python
# @dev 铸造者的地址，可以铸造代币
minter: address
```

必须以某种方式创建新代币。在此合约中，只有一个实体被允许这样做，即 `minter`。例如，这对于游戏来说可能就足够了。对于其他目的，可能需要创建更复杂的业务逻辑。

```python
# @dev 接口ID到布尔值的映射，表示是否支持该接口
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC-165的ERC-165接口ID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC-721的ERC-165接口ID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) 规定了一种机制，供合约披露应用程序如何与其通信，以及它符合哪些 ERC 标准。在这种情况下，该合约符合 ERC-165 和 ERC-721。

### 函数 {#functions}

这些是实际实现 ERC-721 的函数。

#### 构造函数 {#constructor}

```python
@external
def __init__():
```

在 Vyper 中，与 Python 一样，构造函数被称为 `__init__`。

```python
    """
    @dev 合约构造函数。
    """
```

在 Python 和 Vyper 中，你还可以通过指定一个多行字符串（以 `"""` 开头和结尾）并且不以任何方式使用它来创建注释。这些注释也可以包含 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

要访问状态变量，你需要使用 `self.<variable name>`（同样，与 Python 相同）。

#### 视图函数 {#views}

这些函数不会修改区块链的状态，因此如果从外部调用它们，则可以免费执行。如果视图函数由合约调用，它们仍然必须在每个节点上执行，因此会消耗 Gas。

```python
@view
@external
```

在函数定义之前这些以 at 符号 (`@`) 开头的关键字被称为_装饰器_（decorations）。它们指定了可以调用函数的情况。

- `@view` 指定此函数是一个视图。
- `@external` 指定此特定函数可以由交易和其他合约调用。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

与 Python 相比，Vyper 是一种[静态类型语言](https://wikipedia.org/wiki/Type_system#Static_type_checking)。如果不标识[数据类型](https://vyper.readthedocs.io/en/latest/types.html)，就无法声明变量或函数参数。在这种情况下，输入参数是 `bytes32`，一个 256 位的值（256 位是[以太坊虚拟机](/developers/docs/evm/)的原生字长）。输出是一个布尔值。按照惯例，函数参数的名称以下划线 (`_`) 开头。

```python
    """
    @dev 接口标识在ERC-165中指定。
    @param _interfaceID 接口的ID
    """
    return self.supportedInterfaces[_interfaceID]
```

从 `self.supportedInterfaces` HashMap 返回值，该值在构造函数 (`__init__`) 中设置。

```python
### 视图函数 ###
```

这些是视图函数，它们使用户和其他合约可以获取有关代币的信息。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev 返回`_owner`拥有的NFT数量。
         如果`_owner`是零地址则抛出异常。分配给零地址的NFT被认为是无效的。
    @param _owner 要查询余额的地址。
    """
    assert _owner != ZERO_ADDRESS
```

此行[断言](https://vyper.readthedocs.io/en/latest/statements.html#assert) `_owner` 不为零。如果为零，则存在错误并且操作将被回退。

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev 返回NFT所有者的地址。
         如果`_tokenId`不是有效的NFT则抛出异常。
    @param _tokenId NFT的标识符。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果`_tokenId`不是有效的NFT则抛出异常
    assert owner != ZERO_ADDRESS
    return owner
```

在以太坊虚拟机 (EVM) 中，任何未存储值的存储空间都为零。如果在 `_tokenId` 处没有代币，则 `self.idToOwner[_tokenId]` 的值为零。在这种情况下，函数将回退。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 获取单个NFT的授权地址。
         如果`_tokenId`不是有效的NFT则抛出异常。
    @param _tokenId 要查询授权的NFT的ID。
    """
    # 如果`_tokenId`不是有效的NFT则抛出异常
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

请注意，`getApproved` _可以_返回零。如果代币有效，它将返回 `self.idToApprovals[_tokenId]`。如果没有授权人，则该值为零。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev 检查`_operator`是否是`_owner`的授权操作员。
    @param _owner 拥有NFT的地址。
    @param _operator 代表所有者行事的地址。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

此函数检查是否允许 `_operator` 管理此合约中 `_owner` 的所有代币。因为可以有多个操作员，所以这是一个两级 HashMap。

#### 转账辅助函数 {#transfer-helpers}

这些函数实现了属于转账或管理代币一部分的操作。

```python

### 转账函数辅助工具 ###

@view
@internal
```

此装饰器 `@internal` 意味着该函数只能从同一合约内的其他函数访问。按照惯例，这些函数名称也以下划线 (`_`) 开头。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 返回给定的花费者是否可以转账给定的代币ID
    @param spender 要查询的花费者地址
    @param tokenId 要转账的代币的uint256 ID
    @return bool msg.sender是否被授权给定的代币ID，
        是否是所有者的操作员，或者是代币的所有者
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

有三种方式可以允许一个地址转账代币：

1. 该地址是代币的所有者
2. 该地址被授权使用该代币
3. 该地址是代币所有者的操作员

上面的函数可以是一个视图，因为它不改变状态。为了降低运营成本，任何_可以_是视图的函数都_应该_是视图。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 将NFT添加到给定地址
         如果`_tokenId`已被某人拥有则抛出异常。
    """
    # 如果`_tokenId`已被某人拥有则抛出异常
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 更改所有者
    self.idToOwner[_tokenId] = _to
    # 更改数量跟踪
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 从给定地址移除NFT
         如果`_from`不是当前所有者则抛出异常。
    """
    # 如果`_from`不是当前所有者则抛出异常
    assert self.idToOwner[_tokenId] == _from
    # 更改所有者
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # 更改数量跟踪
    self.ownerToNFTokenCount[_from] -= 1
```

当转账出现问题时，我们会回退调用。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 清除给定地址的授权
         如果`_owner`不是当前所有者则抛出异常。
    """
    # 如果`_owner`不是当前所有者则抛出异常
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # 重置授权
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

仅在必要时更改值。状态变量存在于存储中。写入存储是 EVM（以太坊虚拟机）执行的最昂贵的操作之一（就 [Gas](/developers/docs/gas/) 而言）。因此，最好尽量减少写入操作，即使写入现有值的成本也很高。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev 执行NFT的转账。
         除非`msg.sender`是当前所有者、授权操作员或该NFT的授权
         地址，否则抛出异常。（注意：私有函数中不允许使用`msg.sender`，因此传递`_sender`。）
         如果`_to`是零地址则抛出异常。
         如果`_from`不是当前所有者则抛出异常。
         如果`_tokenId`不是有效的NFT则抛出异常。
    """
```

我们有这个内部函数是因为有两种转账代币的方式（常规和安全），但我们希望代码中只有一个执行转账的位置，以使审计更容易。

```python
    # 检查要求
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # 如果`_to`是零地址则抛出异常
    assert _to != ZERO_ADDRESS
    # 清除授权。如果`_from`不是当前所有者则抛出异常
    self._clearApproval(_from, _tokenId)
    # 移除NFT。如果`_tokenId`不是有效的NFT则抛出异常
    self._removeTokenFrom(_from, _tokenId)
    # 添加NFT
    self._addTokenTo(_to, _tokenId)
    # 记录转账
    log Transfer(_from, _to, _tokenId)
```

要在 Vyper 中触发事件，你需要使用 `log` 语句（[有关更多详细信息，请参见此处](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)）。

#### 转账函数 {#transfer-funs}

```python

### 转账函数 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev 除非`msg.sender`是当前所有者、授权操作员或该NFT的授权
         地址，否则抛出异常。
         如果`_from`不是当前所有者则抛出异常。
         如果`_to`是零地址则抛出异常。
         如果`_tokenId`不是有效的NFT则抛出异常。
    @notice 调用者有责任确认`_to`能够接收NFT，否则
            它们可能会永久丢失。
    @param _from NFT的当前所有者。
    @param _to 新所有者。
    @param _tokenId 要转账的NFT。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

此函数允许你转账到任意地址。除非该地址是用户，或者是知道如何转账代币的合约，否则你转账的任何代币都将卡在该地址中且毫无用处。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev 将NFT的所有权从一个地址转账到另一个地址。
         除非`msg.sender`是当前所有者、授权操作员或
         该NFT的授权地址，否则抛出异常。
         如果`_from`不是当前所有者则抛出异常。
         如果`_to`是零地址则抛出异常。
         如果`_tokenId`不是有效的NFT则抛出异常。
         如果`_to`是智能合约，它会在`_to`上调用`onERC721Received`，如果
         返回值不是`bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`则抛出异常。
         注意：bytes4由带有填充的bytes32表示
    @param _from NFT的当前所有者。
    @param _to 新所有者。
    @param _tokenId 要转账的NFT。
    @param _data 没有指定格式的附加数据，在对`_to`的调用中发送。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

先进行转账是可以的，因为如果出现问题，我们无论如何都会回退，因此调用中所做的一切都将被取消。

```python
    if _to.is_contract: # 检查`_to`是否是合约地址
```

首先检查该地址是否为合约（如果它有代码）。如果不是，则假定它是一个用户地址，并且用户将能够使用该代币或转账它。但不要让这使你产生虚假的安全感。即使使用 `safeTransferFrom`，如果你将代币转账到一个无人知晓其私钥的地址，你仍然会丢失代币。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

调用目标合约以查看它是否可以接收 ERC-721 代币。

```python
        # 如果转账目的地是未实现'onERC721Received'的合约则抛出异常
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

如果目标是一个合约，但它不接受 ERC-721 代币（或者决定不接受这笔特定的转账），则回退。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev 设置或重新确认NFT的授权地址。零地址表示没有授权地址。
         除非`msg.sender`是当前NFT所有者，或当前所有者的授权操作员，否则抛出异常。
         如果`_tokenId`不是有效的NFT则抛出异常。（注意：这没有写在EIP中）
         如果`_approved`是当前所有者则抛出异常。（注意：这没有写在EIP中）
    @param _approved 要为给定NFT ID授权的地址。
    @param _tokenId 要授权的代币ID。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果`_tokenId`不是有效的NFT则抛出异常
    assert owner != ZERO_ADDRESS
    # 如果`_approved`是当前所有者则抛出异常
    assert _approved != owner
```

按照惯例，如果你不想有授权人，你应该指定零地址，而不是你自己。

```python
    # 检查要求
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

要设置授权，你可以是所有者，或者是所有者授权的操作员。

```python
    # 设置授权
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev 启用或禁用第三方（“操作员”）管理`msg.sender`所有
         资产的授权。它还会触发ApprovalForAll事件。
         如果`_operator`是`msg.sender`则抛出异常。（注意：这没有写在EIP中）
    @notice 即使发送者当时不拥有任何代币，这也有效。
    @param _operator 要添加到授权操作员集合的地址。
    @param _approved 如果授权操作员则为true，撤销授权则为false。
    """
    # 如果`_operator`是`msg.sender`则抛出异常
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 铸造新代币和销毁现有代币 {#mint-burn}

创建合约的账户是 `minter`，即被授权铸造新 NFT 的超级用户。然而，即使是它也不允许销毁现有的代币。只有所有者或所有者授权的实体才能这样做。

```python
### 铸造与销毁函数 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

此函数始终返回 `True`，因为如果操作失败，它将被回退。

```python
    """
    @dev 铸造代币的函数
         如果`msg.sender`不是铸造者则抛出异常。
         如果`_to`是零地址则抛出异常。
         如果`_tokenId`已被某人拥有则抛出异常。
    @param _to 将接收铸造代币的地址。
    @param _tokenId 要铸造的代币ID。
    @return 指示操作是否成功的布尔值。
    """
    # 如果`msg.sender`不是铸造者则抛出异常
    assert msg.sender == self.minter
```

只有铸造者（创建 ERC-721 合约的账户）才能铸造新代币。如果我们将来想要更改铸造者的身份，这可能会成为一个问题。在生产合约中，你可能需要一个允许铸造者将铸造权限转让给其他人的函数。

```python
    # 如果`_to`是零地址则抛出异常
    assert _to != ZERO_ADDRESS
    # 添加NFT。如果`_tokenId`已被某人拥有则抛出异常
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

按照惯例，铸造新代币算作从零地址转账。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 销毁特定的ERC-721代币。
         除非`msg.sender`是当前所有者、授权操作员或该NFT的授权
         地址，否则抛出异常。
         如果`_tokenId`不是有效的NFT则抛出异常。
    @param _tokenId 要销毁的ERC-721代币的uint256 ID。
    """
    # 检查要求
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # 如果`_tokenId`不是有效的NFT则抛出异常
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

任何被允许转账代币的人都被允许销毁它。虽然销毁看起来等同于转账到零地址，但零地址实际上并没有接收到代币。这使我们能够释放用于该代币的所有存储空间，从而可以降低交易的 Gas 成本。

## 使用此合约 {#using-contract}

与 Solidity 相比，Vyper 没有继承。这是一种深思熟虑的设计选择，旨在使代码更清晰，从而更容易保证安全。因此，要创建你自己的 Vyper ERC-721 合约，你可以采用[此合约](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)并对其进行修改以实现你想要的业务逻辑。

## 结论 {#conclusion}

作为回顾，以下是此合约中一些最重要的概念：

- 要通过安全转账接收 ERC-721 代币，合约必须实现 `ERC721Receiver` 接口。
- 即使你使用安全转账，如果你将代币发送到一个私钥未知的地址，代币仍然可能会被卡住。
- 当操作出现问题时，最好`revert`调用，而不是仅仅返回一个失败值。
- ERC-721 代币在拥有所有者时存在。
- 有三种方式可以获得转账 NFT 的授权。你可以是所有者，被授权使用特定代币，或者是所有者所有代币的操作员。
- 过去的事件仅在区块链外部可见。在区块链内部运行的代码无法查看它们。

现在去实现安全的 Vyper 合约吧。

[在这里查看我的更多作品](https://cryptodocguy.pro/)。