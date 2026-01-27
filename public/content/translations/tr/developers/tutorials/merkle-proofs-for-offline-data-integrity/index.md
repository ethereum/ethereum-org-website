---
title: Çevrimdışı veri bütünlüğü için Merkle ispatları
description: Çoğunlukla zincir dışında depolanan veriler için zincir üstünde veri bütünlüğünün sağlanması
author: Ori Pomerantz
tags: [ "depolama" ]
skill: advanced
lang: tr
published: 2021-12-30
---

## Giriş {#introduction}

İdeal olarak tüm verileri binlerce bilgisayarda depolanan ve son derece yüksek kullanılabilirlik (veri sansürlenemez) ve bütünlüğe (veri yetkisiz bir şekilde değiştirilemez) sahip olan Ethereum depolaması üzerinde saklamak isteriz ancak 32 bayt büyüklüğünde bir kelime depolamanın maliyeti yaklaşık olarak 20,000 gazdır. Bunu yazarken, bu maliyet $6,60'a eşittir. Bayt başına 21 sentlik ücret birçok kullanıcı için çok pahalıdır.

Bu sorunu çözmek için Ethereum ekosistemi, verileri merkeziyetsiz bir
şekilde depolamanın birçok alternatif yolunu geliştirdi. Eğer ağ müsaitse maliyet daha az olacaktır ancak ağ eğer yoğunsa maliyet daha fazla olacaktır. Ancak ağın bütünlüğü hep aynı olacaktır.

