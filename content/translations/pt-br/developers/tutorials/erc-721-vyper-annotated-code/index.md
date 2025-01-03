---
title: "Passo a passo do contrato Vyper ERC-721"
description: Ryuya Nakamura's ERC-721 contrato e como funciona
author: Ori Pomerantz
lang: pt-br
tags:
  - "vyper"
  - "erc-721"
  - "python"
skill: beginner
published: 2021-04-01
---

## Introdução {#introduction}

O [ERC-721](/developers/docs/standards/tokens/erc-721/) padrão é usado para manter a propriedade de tokens não fungíveis (NFT). [ERC-20](/developers/docs/standards/tokens/erc-20/) os tokens se comportam como uma mercadoria, porque não há diferença entre os totens individuais. Em contraste com isso, ERC-721 tokens são projetados para ativos semelhantes, mas não idênticos, como diferentes [cat cartoons](https://www.cryptokitties.co/) ou títulos de diferentes imóveis.

Neste artigo, vamos analisar o [contrato ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy). Este contrato é escrito em [Vyper](https://vyper.readthedocs.io/en/latest/index.html), a Python-like linguagem de contrato projetada para tornar é mais difícil escrever código inseguro do que na solidez.

## O Contrato {#contract}

```python
# @dev Implementation of ERC-721 non-fungible token standard.
# @author Ryuya Nakamura (@nrryuya)
# Modified from: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Comentários em Vyper, como em Python, começam com um hash (`#`) e continuam até o final da linha. Comentários que incluem `@<keyword>` são usados ​​por [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) para produzir documentação legível para humanos.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

A interface ERC-721 é construída na linguagem Vyper. [você pode ver o código definido aqui](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py). A definição da interface é escrita em Python, em vez de Vyper, porque as interfaces são usadas não apenas dentro da blockchain, mas também ao enviar à blockchain uma transação de um cliente externo, que pode ser escrito em Python.

A primeira linha importa a ‘interface’, e o segundo especifica o que estamos incrementando aqui.

### A interface ERC721Receiver {#receiver-interface}

```python
# Interface for the contract called by safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 suporta dois tipos de transferência:

- ` transfere de `, que permite ao remetente especifique qualquer endereço de destino e coloca a responsabilidade para a transferência no remetente. Isso significa que você pode transferir para um endereço inválido, caso em que o NFT será perdido para sempre.
- `safeTransferFrom`, que verifica se o endereço de destino é um contrato. Se for assim, o contrato ERC-721 pergunta ao contrato receptor se deseja receber o NFT.

Para responder ` transferência segura de ` solicita um recebimento contrato deve implementar `ERC721 recebedor `.

```python
            _operator: address,
            _from: address,
```

O endereço `_de ` é o proprietário atual do token. O endereço `_operador` é aquele que solicitou a transferência (esses dois podem não ser o mesmo devido às provisões).

```python
            _tokenId: uint256,
```

ERC-721 token IDs está 256 bits. Normalmente, elas são criados por meio de uma execução de hash da descrição que o token representa.

```python
            _data: Bytes[1024]
```

O requerimento pode ter até 1024 bytes de dados do usuário.

```python
        ) -> bytes32: view
```

Para evitar casos em que um contrato acidentalmente aceita uma transferência o valor de retorno não é um booleano, mas 256 bits com um valor específico.

Essa função é uma `view`, o que significa que pode ler o estado da blockchain, mas não modificá-lo.

### Eventos {#events}

Os [eventos](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) são emitidos para informar usuários e servidores fora da blockchain de eventos. Observe que o conteúdo dos eventos não está disponível para contratos na blockchain.

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

Isso é similar para o evento ERC-20 Transfer, exceto que informamos um `tokenId` em vez de um valor. Ninguém possui o endereço zero, portanto, por convenção, o usamos para relatar a criação e a destruição de tokens.

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

Uma aprovação ERC-721 é semelhante a uma permissão ERC-20. Um endereço específico é autorizado a transferir um determinado símbolo. Isso fornece um mecanismo para os contratos responderem quando aceitam um token. Os contratos não podem ouvir os eventos, portanto, se você apenas transferir o token para eles, eles não “saberão” disso. Desta forma, primeiro, o proprietário envia uma aprovação e, em seguida, envia uma solicitação ao contrato: “Aprovei para você transferir o token X, faça…”.

Esse é o designe escolhido por fazer o ERC-721 padrão semelhante ao padrão ERC-20. Como os tokens ERC-721 não são fungíveis, um contrato também pode identificar que obteve um token específico olhando a propriedade do token.

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

Às vezes, é útil ter um _operador_ que pode gerenciar todos os tokens da conta de um tipo específico (aqueles gerenciados por um contrato específico), semelhante a uma procuração. Por exemplo, eu posso querer dar tal poder a um contrato que verifica se Eu não tenho contatado ele por seis meses, e se assim for distribuo os meus bens aos meus herdeiros (se um deles o pedir, contrata não pode fazer nada sem ser chamado por uma transação). No ERC-20, podemos simplesmente atribuir uma provisão alta a um contrato de herança, mas isso não funciona para ERC-721, pois os tokens não são fungíveis. Isso é o equivalente.

O valor `approved` nos informa se o evento é para uma aprovação ou a retirada de uma aprovação.

### Variáveis ​​de Estado {#state-vars}

Essas variáveis contêm o estado atual dos tokens: os quais estão disponíveis e a quem os possui. A maioria delas são objetos `HashMap`, [mapeamentos unidirecionais que existem entre dois tipos](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]
```

As identidades de usuários e contratos no Ethereum são representados por endereços de 160 bits. Essas duas variáveis mapeiam IDs de tokens para seus proprietários e aqueles aprovados a transferi-los (no máximo um para cada). No Ethereum, os dados não inicializados são sempre zero, pois, se não houver proprietário ou transferidor aprovado, o valor desse token será zero.

```python
# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Essa variável possui a contagem de tokens para cada proprietário. Não há mapeamento de proprietários para tokens, então, a única forma de identificar os tokens que um proprietário específico possui é olhar para trás no histórico de eventos da blockchain e ver os eventos `Transfer` apropriados. Podemos usar essa variável para saber quando temos todos os NFTs e não precisaremos mais olhar ainda mais no tempo.

Observe que esse algoritmo funciona apenas para interfaces do usuário e servidores externos. Código em execução na blockchain em si não pode ler eventos passados.

```python
# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Uma conta pode ter mais de um único operador. Um simples `HashMap` é insuficiente para mantê-los, pois cada chave gera um único valor. Em vez disso, você pode usar `HashMap[address, bool]` como valor. Por padrão, o valor para cada endereço é `False`, o que significa que ele não é um operador. Você pode definir valores como `True` conforme necessário.

```python
# @dev Address of minter, who can mint a token
minter: address
```

Novos tokens têm de ser criados de alguma forma. Neste contrato há uma única entidade que está autorizada a fazê-lo, o `minter`. É provável que isso seja suficiente para um jogo, por exemplo. Para outros propósitos, pode ser necessário criar uma lógica de negócio mais complicada.

```python
# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica um mecanismo para um contrato divulgar como aplicações podem se comunicar com ele, com os quais ERCs ele está em conformidade. Neste caso, o contrato está em conformidade com ERC-165 e ERC-721.

### Funções {#functions}

Estas são as funções que realmente implementam o ERC-721.

#### Construtor {#constructor}

```python
@external
def __init__():
```

No Vyper, assim como no Python, a função construtora é chamada `__init__`.

```python
    """
    @dev Contract constructor.
    """
```

No Python e no Vyper, você também pode criar um comentário especificando uma string de múltiplas linhas (que começa e termina com `"""`), e não usá-lo de qualquer forma. Esses comentários também podem incluir [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Para acessar variáveis de estado, você usa `self.<variable name>` (novamente, o mesmo que em Python).

#### Exibir funções {#views}

São funções que não modificam o estado da blockchain e, por isso, podem ser executadas gratuitamente se chamadas externamente. Se as funções de exibição forem chamadas por um contrato, elas ainda têm de ser executadas em cada nó e, portanto, custam gás.

```python
@view
@external
```

Essas palavras-chave anteriores a uma definição de função que começam com um sinal de (`@`) são chamadas de _decoradores_. Elas especificam as circunstâncias em que uma função pode ser chamada.

- `@view` especifica que esta função é um modo de exibição.
- `@external` especifica que essa função em particular pode ser chamada por transações e por outros contratos.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Ao contrário do Python, o Vyper é uma [linguagem de tipo estática](https://wikipedia.org/wiki/Type_system#Static_type_checking). Você não pode declarar uma variável ou um parâmetro de função, sem identificar os tipos de [dados](https://vyper.readthedocs.io/en/latest/types.html). Neste caso, o parâmetro de entrada é `bytes32`, um valor de 256 bits (256 bits é o tamanho da palavra nativa da [Máquina Virtual do Ethereum](/developers/docs/evm/)). A saída é um booleano valor. Por convenção, os nomes dos parâmetros da função começam com um sublinhado (`_`).

```python
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Retorne o valor do `self.supportedInterfaces` HashMap, o qual é definido no construtor (`__init__`).

```python
### VIEW FUNCTIONS ###
```

Estas são as funções de visualização que fornecem informações sobre os tokens disponíveis para usuários e outros contratos.

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

Esta linha [afirma](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` não é zero. Se for zero, há um erro e a operação é anulada.

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

Na Máquina Virtual do Ethereum (EVM) qualquer armazenamento que não tenha um valor armazenado nele é zero. Se não houver token em `_tokenId`, o valor de `self.idToOwner[_tokenId]` é zero. Naquilo caso a função reverta.

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

Observe que `getApproved` _pode_ retornar zero. Se o token for válido, ele retorna `self.idToApprovals[_tokenId]`. Se não houver aprovador, esse valor é zero.

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

Esta função checa se `_operator` tem permissão para gerenciar todos os tokens de `_owner` neste contrato. Como pode haver vários operadores, este é um Hashmap de dois níveis.

#### Funções Auxiliares de Transferência {#transfer-helpers}

Essas funções implementam operações que fazem parte da transferência ou gerenciamento de tokens.

```python

### TRANSFER FUNCTION HELPERS ###

@view
@internal
```

Este decorador, `@internal`, significa que a função é somente acessível de outras funções dentro do mesmo contrato. Por convenção, estes nomes de função também começam com um sublinhado (`_`).

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

Há três maneiras na qual um endereço pode ser permitido a transferir um token:

1. O endereço é o proprietário do token
2. O endereço é aprovado a gastar o token
3. O endereço é um operador do proprietário do token

A função acima pode ser uma view porque ela não muda o estado. Para reduzir custos operacionais, qualquer função que _possa_ ser uma view, _deve_ ser uma view.

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

Quando há um problema com uma transferência, anulamos a chamada.

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

Altere o valor apenas se necessário. Variáveis de estado vivem no armazenamento. Escrever para o storage é uma das operações mais caras que a EVM (Máquina Virtual Ethereum) faz (em termos de [gas](/developers/docs/gas/)). Portanto, é uma boa ideia minimizá-lo, mesmo escrevendo o valor existente tem um custo alto.

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

Nós temos esta função interna porque há duas maneiras de transferir tokens (normal e segura), mas nós queremos somente uma única localização no código onde nós fazemos isso para facilitar auditoria.

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

Para emitir um evento em Vyper você usa uma declaração de `log` ([veja aqui para mais detalhes](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funções de Transferência {#transfer-funs}

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

Esta função deixa você transferir para um endereço arbitrário. A não ser que o endereço é um usuário, ou um contrato que sabe como transferir tokens, qualquer token que você transferir ficará preso no endereço e inútil.

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

Tudo bem fazer a transferência primeiro, porque se der um problema, vamos revertê-la de qualquer maneira, a fim de anular tudo o que foi feito durante a chamada.

```python
    if _to.is_contract: # check if `_to` is a contract address
```

Primeiro cheque para ver se o endereço é um contrato (se ele tem código). Se não, assuma que ele é um endereço de usuário e o usuário será capaz de usar o token ou transferi-lo. Mas não deixe que isso engane você com uma falsa sensação de segurança. Você pode perder tokens, mesmo com `safeTransferFrom`, se você transferi-los para um endereço que ninguém conhece a chave privada.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Chame o contrato-alvo para ver se ele pode receber tokens ERC-721.

```python
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Se o destino é um contrato, mas um que não aceita tokens ERC-721 (ou que decide não aceitar esta transferência em particular), reverta.

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

Por convenção, se você não quiser ter um aprovador, designe o endereço zero, não você mesmo.

```python
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Para configurar um aprovador você pode ou ser o proprietário, ou um operador autorizado pelo proprietário.

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

#### Cunhar novos tokens e destruir os existentes {#mint-burn}

A conta que criou o contrato é o `minter`, o superusuário autorizado a cunhar novos NFTs. No entanto, mesmo isso não é autorizado para queimar tokens existentes. Somente o proprietário, ou uma entidade autorizada pelo proprietário, podem fazer isso.

```python
### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Esta função sempre retorna `True`, porque se a operação falhar, ela é revertida.

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

Somente o minter (a conta que criou o contrato ERC-721) pode cunhar novos tokens. Isso pode ser um problema no futuro se você quiser mudar a identidade do minter. Em um contrato de produção, provavelmente seria desejável ter uma função que permita ao minter transferir privilégios de minter para uma outra pessoa.

```python
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Por convenção, a cunhagem de novos tokens conta como uma transferência do endereço zero.

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

Qualquer pessoa autorizada a transferir um token, tem permissão para queimá-lo. Enquanto uma queima aparece equivalente à transferência para o endereço zero, o endereço zero não recebe de verdade o token. Isso permite-nos liberar todo o armazenamento usado pelo token, o que pode reduzir o custo de gás da transação.

# Usando este contrato {#using-contract}

Ao contrário do Solidity, o Vyper não tem herança. Esta é uma escolha de design deliberada para tornar o código mais claro e, com isso, mais fácil de proteger. Portanto, para criar seu próprio contrato Vyper ERC-721, você usa [este contrato](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) e o modifica para implementar a lógica comercial que você desejar.

# Conclusão {#conclusion}

Recapitulando, aqui estão algumas das ideias mais importantes neste contrato:

- Para receber os tokens ERC-721 com uma transferência segura, os contratos têm de implementar a interface `ERC721Receiver`.
- Mesmo que você use a transferência segura, os tokens ainda podem ficar presos se você os enviar para um endereço cuja chave privada.
- Quando há um problema com uma operação, é uma boa ideia fazer o `revert` da chamada, em vez de apenas retornar um valor de falha.
- Os tokens ERC-721 existem quando eles têm um proprietário.
- Existem três formas de ser autorizado a transferir um NFT. Você pode ser o proprietário, ser aprovado para um token específico, ou ser um operador para todos os tokens do proprietário.
- Eventos passados são visíveis apenas fora da blockchain. O código executando dentro da blockchain não pode visualizá-los.

Agora, você está pronto para implementar contratos Vyper seguros.
