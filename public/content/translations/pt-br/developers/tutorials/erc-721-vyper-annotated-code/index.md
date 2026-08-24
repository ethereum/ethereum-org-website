---
title: "Passo a passo do contrato ERC-721 em Vyper"
description: "O contrato ERC-721 de Ryuya Nakamura e como ele funciona"
author: Ori Pomerantz
lang: pt-br
tags: ["Vyper", "erc-721", "Python"]
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

Os comentários em Vyper, assim como em Python, começam com um hash (`ethereum.ercs`) e continuam até o final da linha. Comentários que incluem
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

```python
#pragma version >0.3.10
```

```python
#pragma version >0.3.10
```
### A Interface ERC721Receiver

```python
# Interface para o contrato chamado por safeTransferFrom()
interface ERC721Receiver:
    def onERC721Received(
```

O ERC-721 suporta dois tipos de transferência:

- `transferFrom`, que permite ao remetente especificar qualquer endereço de destino e coloca a responsabilidade pela transferência no remetente. Isso significa que você pode transferir para um endereço inválido, caso em que o NFT é perdido para sempre.
- `safeTransferFrom`, que verifica se o endereço de destino é um contrato. Se for, o contrato ERC-721 pergunta ao contrato receptor se ele deseja receber o NFT.

Para responder às solicitações `safeTransferFrom`, um contrato receptor deve implementar `ERC721Receiver`.

```python
            _operator: address,
            _from: address,
```

O endereço `_from` é o proprietário atual do token. O endereço `_operator` é aquele que solicitou a transferência (esses dois podem não ser os mesmos, devido a permissões). Por convenção, a maioria dos parâmetros de função neste contrato começa com um sublinhado (`_`).

```python
            _tokenId: uint256,
```

Os IDs de token ERC-721 têm 256 bits. Normalmente, eles são criados por meio da geração de hash de uma descrição do que quer que o token represente.

```python
            _data: Bytes[1024]
```

A solicitação pode ter até 1024 bytes de dados do usuário.

```python
        ) -> bytes4: nonpayable
```

Para evitar casos em que um contrato aceite acidentalmente uma transferência, o valor de retorno não é um booleano, mas um valor específico de quatro bytes, o seletor de função de `onERC721Received`. A função é `nonpayable` porque um contrato receptor pode alterar seu próprio estado quando aceita um token.
### Eventos

