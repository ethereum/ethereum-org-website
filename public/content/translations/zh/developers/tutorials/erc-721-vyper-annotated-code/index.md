---
title: "Vyper ERC-721 合约详解"
description: Ryuya Nakamura 的 ERC-721 合约及其工作原理
author: Ori Pomerantz
lang: zh
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## 简介 {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) 标准用于持有非同质化代币 (NFT) 的所有权。
[ERC-20](/developers/docs/standards/tokens/erc-20/) 代币的行为像商品，因为单个代币之间没有区别。
与此相反，ERC-721 代币是为相似但不相同的资产设计的，例如不同的猫咪
卡通或不同房地产的所有权凭证。

在本文中，我们将分析 [Ryuya Nakamura 的 ERC-721 合约](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)。
该合约使用 [Vyper](https://vyper.readthedocs.io/en/latest/index.html) 编写，这是一种类似 Python 的合约语言，其设计使得编写不安全的代码比使用 Solidity 更难。

## 合约 {#contract}

```python
# @dev ERC-721 非同质化代币标准的实现。
# @author Ryuya Nakamura (@nrryuya)
# 修改自：https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

在 Vyper 中，注释与 Python 一样，以哈希符号 (`#`) 开头，并持续到行尾。 包含
`@<keyword>` 的注释被 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) 用于生成人类可读的
文档。

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 接口内置于 Vyper 语言中。
[你可以在这里查看代码定义](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)。
接口定义是用 Python 而不是 Vyper 编写的，因为接口不仅在
区块链内部使用，而且在外部客户端向区块链发送交易时也会使用，而客户端可能
是用 Python 编写的。

第一行导入接口，第二行指定我们在此处实现它。

### ERC721Receiver 接口 {#receiver-interface}

```python
# safeTransferFrom() 调用的合约接口
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 支持两种类型的转账：

- `transferFrom`，它允许发送者指定任何目标地址，并将转账的责任
  放在发送者身上。 这意味着你可以转账到无效地址，在这种情况下，
  NFT 将永久丢失。
- `safeTransferFrom`，它会检查目标地址是否为合约。 如果是，ERC-721 合约
  会询问接收合约是否愿意接收该 NFT。

要响应 `safeTransferFrom` 请求，接收合约必须实现 `ERC721Receiver`。

```python
            _operator: address,
            _from: address,
```

`_from` 地址是代币的当前所有者。 `_operator` 地址是请求
转账的地址（由于授权额度的存在，这两个地址可能不同）。

```python
            _tokenId: uint256,
```

ERC-721 代币 ID 是 256 位的。 通常，它们是通过对代币所代表的任何
事物的描述进行哈希运算来创建的。

```python
            _data: Bytes[1024]
```

请求最多可以包含 1024 字节的用户数据。

```python
        ) -> bytes32: view
```

为防止合约意外接受转账，返回值不是布尔值，
而是具有特定值的 256 位数据。

此函数是 `view` 函数，这意味着它可以读取区块链的状态，但不能修改它。

### 事件 {#events}

发出[事件](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)是为了将事件通知给区块链外部的用户和服务器。 请注意，区块链上的合约无法访问事件的
内容。

```python
# @dev 当任何 NFT 的所有权因任何机制发生变化时发出。当 NFT 被
#      创建（`from` == 0）和销毁（`to` == 0）时，会发出此事件。例外：在合约创建期间，可以
#      创建和分配任意数量的 NFT 而不发出 Transfer 事件。在任何
#      转账时，该 NFT 的批准地址（如有）将被重置为无。
# @param _from NFT 的发送者（如果地址是零地址，则表示代币创建）。
# @param _to NFT 的接收者（如果地址是零地址，则表示代币销毁）。
# @param _tokenId 被转移的 NFT。
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

这类似于 ERC-20 的 Transfer 事件，区别在于我们报告的是 `tokenId` 而不是数量。
没有人拥有零地址，因此按照惯例，我们用它来报告代币的创建和销毁。

