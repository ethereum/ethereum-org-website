---
title: Akıllı sözleşme dilleri
description: "İki ana akıllı sözleşme diline genel bir bakış ve karşılaştırma: Solidity ve Vyper."
lang: tr
---

Ethereum'un harika yönlerinden birisi, akıllı sözleşmelerin nispeten geliştirici dostu dillerle yazılabilmesidir. Python'da veya herhangi bir [süslü parantezli dilde](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) deneyimliyseniz, söz dizimi tanıdık olan bir dil bulabilirsiniz.

En aktif ve sürdürülen iki dil ise şunlardır:

- Solidity
- Vyper

Remix IDE, hem Solidity hem de Vyper'da sözleşme oluşturmak ve test etmeye yönelik kapsamlı bir geliştirme ortamı sağlar. [Kodlamaya başlamak için tarayıcı içi Remix IDE'yi deneyin](https://remix.ethereum.org).

Daha deneyimli geliştiriciler [Ethereum Sanal Makinesi](/developers/docs/evm/) için bir ara dil olan Yul'u veya Yul'un bir uzantısı olan Yul+'ı kullanmak isteyebilirler.

Eğer meraklıysanız ve hâlâ ağır geliştirme altında olan yeni dilleri test etmeye yardımcı olmak istiyorsanız, daha başlangıç aşamasında ve yakın zamanda ortaya çıkmış bir akıllı sözleşme dili olan Fe'yi deneyebilirsiniz.

## Ön Koşullar {#prerequisites}

Programlama dilleri, özellikle JavaScript veya Python hakkında önceden bilgiye sahip olmak akıllı sözleşme dillerindeki farklılıkları bir mantığa oturtabilmenize yardımcı olur. Ayrıca dil karşılaştırmalarında çok derine dalmadan önce akıllı sözleşmeleri konsept olarak anlamanızı öneriyoruz. [Akıllı sözleşmelere giriş](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Akıllı sözleşmeler yapmak için nesne odaklı ve yüksek düzey bir dil.
- En çok C++'tan etkilenmiş olan bir süslü ayraç dili.
- Statik şekilde yazılır (bir değişkenin türü derleme esnasında bilinir).
- Şunları destekler:
  - Kalıtım (başka sözleşmeleri ekleyebilirsiniz).
  - Kütüphaneler (başka nesne odaklı programlama dillerinde statik bir sınıftaki statik fonksiyonlar gibi başka sözleşmelerden çağırabileceğiniz yeniden kullanılabilir kodlar oluşturabilirsiniz).
  - Karışık, kullanıcı tarafından tanımlanan türler.

### Önemli bağlantılar {#important-links}

- [Dokümantasyon](https://docs.soliditylang.org/en/latest/)
- [Solidity Dil Portalı](https://soliditylang.org/)
- [Örneklerle Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Matrix Sohbet Odasına](https://matrix.to/#/#ethereum_solidity:gitter.im) köprülenmiş [Solidity Gitter Sohbet Odası](https://gitter.im/ethereum/solidity)
- [Kopya Kağıdı](https://reference.auditless.com/cheatsheet)
- [Solidity Blogu](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Örnek sözleşme {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" anahtar kelimesi, değişkenleri
    // diğer sözleşmelerden erişilebilir kılar
    address public minter;
    mapping (address => uint) public balances;

    // Olaylar, istemcilerin bildirdiğiniz belirli
    // sözleşme değişikliklerine tepki vermesine olanak tanır
    event Sent(address from, address to, uint amount);

    // Yapıcı kod yalnızca sözleşme
    // oluşturulduğunda çalışır
    constructor() {
        minter = msg.sender;
    }

    // Yeni oluşturulan coin'lerden bir miktarını bir adrese gönderir
    // Yalnızca sözleşme yaratıcısı tarafından çağrılabilir
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Herhangi bir çağırandan bir adrese
    // mevcut coin miktarını gönderir
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Yetersiz bakiye.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Bu örnek size Solidity sözleşme söz dizimi hakkında bir fikir verecektir. Fonksiyonların ve değişkenlerin daha ayrıntılı bir açıklaması için [belgelere bakın](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Python'a benzer programlama dili
- Güçlü tipleme
- Küçük ve anlaşılabilir derleyici kodu
- Etkili bit kodu oluşturma
- Sözleşmeleri daha güvenli ve denetlenmesi daha kolay hâle getirmek amacıyla bilinçli olarak Solidity'den daha az özelliğe sahiptir. Vyper şunları desteklemez:
  - Niteleyiciler
  - Kalıtım
  - Satır içi derleme
  - Fonksiyon aşırı yüklemesi
  - Operatör aşırı yüklemesi
  - Özyinelemeli çağrı
  - Sonsuz uzunlukta döngüler
  - İkili sabit noktalar

Daha fazla bilgi için [Vyper gerekçesini okuyun](https://vyper.readthedocs.io/en/latest/index.html).

### Önemli bağlantılar {#important-links-1}

- [Dokümantasyon](https://vyper.readthedocs.io)
- [Örneklerle Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Örneklerle Daha Fazla Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper topluluğu Discord sohbeti](https://discord.gg/SdvKC79cJk)
- [Kopya Kağıdı](https://reference.auditless.com/cheatsheet)
- [Vyper için akıllı sözleşme geliştirme çerçeveleri ve araçları](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper akıllı sözleşmelerini güvenli hale getirmeyi ve hacklemeyi öğrenin](https://github.com/SupremacyTeam/VyperPunk)
- [Geliştirme için Vyper Merkezi](https://github.com/zcor/vyper-dev)
- [En popüler Vyper akıllı sözleşme örnekleri](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Harika Vyper derlenmiş kaynakları](https://github.com/spadebuilders/awesome-vyper)

### Örnek {#example}

```python
# Açık Artırma

# Açık artırma parametreleri
# Lehtar, en yüksek teklifi verenden para alır
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Açık artırmanın mevcut durumu
highestBidder: public(address)
highestBid: public(uint256)

# Sonunda true olarak ayarlanır, herhangi bir değişikliğe izin vermez
ended: public(bool)

# Geri çekme modelini takip edebilmek için iade edilen teklifleri takip edin
pendingReturns: public(HashMap[address, uint256])

# Lehtar adresi `_beneficiary` adına `_bidding_time`
# saniyelik teklif süresi ile basit bir açık artırma oluşturun.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bu işlemle birlikte gönderilen değerle
# açık artırmaya teklif verin.
# Değer yalnızca açık artırma
# kazanılmazsa iade edilecektir.
@external
@payable
def bid():
    # Teklif verme süresinin bitip bitmediğini kontrol edin.
    assert block.timestamp < self.auctionEnd
    # Teklifin yeterince yüksek olup olmadığını kontrol edin
    assert msg.value > self.highestBid
    # Önceki en yüksek teklif verenin iadesini takip edin
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Yeni yüksek teklifi takip edin
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Önceden iade edilmiş bir teklifi geri çekin. Geri çekme modeli
# burada bir güvenlik sorununu önlemek için kullanılır. Geri ödemeler doğrudan
# bid()'in bir parçası olarak gönderilirse, kötü niyetli bir teklif sözleşmesi bu
# geri ödemeleri engelleyebilir ve dolayısıyla yeni daha yüksek tekliflerin gelmesini engelleyebilir.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Açık artırmayı sonlandırın ve en yüksek teklifi
# lehtara gönderin.
@external
def endAuction():
    # Diğer sözleşmelerle etkileşim kuran (yani fonksiyonları çağıran veya ether gönderen)
    # fonksiyonları üç aşamada yapılandırmak iyi bir kılavuzdur:
    # 1. koşulları kontrol etme
    # 2. eylemleri gerçekleştirme (koşulları potansiyel olarak değiştirme)
    # 3. diğer sözleşmelerle etkileşim kurma
    # Bu aşamalar karıştırılırsa, diğer sözleşme mevcut sözleşmeye
    # geri çağrı yapabilir ve durumu değiştirebilir veya etkilerin (ether ödemesi)
    # birden çok kez gerçekleştirilmesine neden olabilir.
    # Dahili olarak çağrılan fonksiyonlar harici sözleşmelerle etkileşim içeriyorsa,
    # bunlar da harici sözleşmelerle etkileşim olarak kabul edilmelidir.

    # 1. Koşullar
    # Açık artırma bitiş zamanına ulaşılıp ulaşılmadığını kontrol edin
    assert block.timestamp >= self.auctionEnd
    # Bu fonksiyonun daha önce çağrılıp çağrılmadığını kontrol edin
    assert not self.ended

    # 2. Etkiler
    self.ended = True

    # 3. Etkileşim
    send(self.beneficiary, self.highestBid)
```

Bu örnek size Vyper sözleşme söz dizimi hakkında bir fikir verecektir. Fonksiyonların ve değişkenlerin daha ayrıntılı bir açıklaması için [belgelere bakın](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul ve Yul+ {#yul}

Eğer Ethereum'da yeniyseniz ve akıllı sözleşme dilleriyle henüz herhangi bir kodlama yapmadıysanız, Solidity veya Vyper ile başlamanızı öneririz. Akıllı sözleşme güvenliğinin en iyi yöntemleri ve EVM ile çalışmanın şartları ile aşina olduğunuz zaman Yul veya Yul+ dillerine bakın.

**Yul**

- Ethereum için orta seviye dil.
- [EVM](/developers/docs/evm) ve Ethereum aromalı bir WebAssembly olan [Ewasm](https://github.com/ewasm)'ı destekler ve her iki platformun da kullanılabilir ortak paydası olacak şekilde tasarlanmıştır.
- EVM ve Ewasm platformlarına eşit derece katkı sağlayabilecek yüksek seviye optimizasyon aşamaları için iyi bir hedeftir.

**Yul+**

- Yüksek derecede verimli bir alt düzey Yul eklentisi.
- Başlangıçta bir [iyimser toplama](/developers/docs/scaling/optimistic-rollups/) sözleşmesi için tasarlanmıştır.
- Yul+, Yul'a yeni özellikler ekleyen deneysel bir yükseltme tasarısı olarak görülebilir.

### Önemli bağlantılar {#important-links-2}

- [Yul Dokümantasyonu](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ Dokümantasyonu](https://github.com/fuellabs/yulp)
- [Yul+ Tanıtım Yazısı](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Örnek sözleşme {#example-contract-2}

Aşağıdaki basit örnek bir üs fonksiyonu uygular. `solc --strict-assembly --bin input.yul` kullanılarak derlenebilir. Örnek input.yul dosyasında depolanmalıdır.

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

Akıllı sözleşmeler konusunda zaten deneyimliyseniz, Yul'da tam bir ERC20 uygulamasını [burada](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) bulabilirsiniz.

## Fe {#fe}

- Ethereum Sanal Makinesi (EVM) için statik olarak yazılmış dil.
- Python ve Rust'tan ilham almıştır.
- Ethereum ekosistemine yabancı geliştiriciler için bile kolay öğrenilebilir olmayı hedefler.
- Fe geliştirilmesi henüz erken aşamalarındadır: Alpha sürümü Ocak 2021'de yayınlanmıştır.

### Önemli bağlantılar {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe Duyurusu](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 Yol Haritası](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord Sohbeti](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### Örnek sözleşme {#example-contract-3}

Aşağıda Fe ile uygulanan basit bir sözleşme bulunuyor.

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

Her diğer programlama dilinde olduğu gibi, kişisel tercihlerin yanı sıra çoğunlukla doğru iş için doğru aracı seçmekle de ilgilidir.

Eğer dillerden herhangi birini denemediyseniz burada akılda tutulabilecek birkaç şey bulunmaktadır:

### Solidity'nin harika olan tarafı nedir? {#solidity-advantages}

- Eğer acemiyseniz, birçok öğretici ve öğrenim aracı bulunmaktadır. Bununla ilgili daha fazlasını [Kodlayarak Öğrenme](/developers/learning-tools/) bölümünde görebilirsiniz.
- İyi geliştirici araçları bulunur.
- Solidity büyük bir geliştirici topluluğuna sahiptir, bu da sorularınıza büyük ihtimalle hızlıca cevaplar bulabileceğiniz anlamına gelir.

### Vyper'ın harika olan tarafı nedir? {#vyper-advatages}

- Akıllı sözleşmeler yazmak isteyen Python geliştiricileri için iyi bir başlangıç yolu.
- Vyper daha az özellik sayısına sahip olduğu için fikirlerin hızlı prototiplenmesi için harikadır.
- Vyper kolay denetlenebilirliği ve en yüksek seviyede insan tarafından okunabilmeyi hedefler.

### Yul ve Yul+'ın harika olan tarafları nedir? {#yul-advantages}

- Basite indirgenmiş ve işlevsel alt düzey dil.
- Saf EVM'ye çok daha yakınlaşmayı sağlar, bu da sözleşmelerinizin gaz kullanımını optimize etmeye yardımcı olabilir.

## Dil karşılaştırmaları {#language-comparisons}

Temel söz dizimi, sözleşme yaşam döngüsü, arayüzler, operatörler, veri yapıları, fonksiyonlar, kontrol akışı ve daha fazlasının karşılaştırmaları için Auditless tarafından hazırlanan bu [kopya kağıdına](https://reference.auditless.com/cheatsheet/) göz atın.

## Daha fazla kaynak {#further-reading}

- [OpenZeppelin tarafından Solidity Sözleşmeleri Kütüphanesi](https://docs.openzeppelin.com/contracts/5.x/)
- [Örneklerle Solidity](https://solidity-by-example.org)
