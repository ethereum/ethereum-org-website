---
title: "Akıllı sözleşme dilleri"
description: "İki ana akıllı sözleşme dili olan Solidity ve Vyper'a genel bir bakış ve karşılaştırma."
lang: tr
---

[Ethereum](/)'un harika bir yönü, akıllı sözleşmelerin nispeten geliştirici dostu diller kullanılarak programlanabilmesidir. Python veya herhangi bir [süslü parantez dili](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) konusunda deneyimliyseniz, tanıdık sözdizimine sahip bir dil bulabilirsiniz.

En aktif ve bakımı yapılan iki dil şunlardır:

- Solidity
- Vyper

Remix entegre geliştirme ortamı (IDE), hem Solidity hem de Vyper'da sözleşmeler oluşturmak ve test etmek için kapsamlı bir geliştirme ortamı sağlar. Kodlamaya başlamak için [tarayıcı içi Remix IDE'yi deneyin](https://remix.ethereum.org).

Daha deneyimli geliştiriciler, [Ethereum Sanal Makinesi (EVM)](/developers/docs/evm/) için bir ara dil olan Yul'u veya Yul'un bir uzantısı olan Yul+'ı kullanmak isteyebilirler.

Meraklıysanız ve hala yoğun geliştirme aşamasında olan yeni dilleri test etmeye yardımcı olmak istiyorsanız, şu anda hala emekleme aşamasında olan ve yeni ortaya çıkan bir akıllı sözleşme dili olan Fe'yi deneyebilirsiniz.

## Ön koşullar {#prerequisites}

Programlama dilleri, özellikle JavaScript veya Python hakkında önceden bilgi sahibi olmak, akıllı sözleşme dillerindeki farklılıkları anlamanıza yardımcı olabilir. Ayrıca, dil karşılaştırmalarına çok derinlemesine girmeden önce akıllı sözleşmeleri bir kavram olarak anlamanızı öneririz. [Akıllı sözleşmelere giriş](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Akıllı sözleşmeleri uygulamak için nesne yönelimli, üst düzey dil.
- En çok C++'tan etkilenmiş süslü parantez dili.
- Statik tipli (bir değişkenin tipi derleme zamanında bilinir).
- Şunları destekler:
  - Kalıtım (diğer sözleşmeleri genişletebilirsiniz).
  - Kütüphaneler (farklı sözleşmelerden çağırabileceğiniz yeniden kullanılabilir kodlar oluşturabilirsiniz - diğer nesne yönelimli programlama dillerindeki statik bir sınıftaki statik fonksiyonlar gibi).
  - Karmaşık kullanıcı tanımlı tipler.

### Önemli bağlantılar {#important-links}

- [Belgeler](https://docs.soliditylang.org/en/latest/)
- [Solidity Dil Portalı](https://soliditylang.org/)
- [Örneklerle Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Matrix Sohbet Odası](https://matrix.to/#/#ethereum_solidity:gitter.im)na köprülenmiş [Solidity Gitter Sohbet Odası](https://gitter.im/ethereum/solidity)
- [Kopya Kağıdı](https://reference.auditless.com/cheatsheet)
- [Solidity Blogu](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Örnek sözleşme {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" anahtar kelimesi değişkenleri
    // diğer sözleşmelerden erişilebilir hale getirir
    address public minter;
    mapping (address => uint) public balances;

    // Olaylar, istemcilerin bildirdiğiniz belirli
    // sözleşme değişikliklerine tepki vermesini sağlar
    event Sent(address from, address to, uint amount);

    // Kurucu kod yalnızca sözleşme
    // oluşturulduğunda çalıştırılır
    constructor() {
        minter = msg.sender;
    }

    // Bir adrese belirli miktarda yeni oluşturulmuş coin gönderir
    // Yalnızca sözleşme oluşturucu tarafından çağrılabilir
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Mevcut coin'lerden belirli bir miktarını
    // herhangi bir çağırıcıdan bir adrese gönderir
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Bu örnek, Solidity sözleşme sözdiziminin nasıl olduğuna dair size bir fikir vermelidir. Fonksiyonların ve değişkenlerin daha ayrıntılı bir açıklaması için [belgelere bakın](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Python benzeri programlama dili
- Güçlü tipleme
- Küçük ve anlaşılır derleyici kodu
- Verimli baytkod üretimi
- Sözleşmeleri daha güvenli ve denetlenmesi daha kolay hale getirmek amacıyla kasıtlı olarak Solidity'den daha az özelliğe sahiptir. Vyper şunları desteklemez:
  - Değiştiriciler (Modifiers)
  - Kalıtım
  - Satır içi assembly
  - Fonksiyon aşırı yükleme (Function overloading)
  - Operatör aşırı yükleme (Operator overloading)
  - Özyinelemeli çağırma (Recursive calling)
  - Sonsuz uzunluklu döngüler
  - İkili sabit noktalar (Binary fixed points)

v0.4.0'dan beri Vyper bir [modül sistemini](https://docs.vyperlang.org/en/stable/using-modules.html) desteklemektedir. Kodun yeniden kullanımı, sınıf kalıtımı yerine kompozisyon yoluyla sağlanır.

Daha fazla bilgi için [Vyper'ın temel mantığını okuyun](https://vyper.readthedocs.io/en/latest/index.html).

### Önemli bağlantılar {#important-links-1}

- [Belgeler](https://vyper.readthedocs.io)
- [Örneklerle Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Örneklerle Daha Fazla Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper topluluğu Discord sohbeti](https://discord.gg/SdvKC79cJk)
- [Kopya Kağıdı](https://reference.auditless.com/cheatsheet)
- [Vyper için akıllı sözleşme geliştirme çerçeveleri ve araçları](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper akıllı sözleşmelerini güvence altına almayı ve hacklemeyi öğrenin](https://github.com/SupremacyTeam/VyperPunk)
- [Geliştirme için Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper'ın en iyi akıllı sözleşme örnekleri](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Harika Vyper derlenmiş kaynakları](https://github.com/spadebuilders/awesome-vyper)

### Örnek {#example}

```python
# Açık Açık Artırma

# Açık artırma parametreleri
# Lehtar, en yüksek teklif verenden parayı alır
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Açık artırmanın mevcut durumu
highestBidder: public(address)
highestBid: public(uint256)

# Sonda true olarak ayarlanır, herhangi bir değişikliğe izin vermez
ended: public(bool)

# Çekme (withdraw) modelini takip edebilmemiz için iade edilen teklifleri takip edin
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` ile basit bir açık artırma oluşturun
# saniyelik teklif verme süresi, şu kişi adına:
# lehtar adresi `_beneficiary`.
@deploy
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Gönderilen değerle açık artırmaya
# bu işlemle birlikte teklif verin.
# Değer yalnızca açık artırma
# kazanılamazsa iade edilecektir.
@external
@payable
def bid():
    # Teklif verme süresinin bitip bitmediğini kontrol edin.
    assert block.timestamp < self.auctionEnd
    # Teklifin yeterince yüksek olup olmadığını kontrol edin
    assert msg.value > self.highestBid
    # Önceki en yüksek teklif veren için iadeyi takip edin
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Yeni en yüksek teklifi takip edin
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Önceden iade edilmiş bir teklifi çekin. Çekme (withdraw) modeli burada
# bir güvenlik sorununu önlemek için kullanılır. İadeler doğrudan
# bid() işlevinin bir parçası olarak gönderilseydi, kötü niyetli bir teklif sözleşmesi
# bu iadeleri engelleyebilir ve böylece yeni daha yüksek tekliflerin gelmesini engelleyebilirdi.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Açık artırmayı sonlandırın ve en yüksek teklifi
# lehtara gönderin.
@external
def endAuction():
    # Etkileşime giren işlevleri yapılandırmak iyi bir kuraldır
    # diğer sözleşmelerle (yani işlevleri çağırırlar veya ether gönderirler)
    # üç aşamaya:
    # 1. koşulları kontrol etme
    # 2. eylemleri gerçekleştirme (potansiyel olarak koşulları değiştirme)
    # 3. diğer sözleşmelerle etkileşim kurma
    # Bu aşamalar birbirine karıştırılırsa, diğer sözleşme
    # mevcut sözleşmeye geri çağrı yapabilir ve durumu değiştirebilir veya
    # etkilerin (ether ödemesi) birden fazla kez gerçekleştirilmesine neden olabilir.
    # Dahili olarak çağrılan işlevler harici
    # sözleşmelerle etkileşim içeriyorsa, bunların da harici
    # sözleşmelerle etkileşim olarak kabul edilmesi gerekir.

    # 1. Koşullar
    # Açık artırma bitiş zamanına ulaşılıp ulaşılmadığını kontrol edin
    assert block.timestamp >= self.auctionEnd
    # Bu işlevin zaten çağrılıp çağrılmadığını kontrol edin
    assert not self.ended

    # 2. Etkiler
    self.ended = True

    # 3. Etkileşim
    send(self.beneficiary, self.highestBid)
```

Bu örnek, Vyper sözleşme sözdiziminin nasıl olduğuna dair size bir fikir vermelidir. Fonksiyonların ve değişkenlerin daha ayrıntılı bir açıklaması için [belgelere bakın](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul ve Yul+ {#yul}

Ethereum'da yeniyseniz ve henüz akıllı sözleşme dilleriyle herhangi bir kodlama yapmadıysanız, Solidity veya Vyper ile başlamanızı öneririz. Yalnızca akıllı sözleşme güvenliği en iyi uygulamalarına ve EVM ile çalışmanın özelliklerine aşina olduktan sonra Yul veya Yul+'ı inceleyin.

**Yul**

- Ethereum için ara dil.
- [EVM](/developers/docs/evm)'yi ve Ethereum aromalı bir WebAssembly olan [Ewasm](https://github.com/ewasm)'ı destekler ve her iki platformun da kullanılabilir ortak paydası olacak şekilde tasarlanmıştır.
- Hem EVM hem de Ewasm platformlarına eşit derecede fayda sağlayabilecek üst düzey optimizasyon aşamaları için iyi bir hedeftir.

**Yul+**

- Yul'un düşük seviyeli, oldukça verimli bir uzantısı.
- Başlangıçta bir [İyimser rollup](/developers/docs/scaling/optimistic-rollups/) sözleşmesi için tasarlanmıştır.
- Yul+, Yul'a yeni özellikler ekleyen deneysel bir yükseltme teklifi olarak görülebilir.

### Önemli bağlantılar {#important-links-2}

- [Yul Belgeleri](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ Belgeleri](https://github.com/fuellabs/yulp)
- [Yul+ Tanıtım Yazısı](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Örnek sözleşme {#example-contract-2}

Aşağıdaki basit örnek bir üs alma fonksiyonunu uygular. `solc --strict-assembly --bin input.yul` kullanılarak derlenebilir. Örnek, input.yul dosyasında saklanmalıdır.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Akıllı sözleşmeler konusunda zaten iyi bir deneyime sahipseniz, Yul'da tam bir ERC-20 uygulaması [burada](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) bulunabilir.

## Fe {#fe}

- Ethereum Sanal Makinesi (EVM) için statik tipli dil.
- Python ve Rust'tan esinlenilmiştir.
- Ethereum ekosisteminde yeni olan geliştiriciler için bile öğrenmesi kolay olmayı hedefler.
- Fe geliştirmesi hala erken aşamalarındadır, dil alfa sürümünü Ocak 2021'de yayınlamıştır.

### Önemli bağlantılar {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe Duyurusu](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 Yol Haritası](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord Sohbeti](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### Örnek sözleşme {#example-contract-3}

Aşağıdaki, Fe'de uygulanan basit bir sözleşmedir.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()
```

## Nasıl seçilir {#how-to-choose}

Diğer tüm programlama dillerinde olduğu gibi, bu çoğunlukla doğru iş için doğru aracı seçmekle ve kişisel tercihlerle ilgilidir.

Henüz dillerden hiçbirini denemediyseniz göz önünde bulundurmanız gereken birkaç şey şunlardır:

### Solidity'nin harika yanları nelerdir? {#solidity-advantages}

- Yeni başlıyorsanız, piyasada birçok eğitim ve öğrenme aracı bulunmaktadır. Bu konuda daha fazla bilgiyi [Kodlayarak Öğrenin](/developers/learning-tools/) bölümünde bulabilirsiniz.
- İyi geliştirici araçları mevcuttur.
- Solidity'nin büyük bir geliştirici topluluğu vardır, bu da sorularınızın yanıtlarını büyük olasılıkla oldukça hızlı bulacağınız anlamına gelir.

### Vyper'ın harika yanları nelerdir? {#vyper-advatages}

- Akıllı sözleşmeler yazmak isteyen Python geliştiricileri için başlamanın harika bir yoludur.
- Vyper, fikirlerin hızlı bir şekilde prototiplenmesi için harika olmasını sağlayan daha az sayıda özelliğe sahiptir.
- Vyper, denetlenmesi kolay ve maksimum düzeyde insan tarafından okunabilir olmayı hedefler.

### Yul ve Yul+'ın harika yanları nelerdir? {#yul-advantages}

- Basit ve işlevsel düşük seviyeli dil.
- Sözleşmelerinizin Gaz kullanımını optimize etmeye yardımcı olabilecek ham EVM'ye çok daha fazla yaklaşmanızı sağlar.

## Dil karşılaştırmaları {#language-comparisons}

Temel sözdizimi, sözleşme yaşam döngüsü, arayüzler, operatörler, veri yapıları, fonksiyonlar, kontrol akışı ve daha fazlasının karşılaştırmaları için [Auditless'ın bu kopya kağıdına](https://reference.auditless.com/cheatsheet/) göz atın.

## Daha fazla bilgi {#further-reading}

- [OpenZeppelin'den Solidity Sözleşme Kütüphanesi](https://docs.openzeppelin.com/contracts/5.x/)
- [Örneklerle Solidity](https://solidity-by-example.org)