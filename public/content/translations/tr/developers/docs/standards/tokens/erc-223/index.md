---
title: "ERC-223 Token Standardı"
description: "ERC-223 misli Token standardına, nasıl çalıştığına ve ERC-20 ile karşılaştırmasına genel bir bakış."
lang: tr
---

## Giriş {#introduction}

### ERC-223 nedir? {#what-is-erc223}

ERC-223, ERC-20 standardına benzer şekilde misli Token'lar için bir standarttır. Temel fark, ERC-223'ün yalnızca Token API'sini değil, aynı zamanda Token'ları göndericiden alıcıya transfer etme mantığını da tanımlamasıdır. Token transferlerinin alıcı tarafında işlenmesine olanak tanıyan bir iletişim modeli sunar.

### ERC-20'den farkları {#erc20-differences}

ERC-223, ERC-20'nin bazı sınırlamalarını ele alır ve Token sözleşmesi ile Token'ları alabilecek bir sözleşme arasında yeni bir etkileşim yöntemi sunar. ERC-223 ile mümkün olup ERC-20 ile mümkün olmayan birkaç şey vardır:

- Alıcı tarafında Token transferi işleme: Alıcılar, bir ERC-223 Token'ının yatırıldığını tespit edebilir.
- Yanlış gönderilen Token'ların reddedilmesi: Bir kullanıcı, Token almaması gereken bir sözleşmeye ERC-223 Token'ları gönderirse, sözleşme işlemi reddederek Token kaybını önleyebilir.
- Transferlerde meta veri: ERC-223 Token'ları, Token işlemlerine isteğe bağlı bilgilerin eklenmesine olanak tanıyan meta veri içerebilir.

## Ön Koşullar {#prerequisites}

