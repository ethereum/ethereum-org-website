---
title: Padrão de token não fungível ERC-721
description: Aprenda sobre o ERC-721, o padrão para tokens não fungíveis (NFTs) que representam ativos digitais únicos no Ethereum.
lang: pt-br
---

## Introdução {#introduction}

**O que é um token não fungível?**

Um token não fungível (NFT) é usado para identificar algo ou alguém de forma única. Esse tipo de token é perfeito para ser usado em plataformas que oferecem itens colecionáveis, chaves de acesso, bilhetes de loteria, assentos numerados para shows e partidas esportivas, etc. Esse tipo especial de token tem possibilidades incríveis, por isso merece um padrão adequado, e o ERC-721 veio para resolver isso!

**O que é o ERC-721?**

O ERC-721 introduz um padrão para NFT, em outras palavras, esse tipo de token é único e pode ter um valor diferente de outro token do mesmo contrato inteligente, talvez devido à sua idade, raridade ou até mesmo algo como o seu visual. Espere, visual?

Sim! Todos os NFTs têm uma variável `uint256` chamada `tokenId`, portanto, para qualquer contrato ERC-721, o par `contract address, uint256 tokenId` deve ser globalmente único. Dito isso, um aplicativo descentralizado (dapp) pode ter um "conversor" que usa o `tokenId` como entrada e gera uma imagem de algo legal, como zumbis, armas, habilidades ou gatinhos incríveis!

## Pré-requisitos {#prerequisites}

- [Contas](/developers/docs/accounts/)
- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Padrões de token](/developers/docs/standards/tokens/)

## Corpo {#body}

O ERC-721 ([Ethereum](/) Request for Comments 721), proposto por William Entriken, Dieter Shirley, Jacob Evans e Nastassia Sachs em janeiro de 2018, é um padrão de token não fungível que implementa uma API para tokens dentro de contratos inteligentes.

Ele fornece funcionalidades como transferir tokens de uma conta para outra, obter o saldo atual de tokens de uma conta, obter o proprietário de um token específico e também o fornecimento total do token disponível na rede. Além dessas, ele também tem algumas outras funcionalidades, como aprovar que uma quantidade de tokens de uma conta possa ser movida por uma conta de terceiros.

Se um contrato inteligente implementar os seguintes métodos e eventos, ele pode ser chamado de contrato de token não fungível ERC-721 e, uma vez implantado, será responsável por rastrear os tokens criados no Ethereum.

Do [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### Métodos {#methods}

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

Vamos ver como um padrão é tão importante para simplificar a inspeção de qualquer contrato de token ERC-721 no Ethereum. Precisamos apenas da Interface Binária de Aplicação (ABI) do contrato para criar uma interface para qualquer token ERC-721. Como você pode ver abaixo, usaremos uma ABI simplificada, para torná-lo um exemplo de baixo atrito.

#### Exemplo com Web3.py {#web3py-example-2}

Primeiro, certifique-se de ter instalado a biblioteca Python [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation):

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # Contrato CryptoKitties

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # Leilão de Vendas CryptoKitties

# Esta é uma Interface Binária de Aplicação (ABI) de Contrato simplificada de um Contrato NFT ERC-721.
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
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Usando a ABI do Evento Transfer para obter informações sobre Kitties transferidos.
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
#   - Aumente o número de blocos para mais de 120 se nenhum evento Transfer for retornado.
#   - Se você não encontrou nenhum evento Transfer, você também pode tentar obter um tokenId em:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Clique para expandir os logs do evento e copie seu argumento "tokenId"
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Cole o "tokenId" aqui a partir do link acima
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

O contrato do CryptoKitties tem alguns eventos interessantes além dos padrões.

Vamos verificar dois deles, `Pregnant` e `Birth`.

```python
# Usando a ABI dos Eventos Pregnant e Birth para obter informações sobre novos Kitties.
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

# Aqui está um Evento Pregnant:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Aqui está um Evento Birth:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFTs populares {#popular-nfts}

- O [Rastreador de NFT do Etherscan](https://etherscan.io/nft-top-contracts) lista os principais NFTs no Ethereum por volume de transferências.
- [CryptoKitties](https://www.cryptokitties.co/) é um jogo centrado em criaturas procriáveis, colecionáveis e muito adoráveis que chamamos de CryptoKitties.
- [Sorare](https://sorare.com/) é um jogo global de futebol de fantasia onde você pode coletar itens colecionáveis de edições limitadas, gerenciar seus times e competir para ganhar prêmios.
- [O Ethereum Name Service (ENS)](https://ens.domains/) oferece uma maneira segura e descentralizada de endereçar recursos dentro e fora da blockchain usando nomes simples e legíveis por humanos.
- O [POAP](https://poap.xyz) entrega NFTs gratuitos para pessoas que participam de eventos ou concluem ações específicas. Os POAPs são gratuitos para criar e distribuir.
- A [Unstoppable Domains](https://unstoppabledomains.com/) é uma empresa com sede em São Francisco que constrói domínios em blockchains. Os domínios de blockchain substituem endereços de criptomoeda por nomes legíveis por humanos e podem ser usados para habilitar sites resistentes à censura.
- [Gods Unchained Cards](https://godsunchained.com/) é um TCG (Trading Card Game) na blockchain do Ethereum que usa NFTs para trazer propriedade real aos ativos do jogo.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) é uma coleção de 10.000 NFTs únicos, que, além de ser uma obra de arte comprovadamente rara, atua como um token de associação ao clube, fornecendo vantagens e benefícios aos membros que aumentam ao longo do tempo como resultado dos esforços da comunidade.

## Leitura adicional {#further-reading}

- [EIP-721: Padrão de token não fungível ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - Documentação do ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - Implementação do ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API de NFT da Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## Tutoriais: Construa com tokens não fungíveis (ERC-721) no Ethereum {#tutorials}

- [Passo a passo do contrato ERC-721 em Vyper](/developers/tutorials/erc-721-vyper-annotated-code/) _– Um passo a passo anotado de um contrato de NFT ERC-721 completo escrito em Vyper._
- [Como escrever e implantar um NFT (Parte 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– Guia passo a passo para escrever e implantar seu primeiro contrato inteligente ERC-721._
- [Como cunhar um NFT (Parte 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– Como cunhar um NFT ERC-721 usando seu contrato inteligente implantado e a Web3._
- [Como visualizar seu NFT em sua carteira (Parte 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– Como exibir seu NFT cunhado na MetaMask após a implantação._
- [Tutorial de cunhador de NFT](/developers/tutorials/nft-minter/) _– Construa um dapp de cunhagem de NFT full-stack com um frontend em React, MetaMask e Alchemy._