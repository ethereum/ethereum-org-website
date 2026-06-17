---
title: ERC-20 Token Standardı
description: Ethereum üzerinde birlikte çalışabilir Token uygulamalarına olanak tanıyan misli token standardı ERC-20 hakkında bilgi edinin.
lang: tr
---

## Giriş {#introduction}

**Token Nedir?**

Token'lar [Ethereum](/)'da neredeyse her şeyi temsil edebilir:

- çevrimiçi bir platformdaki itibar puanlarını
- bir oyundaki karakterin yeteneklerini
- bir şirketteki hisse gibi finansal varlıkları
- USD gibi bir itibari para birimini
- bir ons altını
- ve daha fazlasını...

Ethereum'un böylesine güçlü bir özelliği sağlam bir standart tarafından ele alınmalıdır, değil mi? İşte tam bu noktada ERC-20 devreye giriyor! Bu standart, geliştiricilerin diğer ürün ve hizmetlerle birlikte çalışabilir Token uygulamaları oluşturmasına olanak tanır. ERC-20 standardı ayrıca [Ether](/glossary/#ether)'e ek işlevsellik sağlamak için de kullanılır.

**ERC-20 Nedir?**

ERC-20, Misli Token'lar (Fungible Tokens) için bir standart sunar; başka bir deyişle, her bir Token'ın (tür ve değer olarak) diğer bir Token ile tamamen aynı olmasını sağlayan bir özelliğe sahiptirler. Örneğin, bir ERC-20 Token'ı tıpkı ETH gibi davranır, yani 1 Token her zaman diğer tüm Token'lara eşit olur ve öyle kalacaktır.

## Ön Koşullar {#prerequisites}

- [Hesaplar](/developers/docs/accounts)
- [Akıllı Sözleşmeler](/developers/docs/smart-contracts/)
- [Token standartları](/developers/docs/standards/tokens/)

## Gövde {#body}

Kasım 2015'te Fabian Vogelsteller tarafından önerilen ERC-20 (Ethereum Request for Comments 20), Akıllı Sözleşmeler içindeki Token'lar için bir API uygulayan bir Token Standardıdır.

ERC-20'nin sağladığı örnek işlevler:

- bir hesaptan diğerine Token transfer etmek
- bir hesabın mevcut Token bakiyesini almak
- ağ üzerinde mevcut olan Token'ın toplam arzını almak
- bir hesaptaki belirli bir miktar Token'ın üçüncü taraf bir hesap tarafından harcanıp harcanamayacağını onaylamak

Bir Akıllı Sözleşme aşağıdaki yöntemleri ve olayları uygularsa, bir ERC-20 Token Sözleşmesi olarak adlandırılabilir ve dağıtıldıktan sonra Ethereum üzerinde oluşturulan Token'ları takip etmekten sorumlu olacaktır.

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

Ethereum üzerindeki herhangi bir ERC-20 Token Sözleşmesini incelememizi kolaylaştırmak için bir Standardın ne kadar önemli olduğunu görelim. Herhangi bir ERC-20 Token'ına bir arayüz oluşturmak için sadece Sözleşme Uygulama İkili Arayüzüne (ABI) ihtiyacımız var. Aşağıda görebileceğiniz gibi, bunu düşük sürtünmeli (basit) bir örnek haline getirmek için basitleştirilmiş bir ABI kullanacağız.

#### Web3.py Örneği {#web3py-example-2}

