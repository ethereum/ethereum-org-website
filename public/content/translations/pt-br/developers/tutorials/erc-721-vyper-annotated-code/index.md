---
title: "Passo a passo do contrato ERC-721 em Vyper"
description: "O contrato ERC-721 de Ryuya Nakamura e como ele funciona"
author: Ori Pomerantz
lang: pt-br
tags: ["vyper", "erc-721", "python"]
skill: beginner
breadcrumb: "ERC-721 em Vyper"
published: 2021-04-01
---

## Introdução {#introduction}

O padrão [ERC-721](/developers/docs/standards/tokens/erc-721/) é usado para manter a propriedade de Tokens Não Fungíveis (NFT).
Os tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) se comportam como uma commodity, porque não há diferença entre tokens individuais.
Em contraste a isso, os tokens ERC-721 são projetados para ativos que são semelhantes, mas não idênticos, como diferentes [desenhos de gatos](https://www.cryptokitties.co/)
ou títulos de diferentes propriedades imobiliárias.

Neste artigo, analisaremos o [contrato ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Este contrato é escrito em [Vyper](https://vyper.readthedocs.io/en/latest/index.html), uma linguagem de contrato semelhante ao Python projetada para tornar mais difícil escrever código inseguro do que na linguagem Solidity.

## O Contrato {#contract}

```python
# @dev Implementação do padrão de token não fungível ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modificado de: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Os comentários em Vyper, assim como em Python, começam com um hash (`#`) e continuam até o final da linha. Comentários que incluem
`@<keyword>` são usados pelo [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) para produzir documentação legível por humanos.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

A interface ERC-721 é integrada à linguagem Vyper.
[Você pode ver a definição do código aqui](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
A definição da interface é escrita em Python, em vez de Vyper, porque as interfaces são usadas não apenas dentro da
blockchain, mas também ao enviar à blockchain uma transação de um cliente externo, que pode ser escrito em
Python.

A primeira linha importa a interface, e a segunda especifica que a estamos implementando aqui.

### A Interface ERC721Receiver {#receiver-interface}

```python
# Interface para o contrato chamado por safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

O ERC-721 suporta dois tipos de transferência:

- `transferFrom`, que permite ao remetente especificar qualquer endereço de destino e coloca a responsabilidade
  pela transferência no remetente. Isso significa que você pode transferir para um endereço inválido, caso em que
  o NFT é perdido para sempre.
- `safeTransferFrom`, que verifica se o endereço de destino é um contrato. Se for, o contrato ERC-721
  pergunta ao contrato receptor se ele deseja receber o NFT.

Para responder às solicitações `safeTransferFrom`, um contrato receptor deve implementar `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

O endereço `_from` é o proprietário atual do token. O endereço `_operator` é aquele que
solicitou a transferência (esses dois podem não ser os mesmos, devido a permissões).

```python
            _tokenId: uint256,
```

Os IDs de token ERC-721 têm 256 bits. Normalmente, eles são criados pela geração de hash de uma descrição do que quer que
o token represente.

```python
            _data: Bytes[1024]
```

A solicitação pode ter até 1024 bytes de dados do usuário.

```python
        ) -> bytes32: view
```

Para evitar casos em que um contrato acidentalmente aceita uma transferência, o valor de retorno não é um booleano,
mas 256 bits com um valor específico.

Esta função é uma `view`, o que significa que ela pode ler o estado da blockchain, mas não modificá-lo.

### Eventos {#events}

[Eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs)
são emitidos para informar usuários e servidores fora da blockchain sobre eventos. Observe que o conteúdo dos eventos
não está disponível para contratos na blockchain.

```python
# @dev Emitido quando a propriedade de qualquer NFT muda por qualquer mecanismo. Este evento é emitido quando NFTs são
#      criados (`from` == 0) e destruídos (`to` == 0). Exceção: durante a criação do contrato, qualquer
#      número de NFTs pode ser criado e atribuído sem emitir Transfer. No momento de qualquer
#      transferência, o endereço aprovado para aquele NFT (se houver) é redefinido para nenhum.
# @param _from Remetente do NFT (se o endereço for o endereço zero, indica a criação do token).
# @param _to Recebedor do NFT (se o endereço for o endereço zero, indica a destruição do token).
# @param _tokenId O NFT que foi transferido.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Isso é semelhante ao evento Transfer do ERC-20, exceto que relatamos um `tokenId` em vez de uma quantia.
Ninguém é dono do endereço zero, então, por convenção, o usamos para relatar a criação e destruição de tokens.

```python
# @dev Emitido quando o endereço aprovado para um NFT é alterado ou reafirmado. O endereço zero
#      indica que não há endereço aprovado. Quando um evento Transfer é emitido, isso também
#      indica que o endereço aprovado para aquele NFT (se houver) é redefinido para nenhum.
# @param _owner Proprietário do NFT.
# @param _approved Endereço que estamos aprovando.
# @param _tokenId NFT que estamos aprovando.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Uma aprovação ERC-721 é semelhante a uma permissão ERC-20. Um endereço específico tem permissão para transferir um
token específico. Isso fornece um mecanismo para os contratos responderem quando aceitam um token. Os contratos não podem
escutar eventos, então, se você apenas transferir o token para eles, eles não "saberão" sobre isso. Dessa forma, o
proprietário primeiro envia uma aprovação e depois envia uma solicitação ao contrato: "Eu aprovei para você transferir o token
X, por favor, faça...".

Esta é uma escolha de design para tornar o padrão ERC-721 semelhante ao padrão ERC-20. Como
os tokens ERC-721 não são fungíveis, um contrato também pode identificar que obteve um token específico
observando a propriedade do token.

```python
# @dev Emitido quando um operador é habilitado ou desabilitado para um proprietário. O operador pode gerenciar
#      todos os NFTs do proprietário.
# @param _owner Proprietário do NFT.
# @param _operator Endereço para o qual estamos definindo os direitos de operador.
# @param _approved Status dos direitos de operador (true se os direitos de operador forem concedidos e false se
# revogados).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Às vezes é útil ter um _operador_ que possa gerenciar todos os tokens de uma conta de um tipo específico (aqueles que são gerenciados por
um contrato específico), semelhante a uma procuração. Por exemplo, eu posso querer dar tal poder a um contrato que verifica se
eu não o contatei por seis meses e, se for o caso, distribui meus ativos aos meus herdeiros (se um deles pedir, os contratos
não podem fazer nada sem serem chamados por uma transação). No ERC-20, podemos apenas dar uma alta permissão a um contrato de herança,
mas isso não funciona para o ERC-721 porque os tokens não são fungíveis. Este é o equivalente.

O valor `approved` nos diz se o evento é para uma aprovação ou para a retirada de uma aprovação.

### Variáveis de Estado {#state-vars}

Essas variáveis contêm o estado atual dos tokens: quais estão disponíveis e quem os possui. A maioria deles
são objetos `HashMap`, [mapeamentos unidirecionais que existem entre dois tipos](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapeamento do ID do NFT para o endereço que o possui.
idToOwner: HashMap[uint256, address]

# @dev Mapeamento do ID do NFT para o endereço aprovado.
idToApprovals: HashMap[uint256, address]
```

As identidades de usuários e contratos no Ethereum são representadas por endereços de 160 bits. Essas duas variáveis mapeiam
de IDs de token para seus proprietários e aqueles aprovados para transferi-los (no máximo um para cada). No Ethereum,
dados não inicializados são sempre zero, então, se não houver proprietário ou transferidor aprovado, o valor para esse token
é zero.

```python
# @dev Mapeamento do endereço do proprietário para a contagem de seus tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Esta variável mantém a contagem de tokens para cada proprietário. Não há mapeamento de proprietários para tokens, então
a única maneira de identificar os tokens que um proprietário específico possui é olhar para trás no histórico de eventos da blockchain
e ver os eventos `Transfer` apropriados. Podemos usar essa variável para saber quando temos todos os NFTs e não
precisamos olhar ainda mais para trás no tempo.

Observe que este algoritmo funciona apenas para interfaces de usuário e servidores externos. O código em execução na própria blockchain
não pode ler eventos passados.

```python
# @dev Mapeamento do endereço do proprietário para o mapeamento de endereços de operadores.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Uma conta pode ter mais de um único operador. Um simples `HashMap` é insuficiente para
rastreá-los, porque cada chave leva a um único valor. Em vez disso, você pode usar
`HashMap[address, bool]` como o valor. Por padrão, o valor para cada endereço é `False`, o que significa que não
é um operador. Você pode definir valores para `True` conforme necessário.

```python
# @dev Endereço do cunhador, que pode cunhar um token
minter: address
```

Novos tokens precisam ser criados de alguma forma. Neste contrato, há uma única entidade que tem permissão para fazer isso, o
`minter`. Isso provavelmente será suficiente para um jogo, por exemplo. Para outros propósitos, pode ser necessário
criar uma lógica de negócios mais complicada.

```python
# @dev Mapeamento do id da interface para bool sobre se é suportada ou não
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID da interface ERC-165 do ERC-165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID da interface ERC-165 do ERC-721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

O [ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica um mecanismo para um contrato divulgar como os aplicativos
podem se comunicar com ele, a quais ERCs ele está em conformidade. Neste caso, o contrato está em conformidade com o ERC-165 e o ERC-721.

### Funções {#functions}

Estas são as funções que realmente implementam o ERC-721.

#### Construtor {#constructor}

```python
@external
def __init__():
```

Em Vyper, assim como em Python, a função do construtor é chamada de `__init__`.

```python
    """
    @dev Construtor do contrato.
    """
```

Em Python e em Vyper, você também pode criar um comentário especificando uma string de várias linhas (que começa e termina
com `"""`) e não a usando de forma alguma. Esses comentários também podem incluir
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Para acessar variáveis de estado, você usa `self.<variable name>` (novamente, o mesmo que em Python).

#### Funções de Visualização {#views}

Estas são funções que não modificam o estado da blockchain e, portanto, podem ser executadas gratuitamente
se forem chamadas externamente. Se as funções de visualização forem chamadas por um contrato, elas ainda terão que ser executadas em
cada nó e, portanto, custarão gás.

```python
@view
@external
```

Essas palavras-chave antes de uma definição de função que começam com um sinal de arroba (`@`) são chamadas de _decorações_ (decorations). Elas
especificam as circunstâncias em que uma função pode ser chamada.

- `@view` especifica que esta função é uma visualização (view).
- `@external` especifica que esta função em particular pode ser chamada por transações e por outros contratos.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Em contraste com o Python, o Vyper é uma [linguagem de tipagem estática](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Você não pode declarar uma variável ou um parâmetro de função sem identificar o [tipo de dados](https://vyper.readthedocs.io/en/latest/types.html). Neste caso, o parâmetro de entrada é `bytes32`, um valor de 256 bits
(256 bits é o tamanho de palavra nativo da [Ethereum Virtual Machine](/developers/docs/evm/)). A saída é um valor booleano.
Por convenção, os nomes dos parâmetros de função começam com um sublinhado (`_`).

```python
    """
    @dev A identificação da interface é especificada no ERC-165.
    @param _interfaceID Id da interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Retorna o valor do HashMap `self.supportedInterfaces`, que é definido no construtor (`__init__`).

```python
### FUNÇÕES DE VISUALIZAÇÃO ###
```

Estas são as funções de visualização que disponibilizam informações sobre os tokens para usuários e outros contratos.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev Retorna o número de NFTs de propriedade de `_owner`.
         Reverte se `_owner` for o endereço zero. NFTs atribuídos ao endereço zero são considerados inválidos.
    @param _owner Endereço para o qual consultar o saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Esta linha [afirma (asserts)](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` não é
zero. Se for, há um erro e a operação é revertida.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Retorna o endereço do proprietário do NFT.
         Reverte se `_tokenId` não for um NFT válido.
    @param _tokenId O identificador de um NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Reverte se `_tokenId` não for um NFT válido
    assert owner != ZERO_ADDRESS
    return owner
```

Na Ethereum Virtual Machine (EVM), qualquer armazenamento que não tenha um valor armazenado nele é zero.
Se não houver token em `_tokenId`, o valor de `self.idToOwner[_tokenId]` será zero. Nesse
caso, a função é revertida.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Obtém o endereço aprovado para um único NFT.
         Reverte se `_tokenId` não for um NFT válido.
    @param _tokenId ID do NFT para consultar a aprovação.
    """
    # Reverte se `_tokenId` não for um NFT válido
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Observe que `getApproved` _pode_ retornar zero. Se o token for válido, ele retornará `self.idToApprovals[_tokenId]`.
Se não houver aprovador, esse valor será zero.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev Verifica se `_operator` é um operador aprovado para `_owner`.
    @param _owner O endereço que possui os NFTs.
    @param _operator O endereço que atua em nome do proprietário.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

Esta função verifica se `_operator` tem permissão para gerenciar todos os tokens de `_owner` neste contrato.
Como pode haver vários operadores, este é um HashMap de dois níveis.

#### Funções Auxiliares de Transferência {#transfer-helpers}

Essas funções implementam operações que fazem parte da transferência ou do gerenciamento de tokens.

```python

### AUXILIARES DE FUNÇÃO DE TRANSFERÊNCIA ###

@view
@internal
```

Esta decoração, `@internal`, significa que a função só é acessível a partir de outras funções dentro do
mesmo contrato. Por convenção, os nomes dessas funções também começam com um sublinhado (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Retorna se o gastador fornecido pode transferir um determinado ID de token
    @param spender endereço do gastador a ser consultado
    @param tokenId uint256 ID do token a ser transferido
    @return bool se o msg.sender está aprovado para o ID de token fornecido,
        é um operador do proprietário, ou é o proprietário do token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Existem três maneiras pelas quais um endereço pode ter permissão para transferir um token:

1. O endereço é o proprietário do token
2. O endereço está aprovado para gastar esse token
3. O endereço é um operador para o proprietário do token

A função acima pode ser uma visualização porque não altera o estado. Para reduzir os custos operacionais, qualquer
função que _possa_ ser uma visualização _deve_ ser uma visualização.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Adiciona um NFT a um determinado endereço
         Reverte se `_tokenId` for de propriedade de alguém.
    """
    # Reverte se `_tokenId` for de propriedade de alguém
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Altera o proprietário
    self.idToOwner[_tokenId] = _to
    # Altera o rastreamento de contagem
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove um NFT de um determinado endereço
         Reverte se `_from` não for o proprietário atual.
    """
    # Reverte se `_from` não for o proprietário atual
    assert self.idToOwner[_tokenId] == _from
    # Altera o proprietário
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Altera o rastreamento de contagem
    self.ownerToNFTokenCount[_from] -= 1
```

Quando há um problema com uma transferência, revertemos a chamada.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Limpa uma aprovação de um determinado endereço
         Reverte se `_owner` não for o proprietário atual.
    """
    # Reverte se `_owner` não for o proprietário atual
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Redefine aprovações
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Altere o valor apenas se necessário. As variáveis de estado vivem no armazenamento. Escrever no armazenamento é
uma das operações mais caras que a EVM (Ethereum Virtual Machine) faz (em termos de
[gás](/developers/docs/gas/)). Portanto, é uma boa ideia minimizá-lo, pois até mesmo escrever o
valor existente tem um custo alto.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Executa a transferência de um NFT.
         Reverte a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o endereço
         aprovado para este NFT. (NOTA: `msg.sender` não é permitido em função privada, então passe `_sender`.)
         Reverte se `_to` for o endereço zero.
         Reverte se `_from` não for o proprietário atual.
         Reverte se `_tokenId` não for um NFT válido.
    """
```

Temos esta função interna porque existem duas maneiras de transferir tokens (regular e segura), mas
queremos apenas um único local no código onde fazemos isso para facilitar a auditoria.

```python
    # Verifica os requisitos
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Reverte se `_to` for o endereço zero
    assert _to != ZERO_ADDRESS
    # Limpa a aprovação. Reverte se `_from` não for o proprietário atual
    self._clearApproval(_from, _tokenId)
    # Remove o NFT. Reverte se `_tokenId` não for um NFT válido
    self._removeTokenFrom(_from, _tokenId)
    # Adiciona o NFT
    self._addTokenTo(_to, _tokenId)
    # Registra a transferência
    log Transfer(_from, _to, _tokenId)
```

Para emitir um evento em Vyper, você usa uma instrução `log` ([veja aqui para mais detalhes](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funções de Transferência {#transfer-funs}

```python

### FUNÇÕES DE TRANSFERÊNCIA ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Reverte a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o endereço
         aprovado para este NFT.
         Reverte se `_from` não for o proprietário atual.
         Reverte se `_to` for o endereço zero.
         Reverte se `_tokenId` não for um NFT válido.
    @notice O chamador é responsável por confirmar que `_to` é capaz de receber NFTs ou então
            eles podem ser perdidos permanentemente.
    @param _from O proprietário atual do NFT.
    @param _to O novo proprietário.
    @param _tokenId O NFT a ser transferido.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Esta função permite que você transfira para um endereço arbitrário. A menos que o endereço seja um usuário ou um contrato que
saiba como transferir tokens, qualquer token que você transferir ficará preso nesse endereço e será inútil.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfere a propriedade de um NFT de um endereço para outro endereço.
         Reverte a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o
         endereço aprovado para este NFT.
         Reverte se `_from` não for o proprietário atual.
         Reverte se `_to` for o endereço zero.
         Reverte se `_tokenId` não for um NFT válido.
         Se `_to` for um contrato inteligente, ele chama `onERC721Received` em `_to` e reverte se
         o valor de retorno não for `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTA: bytes4 é representado por bytes32 com preenchimento
    @param _from O proprietário atual do NFT.
    @param _to O novo proprietário.
    @param _tokenId O NFT a ser transferido.
    @param _data Dados adicionais sem formato especificado, enviados na chamada para `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Não há problema em fazer a transferência primeiro porque, se houver um problema, vamos reverter de qualquer maneira,
então tudo o que for feito na chamada será cancelado.

```python
    if _to.is_contract: # verifica se `_to` é um endereço de contrato
```

Primeiro, verifique se o endereço é um contrato (se ele tem código). Se não, assuma que é um endereço de usuário
e o usuário poderá usar o token ou transferi-lo. Mas não deixe que isso o iluda
com uma falsa sensação de segurança. Você pode perder tokens, mesmo com `safeTransferFrom`, se os transferir
para um endereço para o qual ninguém conhece a chave privada.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Chame o contrato de destino para ver se ele pode receber tokens ERC-721.

```python
        # Reverte se o destino da transferência for um contrato que não implementa 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Se o destino for um contrato, mas que não aceita tokens ERC-721 (ou que decidiu não aceitar esta
transferência em particular), reverta.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Define ou reafirma o endereço aprovado para um NFT. O endereço zero indica que não há endereço aprovado.
         Reverte a menos que `msg.sender` seja o proprietário atual do NFT, ou um operador autorizado do proprietário atual.
         Reverte se `_tokenId` não for um NFT válido. (NOTA: Isso não está escrito no EIP)
         Reverte se `_approved` for o proprietário atual. (NOTA: Isso não está escrito no EIP)
    @param _approved Endereço a ser aprovado para o ID do NFT fornecido.
    @param _tokenId ID do token a ser aprovado.
    """
    owner: address = self.idToOwner[_tokenId]
    # Reverte se `_tokenId` não for um NFT válido
    assert owner != ZERO_ADDRESS
    # Reverte se `_approved` for o proprietário atual
    assert _approved != owner
```

Por convenção, se você não quiser ter um aprovador, você nomeia o endereço zero, não a si mesmo.

```python
    # Verifica os requisitos
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Para definir uma aprovação, você pode ser o proprietário ou um operador autorizado pelo proprietário.

```python
    # Define a aprovação
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Habilita ou desabilita a aprovação para um terceiro ("operador") gerenciar todos os
         ativos do `msg.sender`. Também emite o evento ApprovalForAll.
         Reverte se `_operator` for o `msg.sender`. (NOTA: Isso não está escrito no EIP)
    @notice Isso funciona mesmo se o remetente não possuir nenhum token no momento.
    @param _operator Endereço para adicionar ao conjunto de operadores autorizados.
    @param _approved True se os operadores forem aprovados, false para revogar a aprovação.
    """
    # Reverte se `_operator` for o `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Cunhar Novos Tokens e Destruir os Existentes {#mint-burn}

A conta que criou o contrato é o `minter`, o superusuário que está autorizado a cunhar
novos NFTs. No entanto, mesmo ele não tem permissão para queimar tokens existentes. Apenas o proprietário, ou uma entidade
autorizada pelo proprietário, pode fazer isso.

```python
### FUNÇÕES DE CUNHAR E QUEIMAR ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Esta função sempre retorna `True`, porque se a operação falhar, ela é revertida.

```python
    """
    @dev Função para cunhar tokens
         Reverte se `msg.sender` não for o cunhador.
         Reverte se `_to` for o endereço zero.
         Reverte se `_tokenId` for de propriedade de alguém.
    @param _to O endereço que receberá os tokens cunhados.
    @param _tokenId O id do token a ser cunhado.
    @return Um booleano que indica se a operação foi bem-sucedida.
    """
    # Reverte se `msg.sender` não for o cunhador
    assert msg.sender == self.minter
```

Apenas o cunhador (a conta que criou o contrato ERC-721) pode cunhar novos tokens. Isso pode ser um
problema no futuro se quisermos mudar a identidade do cunhador. Em
um contrato de produção, você provavelmente desejaria uma função que permitisse ao cunhador transferir
os privilégios de cunhador para outra pessoa.

```python
    # Reverte se `_to` for o endereço zero
    assert _to != ZERO_ADDRESS
    # Adiciona o NFT. Reverte se `_tokenId` for de propriedade de alguém
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Por convenção, a cunhagem de novos tokens conta como uma transferência do endereço zero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Queima um token ERC-721 específico.
         Reverte a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o endereço
         aprovado para este NFT.
         Reverte se `_tokenId` não for um NFT válido.
    @param _tokenId uint256 id do token ERC-721 a ser queimado.
    """
    # Verifica os requisitos
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Reverte se `_tokenId` não for um NFT válido
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Qualquer pessoa que tenha permissão para transferir um token tem permissão para queimá-lo. Embora uma queima pareça equivalente à
transferência para o endereço zero, o endereço zero não recebe o token de fato. Isso nos permite
liberar todo o armazenamento que foi usado para o token, o que pode reduzir o custo de gás da transação.

## Usando este Contrato {#using-contract}

Em contraste com a linguagem Solidity, o Vyper não tem herança. Esta é uma escolha de design deliberada para tornar o
código mais claro e, portanto, mais fácil de proteger. Portanto, para criar seu próprio contrato ERC-721 em Vyper, você pega [este
contrato](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) e o modifica
para implementar a lógica de negócios que deseja.

## Conclusão {#conclusion}

Para revisão, aqui estão algumas das ideias mais importantes neste contrato:

- Para receber tokens ERC-721 com uma transferência segura, os contratos devem implementar a interface `ERC721Receiver`.
- Mesmo se você usar a transferência segura, os tokens ainda podem ficar presos se você os enviar para um endereço cuja chave privada
  seja desconhecida.
- Quando há um problema com uma operação, é uma boa ideia `revert` a chamada, em vez de apenas retornar
  um valor de falha.
- Os tokens ERC-721 existem quando têm um proprietário.
- Existem três maneiras de ser autorizado a transferir um NFT. Você pode ser o proprietário, ser aprovado para um token específico,
  ou ser um operador para todos os tokens do proprietário.
- Eventos passados são visíveis apenas fora da blockchain. O código em execução dentro da blockchain não pode visualizá-los.

Agora vá e implemente contratos seguros em Vyper.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).