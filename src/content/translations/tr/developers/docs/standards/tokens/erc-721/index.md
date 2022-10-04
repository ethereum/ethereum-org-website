---
title: ERC-721 Değiştirilemeyen Token Standardı
description:
lang: tr
---

## Giriş {#introduction}

**Değiştirilemeyen Token nedir?**

Bir Değiştirilemez Token (NFT), bir şeyi veya bir kimseyi eşsiz bir yolla tanımlamak için kullanılır. Bu Token türü; koleksiyon öğeleri, erişim anahtarları, çekiliş biletleri, konserler ve spor maçları için numaralı koltuklar vb. sunan platformlarda kullanılmak için mükemmeldir. Bu özel Token türü, inanılmaz olanaklara sahip olduğu için uygun bir Standardı hak ediyor: ERC-721 bunu çözmek için geldi!

**ERC-721 nedir?**

ERC-721, NFT için bir standart getirir, başka bir deyişle, bu Token türü benzersizdir ve örneğin yaşı, nadirliği ve hatta görseli gibi başka bir şey nedeniyle aynı Akıllı Sözleşmedeki başka bir Token'dan farklı değere sahip olabilir. Görsel mi?

Evet! Tüm NFT'ler `tokenId` denilen bir `uint256` değişkenine sahiptir, yani herhangi bir ERC-721 sözleşmesi için, `sözleşme adresi, uint256 tokenId` çifti küresel olarak eşsiz olmalıdır. Bununla birlikte bir dApp, girdi olarak `tokenId` kullanan ve zombiler, silahlar, yetenekler veya müthiş kedicikler gibi havalı bir şeyin resmini veren bir "dönüştürücüye" sahip olabilir!

## Ön Koşullar {#prerequisites}

- [Hesaplar](/developers/docs/accounts/)
- [Akıllı Sözleşmeler](/developers/docs/smart-contracts/)
- [Token standartları](/developers/docs/standards/tokens/)

## Şablon {#body}

William Entriken, Dieter Shirley, Jacob Evans ve Nastassia Sachs tarafından Ocak 2018'de önerilen ERC-721 (Ethereum Yorum Talebi 721), Akıllı Sözleşmeler içindeki token'lar için bir API uygulayan bir Değiştirilebilir Token Standardıdır.

Token'ları bir hesaptan diğerine aktarmak, bir hesabın mevcut token bakiyesini almak, belirli bir token'ın sahibini almak ve ayrıca ağda mevcut olan token'ın toplam arzını almak gibi işlevler sağlar. Bunların yanı sıra, bir hesaptan bir miktar token'ın üçüncü taraf bir hesap tarafından taşınabileceğini onaylamak gibi başka işlevleri de vardır.

Bir Akıllı Sözleşme aşağıdaki yöntemleri ve olayları uygularsa, ERC-721 Değiştirilemez Token Sözleşmesi olarak adlandırılabilir ve dağıtıldıktan sonra, Ethereum üzerinde oluşturulan token'ları takip etmekten sorumlu olur.

[EIP-721](https://eips.ethereum.org/EIPS/eip-721)'den:

#### Yöntemler {#methods}

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

#### Olaylar {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Örnekler {#web3py-example}

Ethereum'daki herhangi bir ERC-721 Token Sözleşmesini incelememizi basitleştirmek için bir Standart'ın ne kadar önemli olduğunu görelim. Herhangi bir ERC-721 token'a arayüz oluşturmak için sadece sözleşmenin Uygulama İkili Arayüzü'ne (ABI) ihtiyacımız var. Aşağıda görebileceğiniz gibi az sürtünmeli bir örnek olması için basitleştirilmiş bir ABI kullanacağız.

#### Web3.py örneği {#web3py-example}

İlk olarak, [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python kütüphanesini kurduğunuzdan emin olun:

```
$ pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Using the Transfer Event ABI to get info about transferred Kitties.
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

CryptoKitties Sözleşmesi, Standart olanlar dışında bazı ilginç Olaylara sahiptir.

Hadi ikisine bakalım, `Pregnant` ve `Birth`.

```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties.
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

## Popüler NFT'ler {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft), aktarım hacmine göre Ethereum üzerindeki en yüksek NFT'leri sıralar.
- [CryptoKitties](https://www.cryptokitties.co/) yetiştirilebilen, toplanabilen ve aşırı şirin olan CryptoKitties dediğimiz yaratıklar çevresinde gelişen bir oyundur.
- [Sorare](https://sorare.com/), sınırlı sayılı koleksiyon parçaları toplayabileceğiniz, takımlarınızı yönetebileceğiniz ve ödüller kazanmak için rekabet edebileceğiniz küresel bir fantezi futbol oyunudur.
- [Ethereum İsim Hizmeti (ENS)](https://ens.domains/); basit, insanlar tarafından okunabilir isimler kullanarak hem blok zinciri üstünde hem de dışında kaynakları yönetmenin güvenli ve merkeziyetsiz bir yolunu sunar.
- [Unstoppable Domains](https://unstoppabledomains.com/), blok zincirleri üzerinde alan adları inşa eden San-Francisco merkezli bir şirkettir. Blok zinciri alan adları, kripto para adreslerini insanlar tarafından okunabilir adlarla değiştirir ve sansüre dayanıklı web sitelerini etkinleştirmek için kullanılabilir.
- [Gods Unchained Cards](https://godsunchained.com/), oyun içi varlıklara gerçek sahiplik getirmek için NFT'leri kullanan Ethereum blok zinciri üzerindeki bir Kart Ticareti Oyunudur.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com), kanıtlanabilir derecede ender bir sanat eseri olmasının yanı sıra, kulübe üyelik simgesi olarak hareket eden ve topluluk çabalarının sonucu olarak zamanla artan üye avantajları ve faydaları sağlayan 10.000 benzersiz NFT'den oluşan bir koleksiyondur.

## Daha fazla bilgi {#further-reading}

- [EIP-721: ERC-721 Değiştirilemez Token Standardı](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Belgeleri](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Uygulaması](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