İlk olarak, [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python Kütüphanesini yüklediğinizden emin olun:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Sarılmış Ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# Bu, bir ERC-20 Token Sözleşmesinin basitleştirilmiş bir Sözleşme Uygulama İkili Arayüzüdür (ABI).
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

### ERC-20 Token alım sorunu {#reception-issue}

**20.06.2024 itibarıyla bu sorun nedeniyle en az 83.656.418 $ değerinde ERC-20 Token'ı kaybedilmiştir. Aşağıda listelendiği gibi standardın üzerine bir dizi ek kısıtlama uygulamadığınız sürece saf bir ERC-20 uygulamasının bu soruna eğilimli olduğunu unutmayın.**

ERC-20 Token'ları, ERC-20 Token'larını işlemek üzere tasarlanmamış bir akıllı sözleşmeye gönderildiğinde, bu Token'lar kalıcı olarak kaybolabilir. Bu durum, alıcı sözleşmenin gelen Token'ları tanıma veya bunlara yanıt verme işlevine sahip olmaması ve ERC-20 standardında alıcı sözleşmeyi gelen Token'lar hakkında bilgilendirecek bir mekanizma bulunmaması nedeniyle gerçekleşir. Bu sorunun ortaya çıkmasının ana yolları şunlardır:

1.	Token transfer mekanizması
  - ERC-20 Token'ları transfer veya transferFrom fonksiyonları kullanılarak transfer edilir
	-	Bir kullanıcı bu fonksiyonları kullanarak bir sözleşme adresine Token gönderdiğinde, alıcı sözleşmenin bunları işlemek üzere tasarlanıp tasarlanmadığına bakılmaksızın Token'lar transfer edilir
2.	Bildirim eksikliği
	-	Alıcı sözleşme, kendisine Token gönderildiğine dair bir bildirim veya geri arama (callback) almaz
	-	Alıcı sözleşme Token'ları işleyecek bir mekanizmadan (örneğin, bir geri dönüş fonksiyonu veya Token alımını yönetecek özel bir fonksiyon) yoksunsa, Token'lar fiilen sözleşmenin adresinde sıkışıp kalır
3.	Yerleşik işleme olmaması
	-	ERC-20 standardı, alıcı sözleşmelerin uygulaması gereken zorunlu bir fonksiyon içermez; bu da birçok sözleşmenin gelen Token'ları düzgün bir şekilde yönetememesine yol açar

**Olası Çözümler**

Bu sorunu ERC-20 ile tamamen önlemek mümkün olmasa da, son kullanıcı için Token kaybı olasılığını önemli ölçüde azaltmaya olanak tanıyan yöntemler vardır:

- En yaygın sorun, bir kullanıcının Token'ları doğrudan Token sözleşmesi adresine göndermesidir (örneğin, USDT Token sözleşmesinin adresine yatırılan USDT). Bu tür transfer girişimlerini geri almak için `transfer(..)` fonksiyonunun kısıtlanması önerilir. `transfer(..)` fonksiyonunun uygulaması içine `require(_to != address(this));` kontrolü eklemeyi düşünün.
- `transfer(..)` fonksiyonu genel olarak sözleşmelere Token yatırmak için tasarlanmamıştır. Bunun yerine ERC-20 Token'larını sözleşmelere yatırmak için `approve(..) & transferFrom(..)` modeli kullanılır. Transfer fonksiyonunu, herhangi bir sözleşmeye Token yatırılmasına izin vermeyecek şekilde kısıtlamak mümkündür, ancak bu, Token'ların `transfer(..)` fonksiyonu ile sözleşmelere yatırılabileceğini varsayan sözleşmelerle (örneğin, Uniswap Likidite havuzları) uyumluluğu bozabilir.
- Sözleşmenizin hiçbir zaman Token almaması gerekse bile, ERC-20 Token'larının sözleşmenize gelebileceğini her zaman varsayın. Alıcı tarafında yanlışlıkla yapılan yatırmaları önlemenin veya reddetmenin bir yolu yoktur. Yanlışlıkla yatırılan ERC-20 Token'larının çıkarılmasına olanak tanıyan bir fonksiyon uygulanması önerilir.
- Alternatif Token standartlarını kullanmayı düşünün.

Bu sorundan dolayı [ERC-223](/developers/docs/standards/tokens/erc-223) veya [ERC-1363](/developers/docs/standards/tokens/erc-1363) gibi bazı alternatif standartlar ortaya çıkmıştır.

## Daha fazla bilgi {#further-reading}

- [EIP-20: ERC-20 Token Standardı](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - Token'lar](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 Uygulaması](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 Token'ları Rehberi](https://www.alchemy.com/overviews/erc20-solidity)

## Diğer misli token standartları {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - Tokenlaştırılmış kasalar](/developers/docs/standards/tokens/erc-4626)

## Eğitimler: Ethereum üzerinde ERC-20 ile Geliştirme {#tutorials}

- [ERC-20 Sözleşmesi İncelemesi](/developers/tutorials/erc20-annotated-code/) _– OpenZeppelin ERC-20 sözleşme uygulamasının satır satır açıklamalı bir incelemesi._
- [Güvenlik Korkulukları ile ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– Kullanıcıların yaygın hatalardan kaçınmasına yardımcı olmak için ERC-20 Token'larına nasıl korumalar ekleneceği._
- [Ethers.js Kullanarak Token Gönderme](/developers/tutorials/send-token-ethersjs/) _– Ethers.js kullanarak ERC-20 Token'larını transfer etmeye yönelik başlangıç dostu bir rehber._
- [Dolandırıcı Token'lar tarafından kullanılan bazı hileler ve bunların nasıl tespit edileceği](/developers/tutorials/scam-token-tricks/) _– Dolandırıcı ERC-20 Token modellerine ve bunların nasıl belirleneceğine dair detaylı bir inceleme._