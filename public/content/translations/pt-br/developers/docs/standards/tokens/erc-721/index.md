---
title: ERC-721 Padrão de token não-fungível
description: Conheça sobre ERC-721, o padrão para tokens não substituíveis (NFTs) que representam um único Ethereum digital.
lang: pt-br
---

## Introdução {#introduction}

**O que é um Token Não Fungível?**

Um token não fungível (NFT) é utilizado para identificar algo ou alguém de uma forma única. Este tipo de token é perfeito para ser
usado em plataformas que oferecem itens colecionáveis, acessar chaves, bilhetes de loteria, assentos numerados para concertos,
jogos esportivos etc. Este tipo especial de token tem possibilidades incríveis, então merece um padrão adequado, o ERC-721!

**O que é ERC-721?**

O ERC-721 apresenta um padrão para NFT. Em outras palavras, este tipo de token é único e pode ter um valor diferente
do que outro token do mesmo contrato inteligente, talvez devido a sua validade, raridade ou mesmo sua aparência.
Um momento, aparência?

Sim! Todos os NFTs têm uma variável `uint256` chamada `tokenId`, então, para qualquer Contrato ERC-721, o par
`contract address, uint256 tokenId` deve ser globalmente único. Dito isso, um dapp pode ter um "conversor" que
usa o `tokenId` como entrada e produz uma imagem de algo legal, como zumbis, armas, habilidades ou gatinhos incríveis!

## Pré-requisitos {#prerequisites}

- [Contas](/developers/docs/accounts/)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Padrões de token](/developers/docs/standards/tokens/)

## Body {#body}

O ERC-721(Ethereum Request for Comments 721), proposto por William Entriken, Dieter Shirley, Jacob Evans e
Nastassia Sachs em janeiro de 2018, é um padrão de token não-fungível que implementa uma API para tokens em contratos inteligentes.

Oferece funcionalidades, como transferir tokens de uma conta para outra, para obter o saldo atual do token de uma conta
e também a oferta total do token disponível na rede.
Além disso, ele também tem algumas outras funcionalidades
como aprovar que uma quantidade de token de uma conta pode ser gasta por uma conta de terceiros.

Se um contrato inteligente implementa os métodos e eventos a seguir, ele pode ser chamado de Contrato de token ERC-721 e, uma vez implantado, é responsável por fazer um acompanhamento dos tokens criados no Ethereum.

De [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Métodos {#métodos}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### Eventos {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Exemplos {#web3py-example}

Vejamos por que um padrão é importante e como ele simplifica o controle de qualquer contrato de token ERC-721 no Ethereum.
Só precisamos da Interface Binária de Aplicativos (ABI, pela sigla em inglês) do contrato para criar uma interface com qualquer token ERC-721. Como você pode
ver abaixo, usaremos uma ABI simplificada, para torná-la um exemplo de fácil compreensão.

#### Exemplo de Web3.py {#web3py-example}

Primeiro, certifique-se de que você instalou a biblioteca Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Contrato CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Leilão de Vendas CryptoKitties

# Esta é uma Interface Binária de Aplicação de Contrato (ABI) simplificada de um Contrato de NFT ERC-721.
# Ela exporá apenas os métodos: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs em leilões: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs grávidos: {pregnant_kitties}")

# Usando o ABI do Evento de Transferência para obter informações sobre os Kitties transferidos.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Precisamos da assinatura do evento para filtrar os logs
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Observações:
#   - Aumente o número de blocos acima de 120 se nenhum evento de Transferência for retornado.
#   - Se você não encontrou nenhum evento de Transferência, também pode tentar obter um tokenId em:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Clique para expandir os logs do evento e copie seu argumento "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Cole o "tokenId" aqui do link acima
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFT {kitty_id} está grávido: {is_pregnant}")
```

Contrato de CriptoKitties tem alguns eventos interessantes além dos padrões.

Vamos verificar dois deles, `Pregnant` e `Birth`.

```python
# Usando o ABI dos eventos Pregnant e Birth para obter informações sobre novos Kitties.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# Precisamos da assinatura do evento para filtrar os logs
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Aqui está um evento Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Aqui está um evento Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFTs populares {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) lista os principais NFTs no Ethereum por volume de transferências.
- [CryptoKitties](https://www.cryptokitties.co/) é um jogo centrado em criaturas criáveis, colecionáveis e superadoráveis
  que chamamos de CryptoKitties.
- [Sorare](https://sorare.com/) é um jogo de futebol fantasia global onde você pode colecionar itens colecionáveis de edição limitada,
  gerenciar suas equipes e competir para ganhar prêmios.
- [O Ethereum Name Service (ENS)](https://ens.domains/) oferece uma maneira segura e descentralizada de endereçar recursos tanto
  dentro quanto fora da blockchain usando nomes simples e legíveis por humanos.
- [POAP](https://poap.xyz) entrega NFTs gratuitos para pessoas que participam de eventos ou concluem ações específicas. Os POAPs são livres para criar e distribuir.
- [Unstoppable Domains](https://unstoppabledomains.com/) é uma empresa com sede em São Francisco que constrói domínios em
  blockchains. Domínios de blockchain substituem endereços de criptomoedas por nomes legíveis por humanos e podem ser usados para habilitar
  sites resistentes à censura.
- [Gods Unchained Cards](https://godsunchained.com/) é um TCG na blockchain Ethereum que usa NFTs para trazer propriedade real
  para os ativos do jogo.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) é uma coleção de 10.000 NFTs únicos que, além de ser uma obra de arte comprovadamente rara, funciona como um token de associação ao clube, oferecendo vantagens e benefícios aos membros que aumentam com o tempo como resultado dos esforços da comunidade.

## Leitura adicional {#further-reading}

- [EIP-721: Padrão de Token Não Fungível ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Documentação do ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementação do ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API de NFT da Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