Bu makalede, [Merkle ispatlarını](https://computersciencewiki.org/index.php/Merkle_proof) kullanarak verileri blokzincirde depolamadan veri bütünlüğünün **nasıl** sağlanacağını
öğreneceksiniz.

## Nasıl çalışır? Nasıl çalışır? {#how-does-it-work}

Teorik olarak, verinin karmasını zincir üstünde depolayabilir ve tüm verileri gerektiren işlemlerde gönderebiliriz. Ancak bu hâlâ çok maliyetlidir. Bir işlem için bir bayt veri yaklaşık 16 gaz harcar. Bu, şu anda yaklaşık yarım sent veya kilobayt başına yaklaşık $5 değerindedir. Megabayt başına $5000, veriyi şifrelemenin maliyetini dahil etmesek bile bir çok kullanım alanı için çok pahalıdır.

Çözüm ise, verilerin farklı alt kümelerini art arda şifrelenmiş hâle getirmektir. Böylece göndermeniz gerekmeyen veriler için sadece bir hash değeri gönderebilirsiniz. Bunu, her düğümün altındaki düğümlerin hash değerlerinden oluştuğu bir ağaç veri yapısı olan bir Merkle ağacını kullanarak yapabilirsiniz:

![Merkle Ağacı](tree.png)

Kök karma, zincir üstünde saklanması gereken tek kısımdır. Bir değeri kanıtlamak için, o değeri oluşturan tüm hash değerlerini sağlamanız gerekmektedir. Örneğin, `C`'yi kanıtlamak için `D`, `H(A-B)` ve `H(E-H)` sağlamanız gerekir.

![C değerinin ispatı](proof-c.png)

## Uygulama {#implementation}

[Örnek koda buradan ulaşabilirsiniz](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Zincir dışı kod {#offchain-code}

Bu makalede, zincir dışı hesaplamalar için JavaScript kullanıyoruz. Çoğu merkeziyetsiz uygulama Javascript'te zincir dışı bileşenlere sahiptir.

#### Merkle kökünü oluşturma {#creating-the-merkle-root}

Öncelikle ağa, Merkle kökünü sağlamamız gerekmektedir.

```javascript
const ethers = require("ethers")
```

[Ethers paketindeki karma işlevini kullanıyoruz](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Bütünlüğünü doğrulamamız gereken ham veriler. İlk iki bayt
// bir kullanıcı tanımlayıcısıdır ve son iki bayt kullanıcının
// şu anda sahip olduğu jeton miktarıdır.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Örneğin her bir girişi 256-bit tam sayı değeri olacak şekilde kodlamak, bir JSON kullanmaktan daha az okunabilir olacaktır. Ancak bu, sözleşmedeki verilere erişmek için kayda değer ölçüde daha az işleme, dolayısıyla çok daha düşük gaz maliyetleri anlamına gelir. [JSON'u zincir üstünde okuyabilirsiniz](https://github.com/chrisdotn/jsmnSol), ancak kaçınılabilecek bir durumsa bu kötü bir fikirdir.

```javascript
// BigInts olarak karma değerleri dizisi
const hashArray = dataArray
```

Bu durumda veriler başlangıçta 256-bit değerindedir, bu yüzden herhangi bir işleme gerek yoktur. Eğer satır gibi daha karmaşık bir veri yapısı kullanıyor olsaydık, şifrelenmiş bir satır elde etmek için önce verileri şifrelediğimizden emin olmamız gerekirdi. Bunun ayrıca, kullanıcıların diğer kullanıcıların bilgilerini bilip bilmediklerini umursamamamızdan kaynaklandığını unutmayın. Aksi takdirde şifreleme yapmamız gerekecekti, böylece kullanıcı 1 kullanıcı 0'ın değerini; kullanıcı 2 kullanıcı 3'ün değerini bilmeyecekti vb.

```javascript
// Karma işlevinin beklediği dize ile
// başka her yerde kullandığımız BigInt arasında dönüştürür.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Ethers karma işlevi, `0x60A7` gibi onaltılık bir sayıya sahip bir JavaScript dizesi almayı bekler ve aynı yapıya sahip başka bir dizeyle yanıt verir. Ancak kodun geri kalanı için `BigInt` kullanmak daha kolaydır, bu yüzden onaltılık bir dizeye dönüştürüp sonra tekrar geri çeviririz.

```javascript
// Bir çiftin simetrik karması, bu sayede sıranın tersine çevrilip çevrilmediğini önemsemeyiz.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Bu işlev simetriktir (a'nın [xor](https://en.wikipedia.org/wiki/Exclusive_or) b'sinin karması). Bu, Merkle ispatını kontrol ettiğimizde, ispattaki değeri hesaplanan değerden önce mi sonra mı koyacağımız konusunda endişelenmemize gerek olmadığı anlamına gelir. Merkle ispatı kontrolü zincir üstünde yapılır, bu yüzden orada ne kadar az şey yapmamız gerekirse o kadar iyidir.

Uyarı:
Kriptografi göründüğünden daha zordur.
Bu makalenin ilk versiyonunda `hash(a^b)` karma işlevi vardı.
Bu **kötü** bir fikirdi çünkü `a` ve `b`'nin meşru değerlerini biliyorsanız, istenen herhangi bir `a'` değerini kanıtlamak için `b' = a^b^a'` kullanabileceğiniz anlamına geliyordu.
Bu işlevle, `hash(a') ^ hash(b')` değerinin bilinen bir değere (köke giden yoldaki bir sonraki dal) eşit olacak şekilde `b'` değerini hesaplamanız gerekir, ki bu çok daha zordur.

```javascript
// Belirli bir dalın boş olduğunu, bir değere sahip olmadığını
// belirtmek için kullanılan değer
const empty = 0n
```

Değerler ikinin katı tam sayılar olmadığında bunun yerine boş dalları işlememiz gerekir. Program bunu yapmak için boş dallara varsayılan değer olarak 0 atar.

![Eksik dalları olan Merkle ağacı](merkle-empty-hash.png)

```javascript
// Her bir çiftin karmasını sırayla alarak bir karma dizisi ağacında
// bir seviye yukarı hesaplar
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Girdinin üzerine yazmayı önlemek için // Gerekirse boş bir değer ekleyin (tüm yaprakların eşleştirilmesi gerekir)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Bu fonksiyon, güncel katmandaki değer çiftlerini karma hâle getirerek bir üst seviyeye "tırmanır". Bunun en verimli uygulama olmadığını, girdiyi kopyalamaktan kaçınıp döngüde uygun olduğunda `hashEmpty` ekleyebileceğimizi, ancak bu kodun okunabilirlik için optimize edildiğini unutmayın.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Ağaçta tek bir değer kalana kadar yukarı tırmanır, bu // köktür. // // Eğer bir katmanın tek sayıda girdisi varsa // oneLevelUp'daki kod boş bir değer ekler, yani örneğin // 10 yaprağımız varsa, ikinci katmanda 5 dal, // üçüncüde 3, dördüncüde 2 dal olur ve kök beşincidir

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Ana değere ulaşmak için ağaçta tek bir değer kalana kadar tırmanın.

#### Merkle ispatı oluşturma {#creating-a-merkle-proof}

Bir Merkle ispatı, Merkle kökünü geri almak için kanıtlanan değerle birlikte karma hale getirilecek değerlerdir. İspatlanacak olan değer sıklıkla diğer veride bulunabilir. Bu yüzden kodun bir parçası yerine ayrı olarak sağlamayı tercih ederim.

```javascript
// Bir merkle ispatı, birlikte karma alınacak giriş listesinin // değerinden oluşur. // Simetrik bir karma işlevi kullandığımız için, ispatı doğrulamak için öğenin konumuna ihtiyacımız // yoktur, yalnızca oluşturmak için gerekir
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Zirveye ulaşana kadar
    while (currentLayer.length > 1) {
        // Tek uzunluklu katmanlar olamaz
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Eğer currentN tekse, ispata ondan önceki değeri ekleyin
            ? currentLayer[currentN-1]
               // Çiftse, sonraki değeri ekleyin
            : currentLayer[currentN+1])

```

`(v[0],v[1])`, `(v[2],v[3])` vb. şeklinde karma alırız. Yani çift değerler için bir sonrakine, tek değerler için bir öncekine ihtiyacımız vardır.

```javascript
        // Bir üst katmana geç
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Zincir üstü kod {#onchain-code}

Nihayet, kanıtları kontrol eden koda ulaştık. Zincir üstü kod [Solidity](https://docs.soliditylang.org/en/v0.8.11/) ile yazılmıştır. Gaz maliyeti yüksek olduğundan burada optimizasyon çok daha önemlidir.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Bunu, geliştirme yaparken [Solidity'den konsol çıktısı almamızı](https://hardhat.org/docs/cookbook/debug-logs) sağlayan [Hardhat geliştirme ortamını](https://hardhat.org/) kullanarak yazdım.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Son derece güvensiz, üretim kodunda bu işleve
    // erişim MUTLAKA sıkı bir şekilde sınırlandırılmalı, muhtemelen bir
    // sahip (owner) tarafından
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Merkle kökü için ayarlama ve getirme fonksiyonları. Bir üretim sisteminde herkesin Merkle kökünü güncellemesine izin vermek _son derece kötü bir fikirdir_. Örnek kodu basitleştirmek adına bunu burada yapıyorum. **Veri bütünlüğünün gerçekten önemli olduğu bir sistemde bunu yapmayın**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Bu fonksiyon bir eş karma değeri oluşturur. Bu sadece `hash` ve `pairHash` için JavaScript kodunun Solidity çevirisidir.

**Not:** Burada da okunabilirlik için optimizasyon yapılmıştır. [İşlev tanımına](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) dayanarak, verileri bir [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) değeri olarak depolamak ve dönüşümlerden kaçınmak mümkün olabilir.

```solidity
    // Bir Merkle ispatını doğrulayın
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

Matematiksel gösterimde Merkle ispatı doğrulaması şöyle görünür: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))\`. Bu kod onu uygular.

## Merkle ispatları ve toplamalar birbiriyle uyuşmaz {#merkle-proofs-and-rollups}

Merkle ispatları [toplamalarla](/developers/docs/scaling/#rollups) iyi çalışmaz. Sebebi ise toplamalarda işlemlerin Katman 1 üzerinde yazılması ancak Katman 2 üzerinde işlenmesidir. Bir işlem ile Merkle ispatı göndermenin maliyeti katman başına ortalama 638 gazdır (güncel olarak çağrı verisinde gaz maliyeti, bayt sıfır değilse 16, sıfır ise 4'tür). Eğer 1024 kelimeden oluşan bir verimiz varsa, bir Merkle ispatı 10 katman veya 6380 gaz gerektirir.

Örneğin [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)'e bakıldığında, L1'e yazmanın gaz maliyeti yaklaşık 100 gwei, L2'nin gaz maliyeti ise 0,001 gwei'dir (bu normal fiyattır ve tıkanıklık durumunda artabilir). Yani bir Katman 1 gazının bedeli ile Katman 2 işlemeye yüz bin gaz harcayabiliriz. Depolamanın üzerine yazmadığımızı varsayarsak bu, bir Katman 1 gazı fiyatına Katman 2'deki depolamaya yaklaşık beş kelime yazabileceğimiz anlamına gelir. Tek bir Merkle ispatı için, 1024 kelimenin tamamını depolamaya yazabilir (başlangıçta bir işlemde sağlanmak yerine zincir üstünde hesaplanabildiklerini varsayarsak) ve yine de gazın çoğu artmış olur.

## Sonuç {#conclusion}

Gerçek hayatta, Merkle ağaçlarını hiçbir zaman kendi başınıza uygulamayacak olabilirsiniz. Denetlenmiş ve iyi bilinen kütüphaneler mevcuttur. Genel olarak kendi başınıza ilkel kriptografik yöntemleri uygulamamanız en iyi seçimdir. Fakat Merkle ispatlarını ve ne zaman kullanmaya değer olduklarını umarım daha iyi anlamışsınızdır.

Merkle ispatlarının _bütünlüğü_ korurken _kullanılabilirliği_ korumadığını unutmayın. Veri deposuna erişim yoksa ve onlara erişmek için bir Merkle ağacı oluşturamıyorsanız, varlıklarınızı başka kimsenin alamayacağını bilmek küçük bir teselli olur. Yani en iyisi Merkle ağaçlarının IPFS gibi bir merkeziyetsiz depolama ile kullanılmasıdır.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).