```python
# @dev 当 NFT 的批准地址被更改或重新确认时发出此事件。零
#      地址表示没有批准地址。当 Transfer 事件发出时，这也
#      表示该 NFT 的批准地址（如有）被重置为无。
# @param _owner NFT 的所有者。
# @param _approved 我们正在批准的地址。
# @param _tokenId 我们正在批准的 NFT。
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 的批准类似于 ERC-20 的授权额度。 一个特定地址被允许转移一个特定的
代币。 这为合约在接受代币时提供了一种响应机制。 合约无法
监听事件，所以如果你只是将代币转移给它们，它们不会“知道”这件事。 这样，
所有者首先提交批准，然后向合约发送请求：“我已批准你转移代币
X，请执行...”

这是一种设计选择，旨在使 ERC-721 标准与 ERC-20 标准相似。 因为
ERC-721 代币不是同质化的，合约也可以通过
查看代币的所有权来识别它收到了一个特定的代币。

```python
# @dev 当为所有者启用或禁用操作员时发出此事件。操作员可以管理
#      所有者的所有 NFT。
# @param _owner NFT 的所有者。
# @param _operator 我们正在为其设置操作员权限的地址。
# @param _approved 操作员权限的状态（如果授予操作员权限则为 true，如果
# 撤销则为 false）。
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

有时，拥有一个可以管理一个帐户所有特定类型代币（由特定合约管理的代币）的_操作员_是很有用的，这类似于授权委托书。 例如，我可能想将这种权力授予一个合约，让它检查我是否
有六个月没有联系它，如果是，就将我的资产分配给我的继承人（如果其中一个继承人提出请求，因为合约在没有
被交易调用的情况下什么也做不了）。 在 ERC-20 中，我们可以给继承合约一个高额的授权额度，
但这不适用于 ERC-721，因为它的代币是非同质化的。 这与上述情况等效。

`approved` 值告诉我们该事件是用于批准还是撤销批准。

### 状态变量 {#state-vars}

这些变量包含代币的当前状态：哪些代币可用以及谁拥有它们。 这些变量大多是
`HashMap` 对象，即[存在于两种类型之间的单向映射](https://vyper.readthedocs.io/en/latest/types.html#mappings)。

```python
# @dev 从 NFT ID 到其所有者地址的映射。
idToOwner: HashMap[uint256, address]

# @dev 从 NFT ID 到批准地址的映射。
idToApprovals: HashMap[uint256, address]
```

在以太坊中，用户和合约身份由 160 位地址表示。 这两个变量将代币 ID 映射
到其所有者和被批准转移它们的人（每个代币最多一个）。 在以太坊中，
未初始化的数据始终为零，因此如果没有所有者或批准的转移者，该代币的
值为零。

```python
# @dev 从所有者地址到其代币数量的映射。
ownerToNFTokenCount: HashMap[address, uint256]
```

此变量保存每个所有者的代币数量。 没有从所有者到代币的映射，因此
识别特定所有者所拥有代币的唯一方法是回溯区块链的事件历史
并查看相应的 `Transfer` 事件。 我们可以使用这个变量来知道我们何时拥有了所有的 NFT，而不需要
再往前追溯。

请注意，此算法仅适用于用户界面和外部服务器。 在区块链上运行的
代码本身无法读取过去的事件。

```python
# @dev 从所有者地址到操作员地址映射的映射。
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

一个帐户可以有多个操作员。 一个简单的 `HashMap` 不足以
跟踪它们，因为每个键只对应一个值。 相反，你可以使用
`HashMap[address, bool]` 作为值。 默认情况下，每个地址的值都是 `False`，这意味着它
不是操作员。 你可以根据需要将值设置为 `True`。

```python
# @dev 铸币者地址，可以铸造代币
minter: address
```

新代币必须以某种方式创建。 在这个合约中，只有一个实体被允许这样做，那就是
`minter`（铸币者）。 例如，这对于一个游戏来说可能已经足够了。 对于其他目的，可能需要
创建更复杂的业务逻辑。

```python
# @dev 接口 ID 到布尔值的映射，表示是否支持该接口
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 的 ERC165 接口 ID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721 的 ERC165 接口 ID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) 指定了一种机制，让合约可以公开应用程序
如何与其通信，以及它符合哪些 ERC。 在这种情况下，该合约符合 ERC-165 和 ERC-721。

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

在 Python 和 Vyper 中，你也可以通过指定一个多行字符串（以 `"""` 开始和结束）
来创建注释，并且不以任何方式使用它。 这些注释也可以包含
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)。

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

要访问状态变量，请使用 `self.<variable name>`（同样，与 Python 中一样）。

#### 视图函数 {#views}

这些函数不修改区块链的状态，因此如果从外部调用，可以
免费执行。 如果视图函数由合约调用，它们仍必须在
每个节点上执行，因此会消耗燃料。

```python
@view
@external
```

在函数定义之前，以 at 符号（`@`）开头的这些关键字被称为_装饰器_。 它们
指定了可以调用函数的环境。