[Eventos](/developers/docs/smart-contracts/anatomy/#events-and-logs)
são emitidos para informar usuários e servidores fora da blockchain sobre acontecimentos. Observe que o conteúdo dos eventos
não está disponível para contratos na blockchain. Os três eventos ERC-721 são definidos pela interface `IERC721` que
importamos, portanto, este contrato não os declara por si só; ele os emite com `log IERC721.<Event>(...)`, como veremos
nas funções de transferência abaixo.

`Transfer` (`sender`, `receiver`, `token_id`) relata uma mudança na propriedade de um NFT. Isso é semelhante ao
evento Transfer do ERC-20, exceto que relatamos um `token_id` em vez de um valor. Ninguém é dono do endereço zero, então, por
convenção, o usamos para relatar a criação e destruição de tokens. A única exceção é a criação de contratos, durante a
qual qualquer número de NFTs pode ser criado e atribuído sem emitir `Transfer`.

Uma aprovação ERC-721 é semelhante a uma permissão ERC-20: um endereço específico tem permissão para transferir um token específico,
e `Approval` (`owner`, `approved`, `token_id`) é emitido sempre que esse endereço aprovado é definido ou reafirmado.
Isso fornece um mecanismo para que os contratos respondam quando aceitam um token. Os contratos não podem escutar eventos, então, se
você apenas transferir o token para eles, eles não "saberão" disso. Dessa forma, o proprietário primeiro envia uma aprovação e
depois envia uma solicitação ao contrato: "Eu aprovei para você transferir o token X, por favor, faça...". Esta é uma escolha de design
para tornar o padrão ERC-721 semelhante ao padrão ERC-20. Como os tokens ERC-721 não são fungíveis, um
contrato também pode identificar que obteve um token específico observando a propriedade do token.

Por fim, `ApprovalForAll` (`owner`, `operator`, `approved`) é emitido quando um _operador_ é ativado ou desativado para
um proprietário. Às vezes, é útil ter um operador que possa gerenciar todos os tokens de uma conta de um tipo específico
(aqueles que são gerenciados por um contrato específico), semelhante a uma procuração. Por exemplo, eu posso querer dar
esse poder a um contrato que verifica se eu não o contatei por seis meses e, se for o caso, distribui meus ativos aos
meus herdeiros (se um deles solicitar, os contratos não podem fazer nada sem serem chamados por uma transação). No ERC-20
podemos simplesmente dar uma permissão alta a um contrato de herança, mas isso não funciona para o ERC-721 porque os tokens
não são fungíveis. Este é o equivalente. O valor `approved` nos diz se o evento é para uma aprovação ou para a
retirada de uma aprovação.
### Variáveis de Estado

Estas variáveis contêm o estado atual dos tokens: quais estão disponíveis e quem os possui. A maioria delas
são objetos `HashMap`, [mapeamentos unidirecionais que existem entre dois tipos](https://vyper.readthedocs.io/en/latest/types.html#mappings).

```python
# @dev Mapeamento do ID do NFT para o endereço que o possui.
idToOwner: HashMap[uint256, address]

# @dev Mapeamento do ID do NFT para o endereço aprovado.
idToApprovals: HashMap[uint256, address]
```

As identidades de usuários e contratos no Ethereum são representadas por endereços de 160 bits. Essas duas variáveis mapeiam
os IDs de token para seus proprietários e aqueles aprovados para transferi-los (no máximo um para cada). No Ethereum,
dados não inicializados são sempre zero, portanto, se não houver proprietário ou transferidor aprovado, o valor para esse token
será zero.

```python
# @dev Mapeamento do endereço do proprietário para a contagem de seus tokens.
ownerToNFTokenCount: HashMap[address, uint256]
```

Esta variável mantém a contagem de tokens para cada proprietário. Não há mapeamento de proprietários para tokens, portanto,
a única maneira de identificar os tokens que um proprietário específico possui é olhar para trás no histórico de eventos da blockchain
e ver os eventos `Transfer` apropriados. Podemos usar essa variável para saber quando temos todos os NFTs e não
precisamos olhar ainda mais para trás no tempo.

Observe que este algoritmo funciona apenas para interfaces de usuário e servidores externos. O código em execução na própria blockchain
não pode ler eventos passados.

```python
# @dev Mapeamento do endereço do proprietário para o mapeamento de endereços de operadores.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

Uma conta pode ter mais de um único operador. Um `HashMap` simples é insuficiente para
rastreá-los, porque cada chave leva a um único valor. Em vez disso, você pode usar
`HashMap[address, bool]` como o valor. Por padrão, o valor para cada endereço é `False`, o que significa que não
é um operador. Você pode definir os valores como `True` conforme necessário.

```python
# @dev Endereço do cunhador, que pode cunhar um token
minter: address
```

Novos tokens precisam ser criados de alguma forma. Neste contrato, há uma única entidade que tem permissão para fazer isso, o
`minter` (cunhador). Isso provavelmente é suficiente para um jogo, por exemplo. Para outros fins, pode ser necessário
criar uma lógica de negócios mais complicada.

```python
# @dev Lista estática de IDs de interface ERC165 suportados
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ID de interface ERC165 do ERC165
    0x01ffc9a7,
    # ID de interface ERC165 do ERC721
    0x80ac58cd,
]
```

O [ERC-165](https://eips.ethereum.org/EIPS/eip-165) especifica um mecanismo para um contrato divulgar como os aplicativos
podem se comunicar com ele, a quais ERCs ele está em conformidade. `SUPPORTED_INTERFACES` é uma lista constante dos dois
IDs de interface de quatro bytes aos quais este contrato está em conformidade: o próprio ERC-165 e o ERC-721.
### Funções {#functions}

Estas são as funções que realmente implementam o ERC-721.

#### Construtor

```python
@deploy
def __init__():
```

No Vyper, assim como no Python, a função do construtor é chamada de `__init__`. Ela é marcada com a decoração `@deploy`,
o que significa que é executada uma vez, quando o contrato é implantado.

```python
    """
    @dev Construtor do contrato.
    """
```

No Python e no Vyper, você também pode criar um comentário especificando uma string de várias linhas (que começa e termina
com `"""`) e não a usando de forma alguma. Esses comentários também podem incluir
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html).

```python
    self.minter = msg.sender
```

Para acessar variáveis de estado, você usa `self.<nome da variável>` (novamente, o mesmo que no Python). O construtor registra a
conta que implantou o contrato como o `minter` (cunhador).
#### Funções de Visualização

Estas são funções que não modificam o estado da blockchain e, portanto, podem ser executadas
gratuitamente se forem chamadas externamente. Se as funções de visualização forem chamadas por um contrato, elas ainda terão que ser executadas em
cada nó e, portanto, custarão gás.

```python
@view
@external
```

Essas palavras-chave antes de uma definição de função que começam com um sinal de arroba (`@`) são chamadas de _decorações_. Elas
especificam as circunstâncias em que uma função pode ser chamada.

- `@view` especifica que esta função é uma visualização.
- `@external` especifica que esta função em particular pode ser chamada por transações e por outros contratos.

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

Em contraste com o Python, o Vyper é uma [linguagem de tipagem estática](https://wikipedia.org/wiki/Type_system#Static_type_checking).
Você não pode declarar uma variável ou um parâmetro de função sem identificar o [tipo de dados](https://vyper.readthedocs.io/en/latest/types.html). Neste caso, o parâmetro de entrada é `bytes4`, um valor de quatro bytes, e a saída é um valor booleano.

```python
    """
    @dev A identificação da interface é especificada no ERC-165.
    @param interface_id Id da interface
    """
    return interface_id in SUPPORTED_INTERFACES
```

Retorna `True` se `interface_id` for um dos IDs de interface na lista `SUPPORTED_INTERFACES`.

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
         Lança um erro se `_owner` for o endereço zero. NFTs atribuídos ao endereço zero são considerados inválidos.
    @param _owner Endereço para o qual consultar o saldo.
    """
    assert _owner != empty(address)
```

Esta linha [afirma (assert)](https://vyper.readthedocs.io/en/latest/statements.html#assert) que `_owner` não é
o endereço zero, escrito como `empty(address)`. Se for, há um erro e a operação é revertida.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev Retorna o endereço do proprietário do NFT.
         Lança um erro se `_tokenId` não for um NFT válido.
    @param _tokenId O identificador de um NFT.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lança um erro se `_tokenId` não for um NFT válido
    assert owner != empty(address)
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
    @dev Obtém o endereço aprovado para um único NFT.
         Lança um erro se `_tokenId` não for um NFT válido.
    @param _tokenId ID do NFT para consultar a aprovação.
    """
    # Lança um erro se `_tokenId` não for um NFT válido
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

Observe que `getApproved` _pode_ retornar zero. Se o token for válido, ele retorna `self.idToApprovals[_tokenId]`.
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
#### Funções Auxiliares de Transferência

Estas funções implementam operações que fazem parte da transferência ou gerenciamento de tokens.

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
        é um operador do proprietário ou é o proprietário do token
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
         Lança um erro se `_tokenId` for de propriedade de alguém.
    """
    # Lança um erro se `_tokenId` for de propriedade de alguém
    assert self.idToOwner[_tokenId] == empty(address)
    # Altera o proprietário
    self.idToOwner[_tokenId] = _to
    # Altera o rastreamento de contagem
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev Remove um NFT de um determinado endereço
         Lança um erro se `_from` não for o proprietário atual.
    """
    # Lança um erro se `_from` não for o proprietário atual
    assert self.idToOwner[_tokenId] == _from
    # Altera o proprietário
    self.idToOwner[_tokenId] = empty(address)
    # Altera o rastreamento de contagem
    self.ownerToNFTokenCount[_from] -= 1
```

Quando há um problema com uma transferência, revertemos a chamada.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev Limpa uma aprovação de um determinado endereço
         Lança um erro se `_owner` não for o proprietário atual.
    """
    # Lança um erro se `_owner` não for o proprietário atual
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # Redefine as aprovações
        self.idToApprovals[_tokenId] = empty(address)
```

Altere o valor apenas se necessário. As variáveis de estado vivem no armazenamento. Escrever no armazenamento é
uma das operações mais caras que a EVM (Máquina Virtual Ethereum) faz (em termos de
[gás](/developers/docs/gas/)). Portanto, é uma boa ideia minimizá-la, pois até mesmo escrever o
valor existente tem um custo alto.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev Executa a transferência de um NFT.
         Lança um erro a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o endereço
         aprovado para este NFT. (NOTA: `msg.sender` não é permitido em função privada, então passe `_sender`.)
         Lança um erro se `_to` for o endereço zero.
         Lança um erro se `_from` não for o proprietário atual.
         Lança um erro se `_tokenId` não for um NFT válido.
    """
```

Temos esta função interna porque existem duas maneiras de transferir tokens (regular e segura), mas
queremos apenas um único local no código onde fazemos isso para facilitar a auditoria.

```python
    # Verifica os requisitos
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # Lança um erro se `_to` for o endereço zero
    assert _to != empty(address)
    # Limpa a aprovação. Lança um erro se `_from` não for o proprietário atual
    self._clearApproval(_from, _tokenId)
    # Remove o NFT. Lança um erro se `_tokenId` não for um NFT válido
    self._removeTokenFrom(_from, _tokenId)
    # Adiciona o NFT
    self._addTokenTo(_to, _tokenId)
    # Registra a transferência
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

Para emitir um evento no Vyper, você usa uma instrução `log` ([veja aqui para mais detalhes](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).
Como os eventos pertencem à interface importada, nós nos referimos a eles como `IERC721.Transfer` e passamos seus campos por
palavra-chave.
#### Funções de Transferência

```python

### FUNÇÕES DE TRANSFERÊNCIA ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Lança um erro a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o endereço
         aprovado para este NFT.
         Lança um erro se `_from` não for o proprietário atual.
         Lança um erro se `_to` for o endereço zero.
         Lança um erro se `_tokenId` não for um NFT válido.
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

A decoração `@payable` está aqui porque a interface `IERC721` declara `transferFrom`, `safeTransferFrom` e
`approve` como pagáveis (payable), então um contrato que implementa a interface tem que corresponder a essas assinaturas.

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfere a propriedade de um NFT de um endereço para outro endereço.
         Lança um erro a menos que `msg.sender` seja o proprietário atual, um operador autorizado ou o
         endereço aprovado para este NFT.
         Lança um erro se `_from` não for o proprietário atual.
         Lança um erro se `_to` for o endereço zero.
         Lança um erro se `_tokenId` não for um NFT válido.
         Se `_to` for um contrato inteligente, ele chama `onERC721Received` em `_to` e lança um erro se
         o valor de retorno não for `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    @param _from O proprietário atual do NFT.
    @param _to O novo proprietário.
    @param _tokenId O NFT a ser transferido.
    @param _data Dados adicionais sem formato especificado, enviados na chamada para `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

Não há problema em fazer a transferência primeiro porque, se houver um problema, vamos reverter de qualquer maneira,
então tudo o que foi feito na chamada será cancelado.

```python
    if _to.is_contract: # verifica se `_to` é um endereço de contrato
```

Primeiro, verifique se o endereço é um contrato (se ele tem código). Se não, assuma que é um endereço de usuário
e o usuário poderá usar o token ou transferi-lo. Mas não deixe que isso o iluda com
uma falsa sensação de segurança. Você pode perder tokens, mesmo com `safeTransferFrom`, se os transferir
para um endereço para o qual ninguém conhece a chave privada.

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

Chame o contrato de destino para ver se ele pode receber tokens ERC-721. O Vyper 0.4 exige que as chamadas para outros contratos
sejam marcadas, portanto, a chamada é prefixada com `extcall`.

```python
        # Lança um erro se o destino da transferência for um contrato que não implementa 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

Se o destino for um contrato, mas que não aceita tokens ERC-721 (ou que decidiu não aceitar esta
transferência em particular), reverta.

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Define ou reafirma o endereço aprovado para um NFT. O endereço zero indica que não há endereço aprovado.
         Lança um erro a menos que `msg.sender` seja o proprietário atual do NFT ou um operador autorizado do proprietário atual.
         Lança um erro se `_tokenId` não for um NFT válido. (NOTA: Isso não está escrito na EIP)
         Lança um erro se `_approved` for o proprietário atual. (NOTA: Isso não está escrito na EIP)
    @param _approved Endereço a ser aprovado para o ID do NFT fornecido.
    @param _tokenId ID do token a ser aprovado.
    """
    owner: address = self.idToOwner[_tokenId]
    # Lança um erro se `_tokenId` não for um NFT válido
    assert owner != empty(address)
    # Lança um erro se `_approved` for o proprietário atual
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
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Ativa ou desativa a aprovação para um terceiro ("operador") gerenciar todos os
         ativos de `msg.sender`. Também emite o evento ApprovalForAll.
         Lança um erro se `_operator` for o `msg.sender`. (NOTA: Isso não está escrito na EIP)
    @notice Isso funciona mesmo se o remetente não possuir nenhum token no momento.
    @param _operator Endereço a ser adicionado ao conjunto de operadores autorizados.
    @param _approved True se os operadores forem aprovados, false para revogar a aprovação.
    """
    # Lança um erro se `_operator` for o `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
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
