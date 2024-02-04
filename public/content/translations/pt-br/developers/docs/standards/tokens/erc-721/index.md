---
title: ERC-721 Padrão de token não-fungível
description: Token
lang: pt-br
---

## Introdução {#introduction}

**O que é um token não fungível (NFT)?**

Um token não fungível (NFT) é utilizado para identificar algo ou alguém de uma forma única. Este tipo de token é perfeito para ser usado em plataformas que oferecem itens colecionáveis, acessar chaves, bilhetes de loteria, assentos numerados para concertos, jogos esportivos etc. Este tipo especial de token tem possibilidades incríveis, então merece um padrão adequado, o ERC-721!

**O que é ERC-721?**

O ERC-721 apresenta um padrão para NFT. Em outras palavras, este tipo de token é único e pode ter um valor diferente do que outro token do mesmo contrato inteligente, talvez devido a sua validade, raridade ou mesmo sua aparência. Um momento, aparência?

Sim! Todos os NFTs têm uma variável `uint256` chamada `tokenId`, então para qualquer contrato ERC-721, o par `contract address, uint256 tokenId` deve ser globalmente único. Dito isso, um dApp pode ter um "conversor" que usa o `tokenId` como entrada e retorna uma imagem de algo legal, como zumbis, armas, habilidades ou gatinhos incríveis!

## Pré-requisitos {#prerequisites}

- [Contas](/developers/docs/accounts/)
- [Contratos Inteligentes](/developers/docs/smart-contracts/)
- [Padrões de token](/developers/docs/standards/tokens/)

## Apresentação {#body}

O ERC-721(Ethereum Request for Comments 721), proposto por William Entriken, Dieter Shirley, Jacob Evans e Nastassia Sachs em janeiro de 2018, é um padrão de token não-fungível que implementa uma API para tokens em contratos inteligentes.

Oferece funcionalidades, como transferir tokens de uma conta para outra, para obter o saldo atual do token de uma conta e também a oferta total do token disponível na rede. Além disso, ele também tem algumas outras funcionalidades como aprovar que uma quantidade de token de uma conta pode ser gasta por uma conta de terceiros.

Se um contrato inteligente implementa os métodos e eventos a seguir, ele pode ser chamado de Contrato de token ERC-721 e, uma vez implantado, é responsável por fazer um acompanhamento dos tokens criados no Ethereum.

De [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

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

Vejamos por que um padrão é importante e como ele simplifica o controle de qualquer contrato de token ERC-721 no Ethereum. Só precisamos da Interface Binária de Aplicativos (ABI, pela sigla em inglês) do contrato para criar uma interface com qualquer token ERC-721. Como você pode ver abaixo, usaremos uma ABI simplificada, para torná-la um exemplo de fácil compreensão.

#### Exemplo Web3.py {#web3py-example}

Primeiro, certifique-se de que você instalou a [biblioteca Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) do Python:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# Serão expostos apenas os métodos: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

ck_contract = w3.eth.contract(address=w3.toChecksumAddress(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Usando o Evento de Transferência ABI para obter informações sobre os Kitties transferidos.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.sha3(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - 120 blocks is the max range for CloudFlare Provider
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument

recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

Contrato de CriptoKitties tem alguns eventos interessantes além dos padrões.

Vamos ver dois deles, `Pregnant` e `Birth`.

```python
# Usando o Evento ABI "Gravidez e Nascimento" para obter informações sobre os novos Kitties.
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

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.sha3(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.sha3(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.getLogs({
    "fromBlock": w3.eth.blockNumber - 120,
    "address": w3.toChecksumAddress(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFTs populares {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) lista o maior NFT no Ethereum por volume de transferências.
- [CryptoKitties](https://www.cryptokitties.co/) é um jogo centrado em criaturas de coleção adoráveis que chamamos de CryptoKitties.
- [Sorare](https://sorare.com/) é um jogo global de fantasia em que você pode coletar edições limitadas, gerenciar suas equipes e concorrer para ganhar prêmios.
- [Ethereum Name Service (ENS)](https://ens.domains/) oferece uma forma segura e descentralizada de endereçar os recursos dentro e fora da blockchain usando nomes legíveis simples.
- [POAP](https://poap.xyz) oferece NFTs grátis para pessoas que participam de eventos ou realizam ações específicas. Os POAPs são livres para criar e distribuir.
- [Unstoppable Domains](https://unstoppabledomains.com/) é uma empresa com sede em São Francisco que cria domínios em blockchains. Os domínios de blockchain substituem endereços de criptomoeda por nomes legíveis e podem ser usados para habilitar sites resistentes à censura.
- [Gods Unchained Cards](https://godsunchained.com/) é uma TCG na blockchain Ethereum que usa NFT para representar a propriedade real nos ativos do jogo.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) é uma coleção de 10.000 NFT exclusivos que, além de ser uma peça de arte comprovadamente eclética, atua como um token de adesão ao clube, oferecendo vantagens e benefícios aos membros, que aumentam ao longo do tempo como resultado dos esforços da comunidade.

## Leia mais {#further-reading}

- [EIP-721: ERC-721 Padrão de token não-fungível](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin: Documentação ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin: Implementação ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [API do NFT da Alchemy](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