- `@view` 指定此函数是视图函数。
- `@external` 指定此特定函数可由交易和其他合约调用。

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

与 Python 相反，Vyper 是一种[静态类型语言](https://wikipedia.org/wiki/Type_system#Static_type_checking)。
如果不确定[数据类型](https://vyper.readthedocs.io/en/latest/types.html)，就无法声明变量或函数参数。 在这种情况下，输入参数是 `bytes32`，一个 256 位的值
（256 位是[以太坊虚拟机](/developers/docs/evm/)的原生字长）。 输出是一个布尔
值。 按照惯例，函数参数的名称以下划线 (`_`) 开头。

```python
    """
    @dev 接口标识在 ERC-165 中指定。
    @param _interfaceID 接口的 ID
    """
    return self.supportedInterfaces[_interfaceID]
```

从 `self.supportedInterfaces` HashMap 返回值，该值在构造函数 (`__init__`) 中设置。

```python
### 视图函数 ###
```

这些是向用户和其他合约提供有关代币信息的视图函数。

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev 返回 `_owner` 拥有的 NFT 数量。
         如果 `_owner` 是零地址，则抛出异常。分配给零地址的 NFT 被视为无效。
    @param _owner 查询余额的地址。
    """
    assert _owner != ZERO_ADDRESS
```

此行[断言](https://vyper.readthedocs.io/en/latest/statements.html#assert) `_owner` 不是
零。 如果是，则会发生错误并且操作将被回滚。

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev 返回 NFT 所有者的地址。
         如果 `_tokenId` 不是有效的 NFT，则抛出异常。
    @param _tokenId NFT 的标识符。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT，则抛出异常
    assert owner != ZERO_ADDRESS
    return owner
```

在以太坊虚拟机 (evm) 中，任何未存储值的存储空间其值都为零。
如果 `_tokenId` 处没有代币，那么 `self.idToOwner[_tokenId]` 的值为零。 在这种
情况下，函数会回滚。

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 获取单个 NFT 的批准地址。
         如果 `_tokenId` 不是有效的 NFT，则抛出异常。
    @param _tokenId 要查询其批准情况的 NFT 的 ID。
    """
    # 如果 `_tokenId` 不是有效的 NFT，则抛出异常
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

注意，`getApproved` _可以_ 返回零。 如果代币有效，它会返回 `self.idToApprovals[_tokenId]`。
如果没有批准者，该值为零。

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev 检查 `_operator` 是否是 `_owner` 的批准操作员。
    @param _owner 拥有 NFT 的地址。
    @param _operator 代表所有者行事的地址。
    """
    return (self.ownerToOperators[_owner])[_operator]
```

此函数检查是否允许 `_operator` 管理此合约中 `_owner` 的所有代币。
因为可以有多个操作员，所以这是一个两级 HashMap。

#### 转账辅助函数 {#transfer-helpers}

这些函数实现了代币转移或管理过程中的部分操作。

```python

### 转账函数辅助 ###

@view
@internal
```

这个装饰器 `@internal` 意味着该函数只能从
同一合约内的其他函数访问。 按照惯例，这些函数名也以下划线 (`_`) 开头。

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 返回给定的支出者是否可以转移给定的代币 ID
    @param spender 要查询的支出者地址
    @param tokenId 要转移的代币的 uint256 ID
    @return bool，表示 msg.sender 是否被批准用于给定的代币 ID，
        是所有者的操作员，还是代币的所有者
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

有三种方式可以允许一个地址转移代币：

1. 该地址是代币的所有者
2. 该地址被批准使用该代币
3. 该地址是代币所有者的操作员

上面的函数可以是一个视图函数，因为它不改变状态。 为了降低运营成本，任何
可以成为视图函数的函数都_应该_是视图函数。

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 将一个 NFT 添加到给定地址
         如果 `_tokenId` 已被某人拥有，则抛出异常。
    """
    # 如果 `_tokenId` 已被某人拥有，则抛出异常
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 更改所有者
    self.idToOwner[_tokenId] = _to
    # 更改计数跟踪
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 从给定地址移除一个 NFT
         如果 `_from` 不是当前所有者，则抛出异常。
    """
    # 如果 `_from` 不是当前所有者，则抛出异常
    assert self.idToOwner[_tokenId] == _from
    # 更改所有者
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # 更改计数跟踪
    self.ownerToNFTokenCount[_from] -= 1
```

当转账出现问题时，我们会回滚该调用。

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 清除给定地址的批准
         如果 `_owner` 不是当前所有者，则抛出异常。
    """
    # 如果 `_owner` 不是当前所有者，则抛出异常
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # 重置批准
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

仅在必要时更改值。 状态变量存在于存储中。 写入存储是
EVM（以太坊虚拟机）执行的最昂贵的操作之一（就
[燃料](/developers/docs/gas/)而言）。 因此，最好尽量减少写入操作，即使写入
现有值也会产生高昂的成本。

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev 执行 NFT 的转移。
         除非 `msg.sender` 是当前所有者、授权操作员或此 NFT 的批准
         地址，否则抛出异常。（注意：私有函数中不允许使用 `msg.sender`，因此传递 `_sender`。）
         如果 `_to` 是零地址，则抛出异常。
         如果 `_from` 不是当前所有者，则抛出异常。
         如果 `_tokenId` 不是有效的 NFT，则抛出异常。
    """
```

我们有这个内部函数，因为有两种转移代币的方式（常规和安全），但
我们希望只在代码中的一个位置执行它，以使审计更容易。

```python
    # 检查要求
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # 如果 `_to` 是零地址，则抛出异常
    assert _to != ZERO_ADDRESS
    # 清除批准。如果 `_from` 不是当前所有者，则抛出异常
    self._clearApproval(_from, _tokenId)
    # 移除 NFT。如果 `_tokenId` 不是有效的 NFT，则抛出异常
    self._removeTokenFrom(_from, _tokenId)
    # 添加 NFT
    self._addTokenTo(_to, _tokenId)
    # 记录转账
    log Transfer(_from, _to, _tokenId)
```

要在 Vyper 中发出事件，请使用 `log` 语句（[在此处查看更多详细信息](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)）。

#### 转账函数 {#transfer-funs}

```python

### 转账函数 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev 除非 `msg.sender` 是当前所有者、授权操作员或此 NFT 的批准
         地址，否则抛出异常。
         如果 `_from` 不是当前所有者，则抛出异常。
         如果 `_to` 是零地址，则抛出异常。
         如果 `_tokenId` 不是有效的 NFT，则抛出异常。
    @notice 调用者有责任确认 `_to` 能够接收 NFT，否则
            它们可能会永久丢失。
    @param _from NFT 的当前所有者。
    @param _to 新的所有者。
    @param _tokenId 要转移的 NFT。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

此函数允许你转移到任意地址。 除非该地址是用户，或者是一个知道
如何转移代币的合约，否则你转移的任何代币都将卡在该地址中并变得无用。

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev 将一个 NFT 的所有权从一个地址转移到另一个地址。
         除非 `msg.sender` 是当前所有者、授权操作员或此 NFT 的
         批准地址，否则抛出异常。
         如果 `_from` 不是当前所有者，则抛出异常。
         如果 `_to` 是零地址，则抛出异常。
         如果 `_tokenId` 不是有效的 NFT，则抛出异常。
         如果 `_to` 是一个智能合约，它会在 `_to` 上调用 `onERC721Received`，如果
         返回值不是 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`，则抛出异常。
         注意：bytes4 由带填充的 bytes32 表示
    @param _from NFT 的当前所有者。
    @param _to 新的所有者。
    @param _tokenId 要转移的 NFT。
    @param _data 没有指定格式的附加数据，在调用 `_to` 时发送。
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

可以先执行转移，因为如果出现问题，我们无论如何都会回滚，
所以调用中完成的所有操作都将被取消。

```python
    if _to.is_contract: # 检查 `_to` 是否是合约地址
```

首先检查该地址是否是合约（即它是否有代码）。 如果不是，则假定它是一个用户
地址，并且该用户将能够使用或转移代币。 但不要让它给你一种
虚假的安全感。 即使使用 `safeTransferFrom`，如果你将代币转移
到一个没有人知道其私钥的地址，你仍然可能会丢失代币。

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

调用目标合约，看它是否可以接收 ERC-721 代币。

```python
        # 如果转移目标是一个未实现 'onERC721Received' 的合约，则抛出异常
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

如果目标是一个合约，但它不接受 ERC-721 代币（或者决定不接受此
特定转移），则回滚。

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev 为一个 NFT 设置或重新确认批准地址。零地址表示没有批准地址。
         除非 `msg.sender` 是当前的 NFT 所有者，或者是当前所有者的授权操作员，否则抛出异常。
         如果 `_tokenId` 不是有效的 NFT，则抛出异常。（注意：这并未写入 EIP）
         如果 `_approved` 是当前所有者，则抛出异常。（注意：这并未写入 EIP）
    @param _approved 要为给定 NFT ID 批准的地址。
    @param _tokenId 要批准的代币 ID。
    """
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT，则抛出异常
    assert owner != ZERO_ADDRESS
    # 如果 `_approved` 是当前所有者，则抛出异常
    assert _approved != owner
```

按照惯例，如果你不想有批准者，你应该指定零地址，而不是你自己。

```python
    # 检查要求
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

要设置批准，你要么是所有者，要么是所有者授权的操作员。

```python
    # 设置批准
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev 为第三方（“操作员”）启用或禁用批准，以管理
         `msg.sender` 的所有资产。它还会发出 ApprovalForAll 事件。
         如果 `_operator` 是 `msg.sender`，则抛出异常。（注意：这并未写入 EIP）
    @notice 即使发送者当时不拥有任何代币，此操作也有效。
    @param _operator 要添加到授权操作员集合中的地址。
    @param _approved 如果操作员被批准，则为 True；如果撤销批准，则为 false。
    """
    # 如果 `_operator` 是 `msg.sender`，则抛出异常
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 铸造新代币和销毁现有代币 {#mint-burn}

创建合约的帐户是 `minter`（铸币者），即被授权铸造
新 NFT 的超级用户。 然而，即使是它，也不允许销毁现有代币。 只有所有者或所有者
授权的实体才能这样做。

```python
### 铸造和销毁函数 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

此函数始终返回 `True`，因为如果操作失败，它将被回滚。

```python
    """
    @dev 铸造代币的函数
         如果 `msg.sender` 不是铸币者，则抛出异常。
         如果 `_to` 是零地址，则抛出异常。
         如果 `_tokenId` 已被某人拥有，则抛出异常。
    @param _to 将接收铸造代币的地址。
    @param _tokenId 要铸造的代币 id。
    @return 一个布尔值，指示操作是否成功。
    """
    # 如果 `msg.sender` 不是铸币者，则抛出异常
    assert msg.sender == self.minter
```

只有铸币者（创建 ERC-721 合约的帐户）可以铸造新代币。 如果我们将来想改变铸币者的
身份，这可能会成为一个问题。 在
生产合约中，你可能需要一个允许铸币者将
铸币者特权转移给他人的函数。

```python
    # 如果 `_to` 是零地址，则抛出异常
    assert _to != ZERO_ADDRESS
    # 添加 NFT。如果 `_tokenId` 已被某人拥有，则抛出异常
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

按照惯例，新代币的铸造被视为从零地址的转移。

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 销毁一个特定的 ERC721 代币。
         除非 `msg.sender` 是当前所有者、授权操作员或此 NFT 的批准
         地址，否则抛出异常。
         如果 `_tokenId` 不是有效的 NFT，则抛出异常。
    @param _tokenId 要销毁的 ERC721 代币的 uint256 id。
    """
    # 检查要求
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # 如果 `_tokenId` 不是有效的 NFT，则抛出异常
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

任何被允许转移代币的人都可以销毁它。 虽然销毁看起来等同于
转移到零地址，但零地址实际上并不接收代币。 这使我们能够
释放用于该代币的所有存储空间，从而可以降低交易的燃料成本。

## 使用此合约 {#using-contract}

与 Solidity 相反，Vyper 没有继承。 这是一个刻意的设计选择，旨在使
代码更清晰，从而更容易保护。 因此，要创建你自己的 Vyper ERC-721 合约，你可以使用此
合约并修改它
以实现你想要的业务逻辑。

## 结论 {#conclusion}

作为回顾，以下是此合约中一些最重要的概念：

- 要通过安全转移接收 ERC-721 代币，合约必须实现 `ERC721Receiver` 接口。
- 即使你使用安全转移，如果将代币发送到一个其私钥
  未知的地址，代币仍然可能会卡住。
- 当操作出现问题时，一个好主意是 `revert`（回滚）该调用，而不是仅仅返回
  一个失败值。
- 当 ERC-721 代币有所有者时，它们才存在。
- 有三种方式可以被授权转移 NFT。 你可以是所有者，被批准用于特定代币，
  或者是所有者所有代币的操作员。
- 过去的事件仅在区块链外部可见。 在区块链内部运行的代码无法查看它们。

现在去实现安全的 Vyper 合约吧。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。

