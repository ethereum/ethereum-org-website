---
title: "Çevrim dışı veri bütünlüğü için Merkle kanıtları"
description: "Çoğunlukla zincir dışı depolanan veriler için zincir içi veri bütünlüğünü sağlama"
author: Ori Pomerantz
tags:
  - depolama
skill: advanced
breadcrumb: "Merkle kanıtları"
lang: tr
published: 2021-12-30
---

## Giriş {#introduction}

İdeal olarak her şeyi, binlerce bilgisayarda depolanan ve son derece yüksek erişilebilirliğe (veri sansürlenemez) ve bütünlüğe (veri yetkisiz bir şekilde değiştirilemez) sahip olan Ethereum depolamasında saklamak isteriz, ancak 32 baytlık bir kelimeyi depolamak genellikle 20.000 Gaz'a mal olur. Bunu yazarken, bu maliyet 6,60 dolara eşdeğer. Bayt başına 21 sent ile bu, birçok kullanım için çok pahalıdır.

Bu sorunu çözmek için Ethereum ekosistemi, [verileri merkeziyetsiz bir şekilde depolamak için birçok alternatif yol](/developers/docs/storage/) geliştirdi. Genellikle erişilebilirlik ve fiyat arasında bir ödünleşim içerirler. Ancak, bütünlük genellikle garanti edilir.

