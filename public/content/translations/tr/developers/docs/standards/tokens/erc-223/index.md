---
title: ERC-223 Jeton Standardı
description: ERC-223 değiştirilebilir jeton standardına genel bir bakış, çalışma şekli ve ERC-20 ile karşılaştırılması.
lang: tr
---

## Giriş {#introduction}

### ERC-223 nedir? {#what-is-erc223}

ERC-223, ERC-20 standardına benzer şekilde, değiştirilebilir jetonlara yönelik bir standarttır. Temel fark, ERC-223'ün yalnızca jeton API'sini değil aynı zamanda jetonları göndericiden alıcıya transfer etme mantığını da tanımlamasıdır. Jeton transferlerinin alıcının tarafında işlenmesini sağlayan bir iletişim modeline sahiptir.

### ERC-20'den farkları {#erc20-differences}

ERC-223, ERC-20'nin bazı sınırlamalarını ele alır ve jeton sözleşmesi ile jetonları alabilecek sözleşme arasında yeni bir etkileşim yöntemi sunar. ERC-223 ile mümkün olup ERC-20 ile mümkün olmayan birkaç şey şunlardır:

- Alıcı tarafında jeton transferi işlemlerinin yönetimi: Alıcılar, ERC-223 jetonlarının yatırıldığını tespit edebilirler.
- Yanlış gönderilmiş jetonların reddedilmesi: Bir kullanıcının ERC-223 jetonlarını jeton alması beklenmeyen bir sözleşmeye göndermesi halinde sözleşme, işlemi reddedebilir ve bu da jeton kaybını önler.
- Transferlerde meta veri: ERC-223 jetonları, jeton işlemlerine rastgele bilgi eklenmesini sağlayan meta veriler içerebilir.

## Ön Koşullar {#prerequisites}

