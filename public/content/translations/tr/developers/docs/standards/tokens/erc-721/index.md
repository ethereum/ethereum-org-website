---
title: ERC-721 Değiştirilemeyen Token Standardı
description: Ethereum'daki benzersiz dijital varlıkları temsil eden, eşsiz jetonlar (NFT'ler) için standart olan ERC-721 hakkında bilgi edinin.
lang: tr
---

## Giriş {#introduction}

**Değiştirilemeyen Token nedir?**

Bir Değiştirilemez Token (NFT), bir şeyi veya bir kimseyi eşsiz bir yolla tanımlamak için kullanılır. Bu Token türü; koleksiyon öğeleri, erişim anahtarları, çekiliş biletleri, konserler ve spor maçları için numaralı koltuklar vb. sunan platformlarda kullanılmak için mükemmeldir. Bu özel Token türü, inanılmaz olanaklara sahip olduğu için uygun bir Standardı hak ediyor: ERC-721 bunu çözmek için geldi!

**ERC-721 nedir?**

ERC-721, NFT için bir standart getirir, başka bir deyişle, bu Token türü benzersizdir ve örneğin yaşı, nadirliği ve hatta görseli gibi başka bir şey nedeniyle aynı Akıllı Sözleşmedeki başka bir Token'dan farklı değere sahip olabilir.
Görsel mi?

Evet! Tüm NFT'ler `tokenId` adlı bir `uint256` değişkenine sahiptir, bu nedenle herhangi bir ERC-721 Sözleşmesi için,
`sözleşme adresi, uint256 tokenId` çifti küresel olarak eşsiz olmalıdır. Bununla birlikte, bir dapp girdi olarak `tokenId` kullanan ve çıktı olarak da zombiler, silahlar, yetenekler ya da muhteşem kedicikler gibi havalı bir şeyin görüntüsünü veren bir
"dönüştürücüye" sahip olabilir!

## Ön Koşullar {#prerequisites}

- [Hesaplar](/developers/docs/accounts/)
- [Akıllı Sözleşmeler](/developers/docs/smart-contracts/)
- [Jeton standartları](/developers/docs/standards/tokens/)

## Gövde {#body}

William Entriken, Dieter Shirley, Jacob Evans ve Nastassia Sachs tarafından Ocak 2018'de önerilen ERC-721 (Ethereum Yorum Talebi 721), Akıllı Sözleşmeler içindeki token'lar için bir API uygulayan bir Değiştirilebilir Token Standardıdır.

Token'ları bir hesaptan diğerine aktarmak, bir hesabın mevcut token bakiyesini almak, belirli bir token'ın sahibini almak ve ayrıca ağda mevcut olan token'ın toplam arzını almak gibi işlevler sağlar.
Bunların yanı sıra, bir hesaptan bir miktar token'ın üçüncü taraf bir hesap tarafından taşınabileceğini onaylamak gibi başka işlevleri de vardır.

Bir Akıllı Sözleşme aşağıdaki yöntemleri ve olayları uygularsa, ERC-721 Değiştirilemez Token Sözleşmesi olarak adlandırılabilir ve dağıtıldıktan sonra, Ethereum üzerinde oluşturulan token'ları takip etmekten sorumlu olur.

