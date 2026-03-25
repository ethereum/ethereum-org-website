---
title: "ERC-20 Token Standardı"
description: "Birlikte çalışabilir jeton uygulamalarını mümkün kılan, Ethereum'daki takas edilebilir jetonlar için standart olan ERC-20 hakkında bilgi edinin."
lang: tr
---

## Giriş {#introduction}

**Token nedir?**

Token'lar Ethereum'daki hemen hemen her şeyi temsil edebilir:

- çevrimiçi bir platformdaki itibar puanları
- bir oyundaki karakterin becerileri
- şirket hissesi gibi finansal varlıklar
- ABD Doları gibi itibari para birimi
- ons altın
- ve dahası...

Ethereum'un bu kadar güçlü bir özelliği güçlü bir standart tarafından idare edilmeli, değil mi? ERC-20 tam da bu noktada devreye giriyor! Bu standart, geliştiricilerin diğer ürün ve servislerle uyumlu token uygulamaları inşa etmesini sağlar. ERC-20 standardı, [ether](/glossary/#ether)'a ek işlevsellik kazandırmak için de kullanılır.

**ERC-20 nedir?**

ERC-20, Değiştirilebilir Jetonlar için bir standart getirmiştir: Başka bir deyişle bunlar, her bir Jetonun (tür ve değer olarak) başka bir Jeton ile tamamen aynı olmasını sağlayan bir özelliğe sahiptir. Örnek olarak, bir ERC-20 Token'ı tıpkı ETH gibi davranır, yani 1 Token her zaman tüm diğer Token'lara eşit olur.

## Ön Koşullar {#prerequisites}

- [Hesaplar](/developers/docs/accounts)
- [Akıllı Sözleşmeler](/developers/docs/smart-contracts/)
- [Jeton standartları](/developers/docs/standards/tokens/)

## Gövde {#body}

Fabian Vogelsteller tarafından Kasım 2015'te önerilen ERC-20 (Ethereum Yorum Talebi 20), Akıllı Sözleşmeler içindeki token'lar için bir API sağlayan bir Token Standardıdır.

ERC-20'nin sağladığı örnek işlevler:

- token'ları bir hesaptan diğerine aktarma
- bir hesabın mevcut token bakiyesini alma
- ağda mevcut olan token'ların toplam arzını alma
- bir hesaptaki token miktarının bir üçüncü taraf hesabı tarafından harcanıp harcanamayacağını onaylama

Eğer bir Akıllı Sözleşme aşağıdaki metodları ve olayları uygularsa bir ERC-20 Token Sözleşmesi olarak çağrılabilir ve dağıtıldığı andan itibaren Ethereum'da oluşturulan token'ları takip etmekten sorumludur.

