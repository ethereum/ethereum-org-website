---
title: "Passo a passo do Contrato Vyper ERC-721"
description: Contrato ERC-721 de Ryuya Nakamura e como ele funciona
author: |
  Ori Pomerantz
lang: pt-br
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## Introdução {#introduction}

O padrão [ERC-721](/developers/docs/standards/tokens/erc-721/) é usado para manter a propriedade de Tokens Não Fungíveis (NFT).
Os tokens [ERC-20](/developers/docs/standards/tokens/erc-20/) se comportam como uma commodity, porque não há diferença entre tokens individuais.
Em contraste com isso, os tokens ERC-721 são projetados para ativos que são semelhantes, mas não idênticos, como diferentes [desenhos de gatos](https://www.cryptokitties.co/)
ou títulos para diferentes peças de imóveis.

Neste artigo, analisaremos o [contrato ERC-721 de Ryuya Nakamura](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy).
Este contrato é escrito em [Vyper](https://vyper.readthedocs.io/en/latest/index.html), uma linguagem de contrato semelhante ao Python, projetada para tornar mais difícil escrever código inseguro do que em Solidity.

## O Contrato {#contract}

```python
# @dev Implementação do padrão de token não fungível ERC-721.
# @author Ryuya Nakamura (@nrryuya)
# Modificado de: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Comentários em Vyper, como em Python, começam com um hash (`#`) e continuam até o final da linha. Comentários que incluem
`@<palavra-chave>` são usados pelo [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) para produzir documentação legível
por humanos.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

A interface ERC-721 é integrada à linguagem Vyper.
[Você pode ver a definição do código aqui](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
A definição da interface é escrita em Python, em vez de Vyper, porque as interfaces são usadas não apenas dentro da
blockchain, mas também ao enviar uma transação para a blockchain a partir de um cliente externo, que pode ser escrito em
Python.

A primeira linha importa a interface, e a segunda especifica que estamos implementando-a aqui.

### A interface ERC721Receiver {#receiver-interface}

```python
# Interface para o contrato chamado por safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

O ERC-721 suporta dois tipos de transferência:

- `transferFrom`, que permite ao remetente especificar qualquer endereço de destino e coloca a responsabilidade
  da transferência no remetente. Isso significa que você pode transferir para um endereço inválido, caso em que
  o NFT é perdido para sempre.
- `safeTransferFrom`, que verifica se o endereço de destino é um contrato. Se for, o contrato ERC-721
  pergunta ao contrato receptor se ele quer receber o NFT.

Para responder às solicitações de `safeTransferFrom`, um contrato de recebimento precisa implementar o `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

O endereço `_from` é o proprietário atual do token. O endereço `_operator` é aquele que
solicitou a transferência (esses dois podem não ser os mesmos, por causa das permissões).

```python
            _tokenId: uint256,
```

Os IDs de token ERC-721 são de 256 bits. Normalmente, eles são criados por hashing de uma descrição do que
o token representa.

```python
            _data: Bytes[1024]
```

A solicitação pode ter até 1024 bytes de dados do usuário.

```python
        ) -> bytes32: view
```

Para evitar casos em que um contrato aceite acidentalmente uma transferência, o valor de retorno não é um booleano,
mas 256 bits com um valor específico.

Essa função é uma `view`, o que significa que pode ler o estado da blockchain, mas não modificá-lo.

### Eventos {#events}

[Eventos](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)
são emitidos para informar usuários e servidores fora da blockchain sobre os eventos. Observe que o conteúdo dos eventos
não está disponível para contratos na blockchain.

```python
# @dev Emite quando a propriedade de qualquer NFT muda por qualquer mecanismo. Este evento é emitido quando os NFTs são
#      criados (`from` == 0) e destruídos (`to` == 0). Exceção: durante a criação do contrato, qualquer
#      número de NFTs pode ser criado e atribuído sem emitir Transfer. No momento de qualquer
#      transferência, o endereço aprovado para esse NFT (se houver) é redefinido para nenhum.
# @param _from Remetente do NFT (se o endereço for o endereço zero, isso indica a criação do token).
# @param _to Receptor do NFT (se o endereço for o endereço zero, indica a destruição do token).
# @param _tokenId O NFT que foi transferido.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

Isso é semelhante ao evento Transfer do ERC-20, exceto que relatamos um `tokenId` em vez de um valor.
Ninguém é dono do endereço zero, então, por convenção, nós o usamos para relatar a criação e a destruição de tokens.

```python
# @dev Isto emite quando o endereço aprovado para um NFT é alterado ou reafirmado. O endereço
#      zero indica que não há endereço aprovado. Quando um evento Transfer emite, isso também
#      indica que o endereço aprovado para esse NFT (se houver) é redefinido para nenhum.
# @param _owner Proprietário do NFT.
# @param _approved Endereço que estamos aprovando.
# @param _tokenId NFT que estamos aprovando.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

Uma aprovação ERC-721 é semelhante a uma permissão ERC-20. Um endereço específico tem permissão para transferir um token
específico. Isso dá um mecanismo para os contratos responderem quando aceitam um token. Contratos não podem
escutar eventos, então se você apenas transferir o token para eles, eles não "sabem" sobre isso. Dessa forma, o
proprietário primeiro envia uma aprovação e, em seguida, envia uma solicitação ao contrato: "Eu aprovei que você transfira o token
X, por favor, faça ...".

Esta é uma escolha de design para tornar o padrão ERC-721 semelhante ao padrão ERC-20. Como
os tokens ERC-721 não são fungíveis, um contrato também pode identificar que obteve um token específico
observando a propriedade do token.

```python
# @dev Isto emite quando um operador é habilitado ou desabilitado para um proprietário. O operador pode gerenciar
#      todos os NFTs do proprietário.
# @param _owner Proprietário do NFT.
# @param _operator Endereço para o qual estamos definindo os direitos do operador.
# @param _approved Status dos direitos do operador (verdadeiro se os direitos do operador forem concedidos e falso se
# revogado).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

Às vezes é útil ter um _operador_ que pode gerenciar todos os tokens de um tipo específico de uma conta (aqueles que são gerenciados por
um contrato específico), semelhante a uma procuração. Por exemplo, eu talvez queira dar esse poder a um contrato que verifica se
eu não o contatei por seis meses e, em caso afirmativo, distribui meus ativos para meus herdeiros (se um deles pedir, os contratos
não podem fazer nada sem serem chamados por uma transação). No ERC-20, podemos simplesmente dar uma alta permissão a um contrato de herança,
mas isso não funciona para o ERC-721 porque os tokens não são fungíveis. Este é o equivalente.

O valor `aprovado` nos diz se o evento é para uma aprovação ou a retirada de uma aprovação.

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
os dados não inicializados são sempre zero, então se não houver proprietário ou transferidor aprovado, o valor para aquele token
será zero.

```python
# @dev Mapeamento do endereço do proprietário para a contagem de seus tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Esta variável contém a contagem de tokens para cada proprietário. Não há mapeamento de proprietários para tokens, então
a única maneira de identificar os tokens que um proprietário específico possui é olhar para trás no histórico de eventos da blockchain
e ver os eventos `Transfer` apropriados. Podemos usar essa variável para saber quando temos todos os NFTs e não
precisamos procurar ainda mais no tempo.

Note que este algoritmo funciona apenas para interfaces de usuário e servidores externos. Código rodando na blockchain
em si não pode ler eventos passados.

```python
# @dev Mapeamento de endereço de proprietário para mapeamento de endereços de operador.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Uma conta pode ter mais de um único operador. Um simples `HashMap` é insuficiente para
rastreá-los, porque cada chave leva a um único valor. Em vez disso, você pode usar
`HashMap[address, bool]` como o valor. Por padrão, o valor para cada endereço é `False`, o que significa que ele
não é um operador. Você pode definir os valores como `True` conforme necessário.

```python
# @dev Endereço do minter, que pode cunhar um token
minter: address
```

Novos tokens precisam ser criados de alguma forma. Neste contrato, há uma única entidade que tem permissão para fazer isso, o
`minter`. Isso provavelmente é suficiente para um jogo, por exemplo. Para outros fins, pode ser necessário
criar uma lógica de negócios mais complicada.

```python
# @dev Mapeamento do ID da interface para bool sobre se é ou não suportado
supportedInterfaces: HashMap[bytes32, bool]

# @dev ID da interface ERC165 do ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ID da interface ERC165 do ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

O [ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica um mecanismo para um contrato divulgar como os aplicativos
podem se comunicar com ele, e a quais ERCs ele se conforma. Nesse caso, o contrato está em conformidade com o ERC-165 e o ERC-721.

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
    @dev Construtor do contrato.
    """
```

Em Python, e em Vyper, você também pode criar um comentário especificando uma string de várias linhas (que começa e termina
com `"""`), e não usá-la de forma alguma. Esses comentários também podem incluir
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

Para acessar as variáveis de estado, você usa `self.<nome da variável>`` (novamente, como em Python).

#### Funções de Visualização {#views}

Estas são funções que não modificam o estado da blockchain e, portanto, podem ser executadas
gratuitamente se forem chamadas externamente. Se as funções de visualização forem chamadas por um contrato, elas ainda precisarão ser executadas em
cada nó e, portanto, custarão gás.

```python
@view
@external
```

Essas palavras-chave antes de uma definição de função que começam com um sinal de arroba (`@`) são chamadas de _decorações_. Elas
especificam as circunstâncias em que uma função pode ser chamada.

- `@view` especifica que esta função é uma visualização.
- `@external` especifica que esta função específica pode ser chamada por transações e por outros contratos.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Ao contrário do Python, o Vyper é uma [linguagem de tipagem estática](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Você não pode declarar uma variável, ou um parâmetro de função, sem identificar o [tipo de dados](https://vyper.readthedocs.io/en/latest/types.html). Nesse caso, o parâmetro de entrada é `bytes32`, um valor de 256 bits
(256 bits é o tamanho de palavra nativo da [Máquina Virtual Ethereum](/developers/docs/evm/)). A saída é um valor
booleano. Por convenção, os nomes dos parâmetros da função começam com um sublinhado (`_`).

```python
    """
    @dev A identificação da interface é especificada no ERC-165.
    @param _interfaceID Id da interface
    """
    return self.supportedInterfaces[_interfaceID]
```

Retorne o valor do HashMap `self.supportedInterfaces`, que é definido no construtor (`__init__`).

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
         Lança uma exceção se `_owner` for o endereço zero. NFTs atribuídos ao endereço zero são considerados inválidos.
    @param _owner Endereço para o qual consultar o saldo.
    """
    assert _owner != ZERO_ADDRESS
```

Esta linha [afirma](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` não é
zero. Se for, há um erro e a operação é revertida.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Retorna o endereço do proprietário do NFT.
         Lança uma exceção se `_tokenId` não for um NFT válido.
    @param _tokenId O identificador para um NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lança uma exceção se `_tokenId` não for um NFT válido
    assert owner != ZERO_ADDRESS
    return owner
```

Na Máquina Virtual Ethereum (EVM), qualquer armazenamento que não tenha um valor armazenado nele é zero.
Se não houver token em `_tokenId`, o valor de `self.idToOwner[_tokenId]` será zero. Nesse
caso, a função é revertida.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev Obtenha o endereço aprovado para um único NFT.
         Lança uma exceção se `_tokenId` não for um NFT válido.
    @param _tokenId ID do NFT para consultar a aprovação.
    """
    # Lança uma exceção se `_tokenId` não for um NFT válido
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

Observe que `getApproved` _pode_ retornar zero. Se o token for válido, ele retorna `self.idToApprovals[_tokenId]`.
Se não houver aprovador, esse valor é zero.

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

Esta função verifica se o `_operator` tem permissão para gerenciar todos os tokens do `_owner` neste contrato.
Como pode haver vários operadores, este é um HashMap de dois níveis.

#### Funções Auxiliares de Transferência {#transfer-helpers}

Essas funções implementam operações que fazem parte da transferência ou gerenciamento de tokens.

```python

### FUNÇÕES AUXILIARES DE TRANSFERÊNCIA ###

@view
@internal
```

Esta decoração, `@internal`, significa que a função só é acessível a partir de outras funções dentro do
mesmo contrato. Por convenção, esses nomes de função também começam com um sublinhado (`_`).

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev Retorna se o gastador informado pode transferir um determinado ID de token
    @param spender endereço do gastador para consultar
    @param tokenId uint256 ID do token a ser transferido
    @return bool se o msg.sender está aprovado para o ID de token informado,
        é um operador do proprietário ou é o proprietário do token
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

Há três maneiras pelas quais um endereço pode ter permissão para transferir um token:

1. O endereço é o proprietário do token
2. O endereço é aprovado para gastar esse token
3. O endereço é um operador para o proprietário do token

A função acima pode ser uma visualização porque não altera o estado. Para reduzir os custos operacionais, qualquer
função que _possa_ ser uma visualização _deve_ ser uma visualização.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev Adiciona um NFT a um determinado endereço
         Lança uma exceção se `_tokenId` for de propriedade de alguém.
    """
    # Lança uma exceção se `_tokenId` for de propriedade de alguém
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # Altera o proprietário
    self.idToOwner[_tokenId] = _to
    # Altera o rastreamento da contagem
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove um NFT de um determinado endereço
         Lança uma exceção se `_from` não for o proprietário atual.
    """
    # Lança uma exceção se `_from` não for o proprietário atual
    assert self.idToOwner[_tokenId] == _from
    # Altera o proprietário
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # Altera o rastreamento da contagem
    self.ownerToNFTokenCount[_from] -= 1
```

Quando há um problema com uma transferência, revertemos a chamada.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Limpa a aprovação de um determinado endereço
         Lança uma exceção se `_owner` não for o proprietário atual.
    """
    # Lança uma exceção se `_owner` não for o proprietário atual
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # Redefinir aprovações
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

Altere o valor apenas se necessário. As variáveis de estado ficam no armazenamento. Gravar no armazenamento é
uma das operações mais caras que a EVM (Máquina Virtual Ethereum) faz (em termos de
[gás](/developers/docs/gas/)). Portanto, é uma boa ideia minimizá-la, mesmo que a escrita do
valor existente tenha um custo alto.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Executa a transferência de um NFT.
         Lança uma exceção, a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o endereço
         aprovado para este NFT. (NOTA: `msg.sender` não é permitido em função privada, então passe `_sender`.)
         Lança uma exceção se `_to` for o endereço zero.
         Lança uma exceção se `_from` não for o proprietário atual.
         Lança uma exceção se `_tokenId` não for um NFT válido.
    """
```

Temos essa função interna porque há duas maneiras de transferir tokens (regular e segura), mas
queremos apenas um único local no código onde fazemos isso para facilitar a auditoria.

```python
    # Verificar requisitos
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Lança uma exceção se `_to` for o endereço zero
    assert _to != ZERO_ADDRESS
    # Limpar aprovação. Lança uma exceção se `_from` não for o proprietário atual
    self._clearApproval(_from, _tokenId)
    # Remover NFT. Lança uma exceção se `_tokenId` não for um NFT válido
    self._removeTokenFrom(_from, _tokenId)
    # Adicionar NFT
    self._addTokenTo(_to, _tokenId)
    # Registrar a transferência
    log Transfer(_from, _to, _tokenId)
```

Para emitir um evento em Vyper, você usa uma instrução `log` ([veja aqui para mais detalhes](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### Funções de Transferência {#transfer-funs}

```python

### FUNÇÕES DE TRANSFERÊNCIA ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Lança uma exceção, a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o
         endereço aprovado para este NFT.
         Lança uma exceção se `_from` não for o proprietário atual.
         Lança uma exceção se `_to` for o endereço zero.
         Lança uma exceção se `_tokenId` não for um NFT válido.
    @notice O chamador é responsável por confirmar que `_to` é capaz de receber NFTs, caso contrário
            eles podem ser permanentemente perdidos.
    @param _from O proprietário atual do NFT.
    @param _to O novo proprietário.
    @param _tokenId O NFT a ser transferido.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Esta função permite que você transfira para um endereço arbitrário. A menos que o endereço seja de um usuário ou de um contrato que
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
    @dev Transfere a propriedade de um NFT de um endereço para outro.
         Lança uma exceção, a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o
         endereço aprovado para este NFT.
         Lança uma exceção se `_from` não for o proprietário atual.
         Lança uma exceção se `_to` for o endereço zero.
         Lança uma exceção se `_tokenId` não for um NFT válido.
         Se `_to` for um contrato inteligente, ele chama `onERC721Received` em `_to` e lança uma exceção se
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

Primeiro, verifique se o endereço é um contrato (se ele tem código). Caso contrário, presuma que é um endereço de
usuário e que o usuário poderá usar o token ou transferi-lo. Mas não deixe que isso o iluda
com uma falsa sensação de segurança. Você pode perder tokens, mesmo com `safeTransferFrom`, se os transferir
para um endereço cuja chave privada ninguém conhece.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Chame o contrato de destino para ver se ele pode receber tokens ERC-721.

```python
        # Lança uma exceção se o destino da transferência for um contrato que não implementa 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

Se o destino for um contrato, mas um que não aceita tokens ERC-721 (ou que decidiu não aceitar esta
transferência em particular), reverta.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Define ou reafirma o endereço aprovado para um NFT. O endereço zero indica que não há endereço aprovado.
         Lança uma exceção, a menos que `msg.sender` seja o proprietário atual do NFT ou um operador autorizado do proprietário atual.
         Lança uma exceção se `_tokenId` não for um NFT válido. (NOTA: Isso não está escrito no EIP)
         Lança uma exceção se `_approved` for o proprietário atual. (NOTA: Isso não está escrito no EIP)
    @param _approved Endereço a ser aprovado para o ID de NFT fornecido.
    @param _tokenId ID do token a ser aprovado.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lança uma exceção se `_tokenId` não for um NFT válido
    assert owner != ZERO_ADDRESS
    # Lança uma exceção se `_approved` for o proprietário atual
    assert _approved != owner
```

Por convenção, se você não quiser ter um aprovador, você nomeia o endereço zero, não a si mesmo.

```python
    # Verificar requisitos
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

Para definir uma aprovação, você pode ser o proprietário ou um operador autorizado pelo proprietário.

```python
    # Definir a aprovação
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Habilita ou desabilita a aprovação para um terceiro ("operador") gerenciar todos os
         ativos de `msg.sender`. Também emite o evento ApprovalForAll.
         Lança uma exceção se `_operator` for o `msg.sender`. (NOTA: Isso não está escrito no EIP)
    @notice Isso funciona mesmo que o remetente não possua nenhum token no momento.
    @param _operator Endereço a ser adicionado ao conjunto de operadores autorizados.
    @param _approved Verdadeiro se os operadores forem aprovados, falso para revogar a aprovação.
    """
    # Lança uma exceção se `_operator` for o `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### Cunhar Novos Tokens e Destruir os Existentes {#mint-burn}

A conta que criou o contrato é o `minter`, o superusuário que está autorizado a cunhar
novos NFTs. No entanto, mesmo ele não tem permissão para queimar tokens existentes. Apenas o proprietário, ou uma entidade
autorizada pelo proprietário, pode fazer isso.

```python
### FUNÇÕES DE CUNHAGEM E QUEIMA ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

Esta função sempre retorna `True`, porque se a operação falhar, ela é revertida.

```python
    """
    @dev Função para cunhar tokens
         Lança uma exceção se `msg.sender` não for o minter.
         Lança uma exceção se `_to` for o endereço zero.
         Lança uma exceção se `_tokenId` for de propriedade de alguém.
    @param _to O endereço que receberá os tokens cunhados.
    @param _tokenId O id do token a ser cunhado.
    @return Um booleano que indica se a operação foi bem-sucedida.
    """
    # Lança uma exceção se `msg.sender` não for o minter
    assert msg.sender == self.minter
```

Apenas o minter (a conta que criou o contrato ERC-721) pode cunhar novos tokens. Isso pode ser um
problema no futuro se quisermos mudar a identidade do minter. Em
um contrato de produção, você provavelmente desejaria uma função que permitisse ao minter transferir
os privilégios de minter para outra pessoa.

```python
    # Lança uma exceção se `_to` for o endereço zero
    assert _to != ZERO_ADDRESS
    # Adicionar NFT. Lança uma exceção se `_tokenId` for de propriedade de alguém
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

Por convenção, a cunhagem de novos tokens conta como uma transferência do endereço zero.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev Queima um token ERC721 específico.
         Lança uma exceção, a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o endereço
         aprovado para este NFT.
         Lança uma exceção se `_tokenId` não for um NFT válido.
    @param _tokenId id uint256 do token ERC721 a ser queimado.
    """
    # Verificar requisitos
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Lança uma exceção se `_tokenId` não for um NFT válido
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

Qualquer pessoa que tenha permissão para transferir um token tem permissão para queimá-lo. Embora uma queima pareça equivalente a uma
transferência para o endereço zero, o endereço zero na verdade não recebe o token. Isso nos permite
liberar todo o armazenamento que foi usado para o token, o que pode reduzir o custo de gás da transação.

## Usando este Contrato {#using-contract}

Em contraste com o Solidity, o Vyper não tem herança. Essa é uma escolha de design deliberada para tornar o
código mais claro e, portanto, mais fácil de proteger. Então, para criar seu próprio contrato Vyper ERC-721, você pega este
contrato e o modifica
para implementar a lógica de negócios que você deseja.

## Conclusão {#conclusion}

Para revisão, aqui estão algumas das ideias mais importantes deste contrato:

- Para receber tokens ERC-721 com uma transferência segura, os contratos precisam implementar a interface `ERC721Receiver`.
- Mesmo se você usar a transferência segura, os tokens ainda podem ficar presos se você os enviar para um endereço cuja chave privada
  é desconhecida.
- Quando há um problema com uma operação, é uma boa ideia `reverter` a chamada, em vez de apenas retornar
  um valor de falha.
- Os tokens ERC-721 existem quando têm um proprietário.
- Existem três maneiras de ser autorizado a transferir um NFT. Você pode ser o proprietário, ser aprovado para um token específico
  ou ser um operador para todos os tokens do proprietário.
- Eventos passados são visíveis apenas fora da blockchain. O código em execução dentro da blockchain não pode visualizá-los.

Agora, vá e implemente contratos Vyper seguros.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).