[EIP-721'den](https://eips.ethereum.org/EIPS/eip-721):

### Yöntemler {#methods}

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

### Olaylar {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### Örnekler {#web3py-example}

Ethereum'daki herhangi bir ERC-721 Token Sözleşmesini incelememizi basitleştirmek için bir Standart'ın ne kadar önemli olduğunu görelim.
Herhangi bir ERC-721 token'a arayüz oluşturmak için sadece sözleşmenin Uygulama İkili Arayüzü'ne (ABI) ihtiyacımız var. Aşağıda görebileceğiniz gibi az sürtünmeli bir örnek olması için basitleştirilmiş bir ABI kullanacağız.

#### Web3.py Örneği {#web3py-example}

Öncelikle, [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python kütüphanesini yüklediğinizden emin olun:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Sözleşmesi

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Satış Müzayedesi

# Bu, bir ERC-721 NFT Sözleşmesinin basitleştirilmiş bir Sözleşme Uygulama İkili Arayüzüdür (ABI).
# Yalnızca şu yöntemleri kullanıma sunacaktır: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# Aktarılan Kedicikler hakkında bilgi almak için Transfer Olayı ABI'sini kullanma.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# Günlükleri filtrelemek için olayın imzasına ihtiyacımız var
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notlar:
#   - Herhangi bir Transfer olayı döndürülmezse blok sayısını 120'den yukarı artırın.
#   - Herhangi bir Transfer olayı bulamadıysanız, şuradan bir tokenId almayı da deneyebilirsiniz:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Etkinliğin günlüklerini genişletmek için tıklayın ve "tokenId" bağımsız değişkenini kopyalayın
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Yukarıdaki bağlantıdan "tokenId"yi buraya yapıştırın
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKitties Sözleşmesi, Standart olanlar dışında bazı ilginç Olaylara sahiptir.

İkisini kontrol edelim, `Pregnant` ve `Birth`.

```python
# Yeni Kedicikler hakkında bilgi almak için Pregnant ve Birth Olayları ABI'sini kullanma.
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

# Günlükleri filtrelemek için olayın imzasına ihtiyacımız var
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# İşte bir Pregnant Olayı:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# İşte bir Birth Olayı:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## Popüler NFT'ler {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) Ethereum'daki en iyi NFT'leri transfer hacmine göre listeler.
- [CryptoKitties](https://www.cryptokitties.co/), CryptoKitties adını verdiğimiz, yetiştirilebilir, koleksiyonluk ve çok sevimli
  yaratıklar etrafında şekillenen bir oyundur.
- [Sorare](https://sorare.com/), sınırlı sayıda üretilmiş koleksiyon ürünleri toplayabildiğiniz, takımlarınızı yönetebildiğiniz ve ödül kazanmak için rekabet edebildiğiniz
  küresel bir fantezi futbol oyunudur.
- [Ethereum İsim Servisi (ENS)](https://ens.domains/), basit ve insan tarafından okunabilir isimler kullanarak hem
  blokzincir üzerindeki hem de dışındaki kaynakları adreslemek için güvenli ve merkeziyetsiz bir yol sunar.
- [POAP](https://poap.xyz), etkinliklere katılan veya belirli eylemleri tamamlayan kişilere ücretsiz NFT'ler dağıtır. POAP'ler oluşturmak ve dağıtmak ücretsizdir.
- [Unstoppable Domains](https://unstoppabledomains.com/), San Francisco merkezli, blokzincirler üzerinde
  alan adları oluşturan bir şirkettir. Blokzincir alan adları, kripto para adreslerini insanlar tarafından okunabilir adlarla değiştirir ve sansüre dayanıklı web sitelerini etkinleştirmek
  için kullanılabilir.
- [Gods Unchained Cards](https://godsunchained.com/), oyun içi varlıklara gerçek mülkiyet kazandırmak için NFT'leri kullanan,
  Ethereum blokzinciri üzerindeki bir Takas Kartı Oyunu'dur (TCG).
- [Bored Ape Yacht Club](https://boredapeyachtclub.com), kanıtlanabilir derecede nadir bir sanat eseri olmasının yanı sıra kulüp için bir üyelik jetonu görevi gören ve topluluk çabaları sonucunda zamanla artan üye ayrıcalıkları ve avantajları sağlayan 10.000 benzersiz NFT'den oluşan bir koleksiyondur.

## Daha fazla kaynak {#further-reading}

- [EIP-721: ERC-721 Eşsiz Jeton Standardı](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 Belgeleri](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 Uygulaması](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API'si](https://www.alchemy.com/docs/reference/nft-api-quickstart)
