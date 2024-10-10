---
title: ERC-20 Token Standardı
description:
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
- ve daha fazlası...

Ethereum'un bu kadar güçlü bir özelliği güçlü bir standart tarafından idare edilmeli, değil mi? ERC-20 tam da bu noktada devreye giriyor! Bu standart, geliştiricilerin diğer ürün ve servislerle uyumlu token uygulamaları inşa etmesini sağlar. ERC-20 standardı, [ether](/glossary/#ether)'e ek işlevsellik kazandırmak için de kullanılır.

**ERC-20 nedir?**

ERC-20, Değiştirilebilir Jetonlar için bir standart getirmiştir: Başka bir deyişle bunlar, her bir Jetonun (tür ve değer olarak) başka bir Jeton ile tamamen aynı olmasını sağlayan bir özelliğe sahiptir. Örnek olarak, bir ERC-20 Token'ı tıpkı ETH gibi davranır, yani 1 Token her zaman tüm diğer Token'lara eşit olur.

## Ön Koşullar {#prerequisites}

- [Hesaplar](/developers/docs/accounts)
- [Akıllı Sözleşmeler](/developers/docs/smart-contracts/)
- [Token standartları](/developers/docs/standards/tokens/)

## Şablon {#body}

Fabian Vogelsteller tarafından Kasım 2015'te önerilen ERC-20 (Ethereum Yorum Talebi 20), Akıllı Sözleşmeler içindeki token'lar için bir API sağlayan bir Token Standardıdır.

ERC-20'nin sağladığı örnek işlevler:

- token'ları bir hesaptan diğerine aktarma
- bir hesabın mevcut token bakiyesini alma
- ağda mevcut olan token'ların toplam arzını alma
- bir hesaptaki token miktarının bir üçüncü taraf hesabı tarafından harcanıp harcanamayacağını onaylama

Eğer bir Akıllı Sözleşme aşağıdaki metodları ve olayları uygularsa bir ERC-20 Token Sözleşmesi olarak çağrılabilir ve dağıtıldığı andan itibaren Ethereum'da oluşturulan token'ları takip etmekten sorumludur.

[EIP-20](https://eips.ethereum.org/EIPS/eip-20)'den:

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

Ethereum'daki herhangi bir ERC-20 Token Sözleşmesini incelememizi basitleştirmek için bir Standart'ın ne kadar önemli olduğunu görelim. Herhangi bir ERC-20 token'a arayüz oluşturmak için sadece Sözleşme Uygulama İkili Arayüzü'ne (ABI) ihtiyacımız var. Aşağıda görebileceğiniz gibi az sürtünmeli bir örnek olması için basitleştirilmiş bir ABI kullanacağız.

#### Web3.py Örneği {#web3py-example}

İlk olarak, [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python kütüphanesini kurduğunuzdan emin olun:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
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
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## Bilinen sorunlar {#erc20-issues}

### ERC-20 jeton alma sorunu {#reception-issue}

ERC-20 jetonları, ERC-20 jetonlarını işlemek üzere tasarlanmamış bir akıllı sözleşmeye gönderildiğinde kalıcı olarak kaybolabilir. Bunun nedeni, alıcı sözleşmesinin gelen jetonları tanıma veya yanıtlama işlevine sahip olmaması ve ERC-20 standardında alıcı sözleşmesini gelen jetonlar hakkında bilgilendirmek için bir mekanizmanın bulunmamasıdır. Bu sorunun başlıca ortaya çıkma şekilleri şunlardır:

1.  Jeton transfer mekanizması
  - ERC-20 jetonları, transfer veya transferFrom fonksiyonları kullanılarak transfer edilir
    -   Bir kullanıcı bu fonksiyonları kullanarak bir sözleşme adresine jeton gönderdiğinde, alıcı sözleşmesinin bunları işlemek üzere tasarlanmış olup olmadığına bakılmaksızın jetonlar aktarılır
2.  Bildirim eksikliği
    -   Alıcı sözleşmesi, kendisine jeton gönderildiğine dair bir bildirim veya geri arama almaz
    -   Alıcı sözleşmesinde jetonları işlemek için bir mekanizma yoksa (örneğin, bir yedek fonksiyon veya jeton alımını yönetmek için özel bir fonksiyon), jetonlar sözleşme adresinde takılı kalır
3.  Yerleşik işlemenin olmaması
    -   ERC-20 standardının sözleşmelerin uygulanması için zorunlu bir fonksiyon barındırmaması, birçok sözleşmenin gelen jetonları düzgün bir şekilde yönetememesine yol açar

Bu sorundan dolayı [ERC-223](/developers/docs/standards/tokens/erc-223) gibi bazı alternatif standartlar ortaya çıktı

## daha fazla okuma {#further-reading}

- [EIP-20: ERC-20 Token Standardı](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token'lar](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 Uygulaması](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 Jetonları için bir Rehber](https://www.alchemy.com/overviews/erc20-solidity)


## Diğer değiştirilebilir jeton standartları {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Jetonlaştırılmış kasalar](/developers/docs/standards/tokens/erc-4626)