Bu makalede, [Merkle kanıtlarını](https://computersciencewiki.org/index.php/Merkle_proof) kullanarak verileri Blokzincir üzerinde depolamadan veri bütünlüğünü **nasıl** sağlayacağınızı öğreneceksiniz.

## Nasıl çalışır? {#how-does-it-work}

Teoride, verinin hash'ini zincir içi depolayabilir ve tüm veriyi bunu gerektiren işlemlerde gönderebiliriz. Ancak bu hala çok pahalıdır. Bir işleme bir bayt veri eklemek yaklaşık 16 Gaz'a, yani şu anda yaklaşık yarım sente veya kilobayt başına yaklaşık 5 dolara mal olur. Megabayt başına 5000 dolar ile bu, veriyi hashleme ek maliyeti olmasa bile birçok kullanım için hala çok pahalıdır.

Çözüm, verinin farklı alt kümelerini tekrar tekrar hashlemektir, böylece göndermeniz gerekmeyen veriler için sadece bir hash gönderebilirsiniz. Bunu, her bir Düğümün altındaki düğümlerin bir hash'i olduğu bir ağaç veri yapısı olan bir Merkle ağacı kullanarak yaparsınız:

![Merkle Tree](tree.png)

Kök hash, zincir içi depolanması gereken tek kısımdır. Belirli bir değeri kanıtlamak için, kökü elde etmek üzere onunla birleştirilmesi gereken tüm hash'leri sağlarsınız. Örneğin, `C` değerini kanıtlamak için `D`, `H(A-B)` ve `H(E-H)` sağlarsınız.

![Proof of the value of C](proof-c.png)

## Uygulama {#implementation}

[Örnek kod burada sağlanmıştır](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Zincir dışı kod {#offchain-code}

Bu makalede zincir dışı hesaplamalar için JavaScript kullanıyoruz. Çoğu merkeziyetsiz uygulamanın zincir dışı bileşeni JavaScript'tedir.

#### Merkle kökünü oluşturma {#creating-the-merkle-root}

İlk olarak Merkle kökünü Zincire sağlamamız gerekiyor.

```javascript
const ethers = require("ethers")
```

[ethers paketindeki hash fonksiyonunu kullanıyoruz](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Bütünlüğünü doğrulamamız gereken ham veri. İlk iki bayt bir
// kullanıcı tanımlayıcısıdır ve son iki bayt ise kullanıcının
// şu anda sahip olduğu token miktarıdır.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Her bir girdiyi tek bir 256 bitlik tam sayıya kodlamak, örneğin JSON kullanmaktan daha az okunabilir bir kodla sonuçlanır. Ancak bu, Sözleşmedeki verileri almak için önemli ölçüde daha az işlem yapılması ve dolayısıyla çok daha düşük Gaz maliyetleri anlamına gelir. [JSON'u zincir içi okuyabilirsiniz](https://github.com/chrisdotn/jsmnSol), ancak kaçınılabiliyorsa bu sadece kötü bir fikirdir.

```javascript
// BigInt'ler olarak hash değerleri dizisi
const hashArray = dataArray
```

Bu durumda verilerimiz başlangıçta 256 bitlik değerlerdir, bu nedenle hiçbir işleme gerek yoktur. Dizeler gibi daha karmaşık bir veri yapısı kullanırsak, bir hash dizisi elde etmek için önce verileri hashlediğimizden emin olmalıyız. Bunun aynı zamanda kullanıcıların diğer kullanıcıların bilgilerini bilip bilmemesini umursamadığımız için olduğunu unutmayın. Aksi takdirde, kullanıcı 1'in kullanıcı 0'ın değerini, kullanıcı 2'nin kullanıcı 3'ün değerini vb. bilmemesi için hashleme yapmamız gerekirdi.

```javascript
// hash fonksiyonunun beklediği dize ile
// başka her yerde kullandığımız BigInt arasında dönüştürün.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

ethers hash fonksiyonu, `0x60A7` gibi onaltılık bir sayı içeren bir JavaScript dizesi almayı bekler ve aynı yapıya sahip başka bir dizeyle yanıt verir. Ancak, kodun geri kalanı için `BigInt` kullanmak daha kolaydır, bu nedenle onaltılık bir dizeye dönüştürüp tekrar geri alıyoruz.

```javascript
// Bir çiftin simetrik hash'i, böylece sıranın tersine çevrilip çevrilmediğini umursamayacağız.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Bu fonksiyon simetriktir (a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b'nin hash'i). Bu, Merkle kanıtını kontrol ettiğimizde, kanıttan gelen değeri hesaplanan değerden önce mi yoksa sonra mı koyacağımız konusunda endişelenmemize gerek olmadığı anlamına gelir. Merkle kanıtı kontrolü zincir içi yapılır, bu nedenle orada ne kadar az şey yapmamız gerekirse o kadar iyidir.

Uyarı:
Kriptografi göründüğünden daha zordur.
Bu makalenin ilk sürümünde `hash(a^b)` hash fonksiyonu vardı.
Bu **kötü** bir fikirdi çünkü `a` ve `b`'nin meşru değerlerini biliyorsanız, istediğiniz herhangi bir `a'` değerini kanıtlamak için `b' = a^b^a'` kullanabileceğiniz anlamına geliyordu.
Bu fonksiyonla, `hash(a') ^ hash(b')` bilinen bir değere (köke giden yoldaki bir sonraki dal) eşit olacak şekilde `b'` hesaplamanız gerekirdi ki bu çok daha zordur.

```javascript
// Belirli bir dalın boş olduğunu, bir değere sahip
// olmadığını belirten değer
const empty = 0n
```

Değerlerin sayısı ikinin tam sayı kuvveti olmadığında boş dalları işlememiz gerekir. Bu programın bunu yapma şekli, yer tutucu olarak sıfır koymaktır.

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Bir hash dizisinin ağacında bir seviye yukarıyı, sırayla
// her bir çiftin hash'ini alarak hesaplayın
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Girdinin üzerine yazmaktan kaçınmak için // Gerekirse boş bir değer ekleyin (tüm yaprakların // eşleştirilmesi gerekir)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Bu fonksiyon, mevcut katmandaki değer çiftlerini hashleyerek Merkle ağacında bir seviye "tırmanır". Bunun en verimli uygulama olmadığını unutmayın, girdiyi kopyalamaktan kaçınabilir ve döngüde uygun olduğunda sadece `hashEmpty` ekleyebilirdik, ancak bu kod okunabilirlik için optimize edilmiştir.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Sadece bir değer kalana kadar ağaçta yukarı tırmanın, bu // köktür. // // Eğer bir katman tek sayıda girdiye sahipse // oneLevelUp içindeki kod boş bir değer ekler, bu yüzden örneğin // 10 yaprağımız varsa ikinci katmanda 5 dalımız, üçüncü katmanda 3 // dalımız, dördüncü katmanda 2 dalımız olur ve kök beşincidir

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Kökü elde etmek için, geriye sadece bir değer kalana kadar tırmanın.

#### Bir Merkle kanıtı oluşturma {#creating-a-merkle-proof}

Bir Merkle kanıtı, Merkle kökünü geri elde etmek için kanıtlanan değerle birlikte hashlenecek değerlerdir. Kanıtlanacak değer genellikle diğer verilerden elde edilebilir, bu nedenle onu kodun bir parçası olarak değil, ayrı olarak sağlamayı tercih ederim.

```javascript
// Bir Merkle kanıtı, birlikte hash'lenecek girdiler listesinin
// değerinden oluşur. Simetrik bir hash fonksiyonu kullandığımız için,
// kanıtı doğrulamak için öğenin konumuna ihtiyacımız yoktur, sadece onu oluşturmak için gerekir
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // En üste ulaşana kadar
    while (currentLayer.length > 1) {
        // Tek uzunluklu katmanlar yok
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Eğer currentN tek ise, ondan önceki değerle birlikte kanıta ekleyin
            ? currentLayer[currentN-1]
               // Eğer çift ise, ondan sonraki değeri ekleyin
            : currentLayer[currentN+1])

```

`(v[0],v[1])`, `(v[2],v[3])` vb. hashliyoruz. Bu yüzden çift değerler için bir sonrakine, tek değerler için bir öncekine ihtiyacımız var.

```javascript
        // Bir üst katmana geçin
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Zincir içi kod {#onchain-code}

Son olarak kanıtı kontrol eden kodumuz var. Zincir içi kod [Solidity](https://docs.soliditylang.org/en/v0.8.11/) ile yazılmıştır. Gaz nispeten pahalı olduğu için optimizasyon burada çok daha önemlidir.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Bunu, geliştirme sırasında [Solidity'den konsol çıktısı](https://hardhat.org/docs/cookbook/debug-logs) almamızı sağlayan [Hardhat geliştirme ortamını](https://hardhat.org/) kullanarak yazdım.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Son derece güvensiz, üretim kodunda bu fonksiyona
    // erişim KESİNLİKLE sınırlandırılmalıdır, muhtemelen bir
    // sahibe
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Merkle kökü için ayarlama (set) ve alma (get) fonksiyonları. Herkesin Merkle kökünü güncellemesine izin vermek, bir üretim sisteminde _son derece kötü bir fikirdir_. Bunu burada örnek kod için basitlik adına yapıyorum. **Veri bütünlüğünün gerçekten önemli olduğu bir sistemde bunu yapmayın**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Bu fonksiyon bir çift hash'i üretir. Sadece `hash` ve `pairHash` için JavaScript kodunun Solidity çevirisidir.

**Not:** Bu, okunabilirlik için optimizasyonun başka bir durumudur. [Fonksiyon tanımına](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) dayanarak, verileri bir [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) değeri olarak depolamak ve dönüştürmelerden kaçınmak mümkün olabilir.

```solidity
    // Bir Merkle kanıtını doğrulayın
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

Matematiksel gösterimde Merkle kanıtı doğrulaması şu şekilde görünür: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Bu kod bunu uygular.

## Merkle kanıtları ve toplamalar birbirine uymaz {#merkle-proofs-and-rollups}

Merkle kanıtları [toplamalar](/developers/docs/scaling/#rollups) ile iyi çalışmaz. Bunun nedeni, toplamaların tüm işlem verilerini katman 1 (l1) üzerine yazması, ancak katman 2 (l2) üzerinde işlemesidir. Bir işlemle birlikte bir Merkle kanıtı göndermenin maliyeti katman başına ortalama 638 Gaz'dır (şu anda çağrı verisindeki bir bayt sıfır değilse 16 Gaz'a, sıfırsa 4 Gaz'a mal olur). 1024 kelimelik verimiz varsa, bir Merkle kanıtı on katman veya toplam 6380 Gaz gerektirir.

Örneğin [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)'e bakıldığında, l1 Gazı yazmak yaklaşık 100 Gwei'ye ve l2 Gazı 0,001 Gwei'ye mal olur (bu normal fiyattır, yoğunlukla birlikte artabilir). Yani bir l1 Gazı maliyetine l2 işlemede yüz bin Gaz harcayabiliriz. Depolamanın üzerine yazmadığımızı varsayarsak, bu, bir l1 Gazı fiyatına l2'de depolamaya yaklaşık beş kelime yazabileceğimiz anlamına gelir. Tek bir Merkle kanıtı için tüm 1024 kelimeyi depolamaya yazabiliriz (bir işlemde sağlanmak yerine başlangıçta zincir içi hesaplanabildiklerini varsayarak) ve yine de Gazın çoğunu artırabiliriz.

## Sonuç {#conclusion}

Gerçek hayatta Merkle ağaçlarını asla kendi başınıza uygulamayabilirsiniz. Kullanabileceğiniz iyi bilinen ve denetlenmiş kütüphaneler vardır ve genel olarak konuşmak gerekirse kriptografik ilkelleri kendi başınıza uygulamamak en iyisidir. Ancak umarım artık Merkle kanıtlarını daha iyi anlıyorsunuzdur ve ne zaman kullanmaya değer olduklarına karar verebilirsiniz.

Merkle kanıtlarının _bütünlüğü_ korurken _erişilebilirliği_ korumadığını unutmayın. Veri depolama birimi erişime izin vermemeye karar verirse ve onlara erişmek için bir Merkle ağacı da oluşturamazsanız, varlıklarınızı başka hiç kimsenin alamayacağını bilmek küçük bir tesellidir. Bu nedenle Merkle ağaçları en iyi IPFS gibi bir tür merkeziyetsiz depolama ile kullanılır.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).