- [Hesaplar](/developers/docs/accounts)
- [Akıllı Sözleşmeler](/developers/docs/smart-contracts/)
- [Jeton standartları](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Gövde {#body}

ERC-223, akıllı sözleşmeler içindeki jetonlar için bir API uygulayan bir jeton standardıdır. Ayrıca, ERC-223 jetonlarını alması gereken sözleşmeler için bir API belirtir. ERC-223 Alıcı API'sini desteklemeyen sözleşmeler ERC-223 jetonlarlarını alamaz ve bu da kullanıcı hatalarını önler.

Aşağıdaki yöntem ve olayları uyguluyan bir akıllı sözleşme, ERC-223 uyumlu bir jeton sözleşmesi olarak adlandırılabilir. Dağıtıldıktan sonra, Ethereum üzerinde oluşturulan jetonları takip etmekten sorumlu olacaktır.

Sözleşmenin yalnızca bu işlevlere sahip olması gerekmez ve bir geliştirici, bu sözleşmeye farklı jeton standartlarına ait herhangi bir özelliği ekleyebilir. Örneğin, `approve` ve `transferFrom` fonksiyonları ERC-223 standardının bir parçası olmasa da, gerekli durumlarda bu fonksiyonlar uygulanabilir.

[EIP-223'den](https://eips.ethereum.org/EIPS/eip-223):

### Yöntemler {#methods}

ERC-223 jetonu şu yöntemleri uygulamalıdır:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 jetonlarını alması gereken bir sözleşme, şu yöntemi uygulamalıdır:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

ERC-223 jetonlarının `tokenReceived(..)` fonksiyonunu uygulamayan bir sözleşmeye gönderilmesi halinde transfer başarısız olmalı ve jetonlar gönderenin bakiyesinden çıkarılmamalıdır.

### Olaylar {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Örnekler {#examples}

ERC-223 jetonu API'si ERC-20'ye benzer olduğundan, kullanıcı arayüzü geliştirme açısından herhangi bir fark yoktur. Burada tek istisna, ERC-223 jetonlarının bu standart için opsiyonel olan `approve` + `transferFrom` fonksiyonlarına sahip olamamasıdır.

#### Solidity örnekleri {#solidity-example}

Aşağıdaki örnek, temel bir ERC-223 jeton sözleşmesinin nasıl çalıştığını gösterir:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Şimdi tokenA jetonunun bir ERC-223 jetonu olduğunu varsayarak `tokenA` depozitolarını kabul eden başka bir sözleşme istiyoruz. Sözleşme yalnızca tokenA'yı kabul etmeli ve diğer jetonları reddetmelidir. Sözleşme tokenA'yı aldığında, bir `Deposit()` olayı yaymalı ve dahili 'deposits' değişkeninin değerini artırmalıdır.

İşte kod:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send Ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Sıkça sorulan sorular {#faq}

### Eğer sözleşmeye bir miktar tokenB gönderirsek ne olur? {#sending-tokens}

İşlem başarısız olur ve ve jeton transferi gerçekleşmez. Jetonlar göndericinin adresine iade edilir.

### Bu sözleşmeye nasıl para yatırabiliriz? {#contract-deposits}

`RecipientContract` adresini belirterek ERC-223 jetonun `transfer(address,uint256)` veya `transfer(address,uint256,bytes)` fonksiyonunu çağırın.

### Bir ERC-20 jetonunu bu sözleşmeye transfer edersek ne olur? {#erc-20-transfers}

`RecipientContract` adresine bir ERC-20 jetonu gönderilirse, jetonlar transfer edilir ancak transfer tanınmaz (hiçbir `Deposit()` olayı tetiklenmez ve depozito değeri değişmez). İstenmeyen ERC-20 depozitoları filtrelenemez veya engellenemez.

### Jeton yatırımı tamamlandıktan sonra bazı fonksiyonları yürütmek istersek ne yapmalıyız? {#function-execution}

Bunu yapmanın birkaç yolu vardır. Bu örnekte, ERC-223 transferlerini Ether transferlerine özdeş hale getiren yöntemi takip edeceğiz:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

`RecipientContract` bir ERC-223 jetonu aldığında sözleşme, tıpkı Ether işlemlerinin fonksiyon çağrılarını işlem `data` olarak kodlaması gibi jeton işleminin `_data` parametresi olarak kodlanan bir fonksiyonu yürütür. Daha fazla bilgi için [veri alanını](https://ethereum.org/en/developers/docs/transactions/#the-data-field) okuyun.

Yukarıdaki örnekte, bir ERC-223 jetonunun `transfer(address,uin256,bytes calldata _data)` fonksiyonu ile `RecipientContract` adresine transferi gerekmektedir. Eğer veri parametresi `0xc2985578` (`foo()` fonksiyonunun imzası) ise, jeton depozitosu alındıktan sonra foo() fonksiyonu çağrılır ve Foo() olayı tetiklenir.

Parametreler jeton transferinin `data`sına da kodlanabilir, örneğin `_someNumber` için 12345 değeriyle bar() fonksiyonunu çağırabiliriz. Bu durumda `data` şu şekilde olmalıdır: `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, burada `0x0423a132`, `bar(uint256)` fonksiyonunun imzası ve `00000000000000000000000000000000000000000000000000000000000004d2` ise uint256 olarak 12345'tir.

## Sınırlamalar {#limitations}

ERC-223, ERC-20 standardında bulunan birkaç sorunu ele alırken, kendi sınırlamaları da vardır:

- Benimsenme ve Uyumluluk: ERC-223 henüz geniş çapta benimsenmemiştir, bu da mevcut araç ve platformlarla uyumluluğunu sınırlayabilir.
- Geriye Dönük Uyumluluk: ERC-223, ERC-20 ile geriye dönük uyumlu değildir; bu nedenle mevcut ERC-20 sözleşmeleri ve araçlar, ERC-223 jetonları ile modifikasyon yapılmadan çalışmaz.
- Gaz Maliyetleri: ERC-223 transferlerindeki ek kontrol ve işlevler, ERC-20 işlemlerine kıyasla daha yüksek gaz maliyetlerine neden olabilir.

## Daha fazla kaynak {#further-reading}

- [EIP-223: ERC-223 Jeton Standardı](https://eips.ethereum.org/EIPS/eip-223)
- [İlk ERC-223 önerisi](https://github.com/ethereum/eips/issues/223)