[EIP-20'den](https://eips.ethereum.org/EIPS/eip-20):

### Yöntemler {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### Olaylar {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### Örnekler {#web3py-example}

Ethereum'daki herhangi bir ERC-20 Token Sözleşmesini incelememizi basitleştirmek için bir Standart'ın ne kadar önemli olduğunu görelim.
Herhangi bir ERC-20 token'a arayüz oluşturmak için sadece Sözleşme Uygulama İkili Arayüzü'ne (ABI) ihtiyacımız var. Aşağıda görebileceğiniz gibi az sürtünmeli bir örnek olması için basitleştirilmiş bir ABI kullanacağız.

#### Web3.py Örneği {#web3py-example}

Öncelikle, [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python kütüphanesini yüklediğinizden emin olun:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Sarılmış ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Bu, bir ERC-20 Jeton Sözleşmesinin basitleştirilmiş bir Sözleşme Uygulama İkili Arayüzüdür (ABI).
# Sadece şu metotları kullanıma sunacaktır: balanceOf(address), decimals(), symbol() ve totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
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
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Toplam Arz:", totalSupply)
print("Adres Bakiyesi:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Toplam Arz:", totalSupply)
print("Adres Bakiyesi:", addr_balance)
```

## Bilinen sorunlar {#erc20-issues}

### ERC-20 jeton alma sorunu {#reception-issue}

**20.06.2024 itibarıyla en az 83.656.418$ değerinde ERC-20 jetonu bu sorun nedeniyle kaybedildi. Saf bir ERC-20 uygulamasının, aşağıda listelendiği gibi standardın üzerine bir dizi ek kısıtlama uygulamadığınız sürece bu soruna yatkın olduğunu unutmayın.**

ERC-20 jetonları, ERC-20 jetonlarını işlemek üzere tasarlanmamış bir akıllı sözleşmeye gönderildiğinde kalıcı olarak kaybolabilir. Bunun nedeni, alıcı sözleşmesinin gelen jetonları tanıma veya yanıtlama işlevine sahip olmaması ve ERC-20 standardında alıcı sözleşmesini gelen jetonlar hakkında bilgilendirmek için bir mekanizmanın bulunmamasıdır. Bu sorunun başlıca ortaya çıkma şekilleri şunlardır:

1. Jeton transfer mekanizması

- ERC-20 jetonları, transfer veya transferFrom fonksiyonları kullanılarak transfer edilir
  - Bir kullanıcı bu fonksiyonları kullanarak bir sözleşme adresine jeton gönderdiğinde, alıcı sözleşmesinin bunları işlemek üzere tasarlanmış olup olmadığına bakılmaksızın jetonlar aktarılır

2. Bildirim eksikliği
   - Alıcı sözleşmesi, kendisine jeton gönderildiğine dair bir bildirim veya geri arama almaz
   - Alıcı sözleşmesinde jetonları işlemek için bir mekanizma yoksa (örneğin, bir yedek fonksiyon veya jeton alımını yönetmek için özel bir fonksiyon), jetonlar sözleşme adresinde takılı kalır
3. Yerleşik işlemenin olmaması
   - ERC-20 standardının sözleşmelerin uygulanması için zorunlu bir fonksiyon barındırmaması, birçok sözleşmenin gelen jetonları düzgün bir şekilde yönetememesine yol açar

**Olası Çözümler**

ERC-20 ile bu sorunu tamamen önlemek mümkün olmasa da son kullanıcı için jeton kaybı olasılığını önemli ölçüde azaltacak yöntemler vardır:

- En yaygın sorun, bir kullanıcının jetonları jeton sözleşme adresinin kendisine göndermesidir (ör. USDT jeton sözleşmesinin adresine yatırılan USDT). Bu tür transfer girişimlerini geri döndürmek için `transfer(..)` işlevinin kısıtlanması tavsiye edilir. `transfer(..)` işlevinin uygulaması içinde `require(_to != address(this));` kontrolünü eklemeyi düşünün.
- Genel olarak `transfer(..)` işlevi, sözleşmelere jeton yatırmak için tasarlanmamıştır. `approve(..) `& transferFrom(..)`modeli, bunun yerine sözleşmelere ERC-20 jetonları yatırmak için kullanılır. Transfer işlevini, onunla herhangi bir sözleşmeye jeton yatırılmasına izin vermeyecek şekilde kısıtlamak mümkündür, ancak bu, jetonların`trasnfer(..)` işleviyle sözleşmelere yatırılabileceğini varsayan sözleşmelerle (ör. Uniswap likidite havuzları) uyumluluğu bozabilir.
- Sözleşmenizin hiçbir zaman jeton alması gerekmese bile, sözleşmenize ERC-20 jetonlarının gelebileceğini her zaman varsayın. Alıcı tarafında, yanlışlıkla yapılan yatırmaları önlemenin veya reddetmenin bir yolu yoktur. Yanlışlıkla yatırılan ERC-20 jetonlarını çıkarmanıza olanak tanıyacak bir işlev uygulamanız tavsiye edilir.
- Alternatif jeton standartlarını kullanmayı düşünün.

[ERC-223](/developers/docs/standards/tokens/erc-223) veya [ERC-1363](/developers/docs/standards/tokens/erc-1363) gibi bazı alternatif standartlar bu sorundan ortaya çıkmıştır.

## Daha fazla kaynak {#further-reading}

- [EIP-20: ERC-20 Jeton Standardı](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Jetonlar](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 Uygulaması](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 Jetonları Rehberi](https://www.alchemy.com/overviews/erc20-solidity)

## Diğer takas edilebilir jeton standartları {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Jetonlaştırılmış kasalar](/developers/docs/standards/tokens/erc-4626)