- [Hesaplar](/developers/docs/accounts)
- [Akıllı Sözleşmeler](/developers/docs/smart-contracts/)
- [Token standartları](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Gövde {#body}

ERC-223, akıllı sözleşmeler içindeki Token'lar için bir API uygulayan bir Token standardıdır. Ayrıca ERC-223 Token'larını alması beklenen sözleşmeler için de bir API bildirir. ERC-223 Alıcı API'sini desteklemeyen sözleşmeler ERC-223 Token'larını alamaz, bu da kullanıcı hatalarını önler.

Bir akıllı sözleşme aşağıdaki yöntemleri ve olayları uygularsa, ERC-223 uyumlu bir Token sözleşmesi olarak adlandırılabilir. Dağıtıldıktan sonra, Ethereum üzerinde oluşturulan Token'ları takip etmekten sorumlu olacaktır.

Sözleşme yalnızca bu işlevlere sahip olmak zorunda değildir ve bir geliştirici bu sözleşmeye farklı Token standartlarından başka herhangi bir özellik ekleyebilir. Örneğin, `approve` ve `transferFrom` işlevleri ERC-223 standardının bir parçası değildir ancak gerekirse bu işlevler uygulanabilir.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223)'ten:

### Yöntemler {#methods}

ERC-223 Token'ı aşağıdaki yöntemleri uygulamalıdır:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 Token'larını alması beklenen bir sözleşme aşağıdaki yöntemi uygulamalıdır:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

ERC-223 Token'ları `tokenReceived(..)` işlevini uygulamayan bir sözleşmeye gönderilirse, transfer başarısız olmalı ve Token'lar göndericinin bakiyesinden taşınmamalıdır.

### Olaylar {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Örnekler {#examples}

ERC-223 Token'ının API'si ERC-20'ninkine benzerdir, bu nedenle kullanıcı arayüzü (UI) geliştirme açısından hiçbir fark yoktur. Buradaki tek istisna, bu standart için isteğe bağlı olduklarından ERC-223 Token'larının `approve` + `transferFrom` işlevlerine sahip olmayabilmesidir.

#### Solidity örnekleri {#solidity-example}

Aşağıdaki örnek, temel bir ERC-223 Token sözleşmesinin nasıl çalıştığını göstermektedir:

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

Şimdi, tokenA'nın bir ERC-223 Token'ı olduğunu varsayarak başka bir sözleşmenin `tokenA` yatırma işlemlerini kabul etmesini istiyoruz. Sözleşme yalnızca tokenA'yı kabul etmeli ve diğer tüm Token'ları reddetmelidir. Sözleşme tokenA'yı aldığında bir `Deposit()` olayı yaymalı ve dahili `deposits` değişkeninin değerini artırmalıdır.

İşte kod:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Kabul etmek istediğimiz tek Token.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Bu fonksiyon içinde şunu anlamak önemlidir
        // msg.sender alınan bir Token'ın Adresidir,
        // msg.value  Token Sözleşmesi çoğu durumda Ether'e sahip olmadığı veya göndermediği için her zaman 0'dır,
        // _from      Token transferinin göndericisidir,
        // _value     yatırılan Token miktarıdır.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Sıkça sorulan sorular {#faq}

### Sözleşmeye biraz tokenB gönderirsek ne olur? {#sending-tokens}

İşlem başarısız olacak ve Token transferi gerçekleşmeyecektir. Token'lar göndericinin adresine iade edilecektir.

### Bu sözleşmeye nasıl yatırma işlemi yapabiliriz? {#contract-deposits}

`RecipientContract` adresini belirterek ERC-223 Token'ının `transfer(address,uint256)` veya `transfer(address,uint256,bytes)` işlevini çağırın.

### Bu sözleşmeye bir ERC-20 Token'ı transfer edersek ne olur? {#erc-20-transfers}

Eğer `RecipientContract` adresine bir ERC-20 Token'ı gönderilirse, Token'lar transfer edilecek ancak transfer tanınmayacaktır (hiçbir `Deposit()` olayı tetiklenmeyecek ve yatırılan miktar değeri değişmeyecektir). İstenmeyen ERC-20 yatırma işlemleri filtrelenemez veya engellenemez.

### Token yatırma işlemi tamamlandıktan sonra bir işlevi yürütmek istersek ne olur? {#function-execution}

Bunu yapmanın birden fazla yolu vardır. Bu örnekte, ERC-223 transferlerini Ether transferleriyle aynı kılan yöntemi izleyeceğiz:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Kabul etmek istediğimiz tek Token.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Gelen işlemi işleyin ve ardından bir fonksiyon çağrısı gerçekleştirin.
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

`RecipientContract` bir ERC-223 Token'ı aldığında, sözleşme, tıpkı Ether işlemlerinin işlev çağrılarını işlem `data`'si olarak kodlamasına benzer şekilde, Token işleminin `_data` parametresi olarak kodlanmış bir işlevi yürütecektir. Daha fazla bilgi için [veri alanını](/developers/docs/transactions/#the-data-field) okuyun.

Yukarıdaki örnekte, bir ERC-223 Token'ı `transfer(address,uin256,bytes calldata _data)` işlevi ile `RecipientContract` adresine transfer edilmelidir. Veri parametresi `0xc2985578` (bir `foo()` işlevinin imzası) olursa, Token yatırma işlemi alındıktan sonra foo() işlevi çağrılacak ve Foo() olayı tetiklenecektir.

Parametreler Token transferinin `data`'sine de kodlanabilir, örneğin `_someNumber` için 12345 değeriyle bar() işlevini çağırabiliriz. Bu durumda `data`, `0x0423a132`'nin `bar(uint256)` işlevinin imzası ve `00000000000000000000000000000000000000000000000000000000000004d2`'nin uint256 olarak 12345 olduğu `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` olmalıdır.

## Sınırlamalar {#limitations}

ERC-223, ERC-20 standardında bulunan çeşitli sorunları ele alsa da, kendi sınırlamaları da yok değildir:

- Benimsenme ve Uyumluluk: ERC-223 henüz yaygın olarak benimsenmemiştir, bu da mevcut araçlar ve platformlarla uyumluluğunu sınırlayabilir.
- Geriye Dönük Uyumluluk: ERC-223, ERC-20 ile geriye dönük uyumlu değildir, yani mevcut ERC-20 sözleşmeleri ve araçları değişiklik yapılmadan ERC-223 Token'larıyla çalışmayacaktır.
- Gaz Maliyetleri: ERC-223 transferlerindeki ek kontroller ve işlevler, ERC-20 işlemlerine kıyasla daha yüksek Gaz maliyetlerine neden olabilir.

## Daha fazla okuma {#further-reading}

- [EIP-223: ERC-223 Token Standardı](https://eips.ethereum.org/EIPS/eip-223)
- [İlk ERC-223 teklifi](https://github.com/ethereum/eips/issues/223)