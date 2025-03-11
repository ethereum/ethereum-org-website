---
title: Akıllı sözleşme dilleri
description: 'İki ana akıllı sözleşme diline genel bir bakış ve karşılaştırma: Solidity ve Vyper.'
lang: tr
---

Ethereum'un harika yönlerinden birisi, akıllı sözleşmelerin nispeten geliştirici dostu dillerle yazılabilmesidir. Eğer Python veya herhangi bir [süslü ayraç dilinde](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) deneyimliyseniz, benzer söz dizimi olan bir dil bulabilirsiniz.

En aktif ve sürdürülen iki dil ise şunlardır:

- Solidity
- Vyper

Remix IDE, hem Solidity hem de Vyper'da sözleşme oluşturmak ve test etmeye yönelik kapsamlı bir geliştirme ortamı sağlar. Kodlamaya başlamak için [Remix IDE'nin tarayıcı içi sürümünü deneyin](https://remix.ethereum.org).

Daha deneyimli geliştiricilerin [Ethereum Sanal Makinesi](/developers/docs/evm/) için orta seviye bir dil olan Yul ya da Yul'un bir eklentisi olan Yul+'ı kullanması uygun olur.

Eğer meraklıysanız ve hâlâ ağır geliştirme altında olan yeni dilleri test etmeye yardımcı olmak istiyorsanız, daha başlangıç aşamasında ve yakın zamanda ortaya çıkmış bir akıllı sözleşme dili olan Fe'yi deneyebilirsiniz.

## Ön koşullar {#prerequisites}

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

- [Belgeler](https://docs.soliditylang.org/en/latest/)
- [Solidity Dil Portalı](https://soliditylang.org/)
- [Örnekle Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im) ile köprülenmiş [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity)
- [Kopya Kağıdı](https://reference.auditless.com/cheatsheet)
- [Solidity Bloğu](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Örnek sözleşme {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Bu örnek size Solidity sözleşme söz dizimi hakkında bir fikir verecektir. Fonksiyonlar ve değişkenler hakkında daha detaylı bir açıklama için [belgelere bakın](https://docs.soliditylang.org/en/latest/contracts.html).

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

Daha fazla bilgi için [Vyper mantığını okuyun](https://vyper.readthedocs.io/en/latest/index.html).

### Önemli bağlantılar {#important-links-1}

- [Belgeler](https://vyper.readthedocs.io)
- [Örnekle Vyper](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Örneklerle Daha Fazla Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper topluluğu Discord sohbeti](https://discord.gg/SdvKC79cJk)
- [Kopya Kağıdı](https://reference.auditless.com/cheatsheet)
- [Vyper için akıllı sözleşme geliştirme çerçeveleri ve araçları](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper akıllı sözleşmelerini güvenli kılmayı ve hacklemeyi öğrenin](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - Vyper güvenlik açığı örnekleri](https://www.vyperexamples.com/reentrancy)
- [Geliştirme için Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper en başarılı akıllı sözleşme örnekleri](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Harika Vyper düzenlenmiş kaynakları](https://github.com/spadebuilders/awesome-vyper)

### Örnek {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

Bu örnek size Vyper sözleşme söz dizimi hakkında bir fikir verecektir. Fonksiyonlar ve değişkenler hakkında daha detaylı bir açıklama için [belgelere bakın](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul ve Yul+ {#yul}

Eğer Ethereum'da yeniyseniz ve akıllı sözleşme dilleriyle henüz herhangi bir kodlama yapmadıysanız, Solidity veya Vyper ile başlamanızı öneririz. Akıllı sözleşme güvenliğinin en iyi yöntemleri ve EVM ile çalışmanın şartları ile aşina olduğunuz zaman Yul veya Yul+ dillerine bakın.

**Yul**

- Ethereum için orta seviye dil.
- [EVM](/developers/docs/evm) ve Ethereum öğeleri barındıran bir WebAssembly olan [Ewasm](https://github.com/ewasm) platformlarını destekler ve iki platformun da yaygın ve kullanılabilir bir paydası olacak şekilde dizayn edilmiştir.
- EVM ve Ewasm platformlarına eşit derece katkı sağlayabilecek yüksek seviye optimizasyon aşamaları için iyi bir hedeftir.

**Yul+**

- Yüksek derecede verimli bir alt düzey Yul eklentisi.
- Aslen bir [iyimser toplama](/developers/docs/scaling/optimistic-rollups/) sözleşmesi için dizayn edilmiştir.
- Yul+, Yul'a yeni özellikler ekleyen deneysel bir yükseltme tasarısı olarak görülebilir.

### Önemli bağlantılar {#important-links-2}

- [Yul Belgeleri](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ Belgeleri](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Yul+ Giriş Gönderisi](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Örnek sözleşme {#example-contract-2}

Aşağıdaki basit örnek bir üs fonksiyonu uygular. `solc --strict-assembly --bin input.yul` ile derlenebilir. Örnek input.yul dosyasında depolanmalıdır.

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

Hâlihazırda akıllı sözleşmeler konusunda deneyimliyseniz, [buradan](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) Yul'daki tam bir ERC20 uygulamasına ulaşabilirsiniz.

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

## Seçim yapmak {#how-to-choose}

Her diğer programlama dilinde olduğu gibi, kişisel tercihlerin yanı sıra çoğunlukla doğru iş için doğru aracı seçmekle de ilgilidir.

Eğer dillerden herhangi birini denemediyseniz burada akılda tutulabilecek birkaç şey bulunmaktadır:

### Solidity'nin harika olan tarafı nedir? {#solidity-advantages}

- Eğer acemiyseniz, birçok öğretici ve öğrenim aracı bulunmaktadır. Bunun hakkında daha fazlasına [Kodlayarak Öğren](/developers/learning-tools/) bölümünden ulaşabilirsiniz.
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

Temel söz dizimi, sözleşme yaşam döngüsü, arayüzler, operatörler, veri yapıları, fonksiyonlar, kontrol akışı ve daha fazlasının karşılaştırmaları için [Auditless tarafından hazırlanan kopya kağıdına](https://reference.auditless.com/cheatsheet/) bakabilirsiniz

## Daha fazla bilgi {#further-reading}

- [OpenZeppelin'den Solidity Sözleşmeleri Kütüphanesi](https://docs.openzeppelin.com/contracts)
- [Örnekle Solidity](https://solidity-by-example.org)
