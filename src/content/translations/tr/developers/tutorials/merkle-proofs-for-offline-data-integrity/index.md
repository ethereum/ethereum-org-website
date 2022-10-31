---
title: Çevrimdışı veri bütünlüğü için Merkle ispatları
description: Genellikle zincir dışında saklanan verilerin zincir üstündeki veri bütünlüğünü sağlamak
author: Ori Pomerantz
tags:
  - "merkle"
  - "bütünlük"
  - "depolama"
skill: advanced
lang: tr
published: 2021-12-30
---

## Giriş {#introduction}

İdeal olarak tüm verileri binlerce bilgisayarda depolanan ve son derece yüksek kullanılabilirlik (veri sansürlenemez) ve bütünlüğe (veri yetkisiz bir şekilde değiştirilemez) sahip olan Ethereum depolaması üzerinde saklamak isteriz ancak 32 bayt büyüklüğünde bir kelime depolamanın maliyeti yaklaşık olarak 20,000 gazdır. Bunu yazarken, bu maliyet $6,60'a eşittir. Bayt başına 21 sentlik ücret birçok kullanıcı için çok pahalıdır.

Bu sorunu çözmek için Ethereum ekosistemi [verileri merkeziyetsiz bir şekilde depolamak için birçok alternatif yol](/developers/docs/storage/) geliştirdi. Eğer ağ müsaitse maliyet daha az olacaktır ancak ağ eğer yoğunsa maliyet daha fazla olacaktır. Ancak ağın bütünlüğü hep aynı olacaktır.

Bu makalede blok zinciri üzerinde veri depolamadan [Merkle ispatları](https://computersciencewiki.org/index.php/Merkle_proof) kullanarak **nasıl** veri bütünlüğü sağlanacağını öğreneceksiniz.

## Nasıl çalışır? {#how-does-it-work}

Teoride verileri şifrelenmiş bir şeklide blok zinciri üzerinde tutup, işlem için gerekli verileri gönderebilirdik. Ancak bu hâlâ çok maliyetlidir. Bir işlem için bir bayt veri yaklaşık 16 gaz harcar. Bu, şu anda yaklaşık yarım sent veya kilobayt başına yaklaşık $5 değerindedir. Megabayt başına $5000, veriyi şifrelemenin maliyetini dahil etmesek bile bir çok kullanım alanı için çok pahalıdır.

Çözüm ise, verilerin farklı alt kümelerini art arda şifrelenmiş hâle getirmektir. Böylece göndermeniz gerekmeyen veriler için sadece bir hash değeri gönderebilirsiniz. Bunu, her düğümün altındaki düğümlerin hash değerlerinden oluştuğu bir ağaç veri yapısı olan bir Merkle ağacını kullanarak yapabilirsiniz:

![Merkle Ağacı](tree.png)

Sadece kök hash değerinin ağ üzerinde depolanmış olması gerekmektedir. Bir değeri kanıtlamak için, o değeri oluşturan tüm hash değerlerini sağlamanız gerekmektedir. Örneğin `C`'yi kanıtlamak için `D`, `H(A-B)` ve `H(E-H)` sağlamak zorundasınız.

![C değerinin ispatı](proof-c.png)

## Uygulama {#implementation}

[Örnek kod burada sağlanmıştır](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Zincir dışı kod {#off-chain-code}

Bu makalede zincir dışı işlemler için JavaScript kullanıyoruz. Çoğu merkeziyetsiz uygulama JavaScript'te zincir dışı bileşenlere sahiptir.

#### Merkle kökünü oluşturma {#creating-the-merkle-root}

Öncelikle ağa, Merkle kökünü sağlamamız gerekmektedir.

```javascript
const ethers = require("ethers")
```

[Ethers paketindeki hash fonksiyonunu kullanıyoruz](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Örneğin her bir girişi 256-bit tam sayı değeri olacak şekilde kodlamak, bir JSON kullanmaktan daha az okunabilir olacaktır. Ancak bu, sözleşmedeki verilere erişmek için kayda değer ölçüde daha az işleme, dolayısıyla çok daha düşük gaz maliyetleri anlamına gelir. [JSON'u blok zinciri üzerinde okuyabilirsiniz](https://github.com/chrisdotn/jsmnSol) ancak bunu yapmak zorunda değilseniz kötü bir fikirdir.

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

Bu durumda veriler başlangıçta 256-bit değerindedir, bu yüzden herhangi bir işleme gerek yoktur. Eğer satır gibi daha karmaşık bir veri yapısı kullanıyor olsaydık, şifrelenmiş bir satır elde etmek için önce verileri şifrelediğimizden emin olmamız gerekirdi. Bunun ayrıca, kullanıcıların diğer kullanıcıların bilgilerini bilip bilmediklerini umursamamamızdan kaynaklandığını unutmayın. Aksi takdirde şifreleme yapmamız gerekecekti, böylece kullanıcı 1 kullanıcı 0'ın değerini; kullanıcı 2 kullanıcı 3'ün değerini bilmeyecekti vb.

```javascript
const pairHash = (a, b) =>
  BigInt(ethers.utils.keccak256("0x" + (a ^ b).toString(16).padStart(64, 0)))
```

Ethers hash fonksiyonu, `0x60A7` gibi onaltılık bir sayıya sahip bir JavaScript dizesi almayı bekler ve aynı yapıya sahip başka bir dizeyle yanıt verir. Ancak kodun geri kalanı için `BigInt` kullanmak daha kolaydır. Bu yüzden onu onaltılık bir dizeye ve geri eski hâline dönüştürürüz.

Bu fonksiyon simetriktir ([xor](https://en.wikipedia.org/wiki/Exclusive_or) b'nin hash değeri). Bu, Merkle ispatını kontrol ettiğimizde, ispattaki değeri hesaplanan değerden önce mi sonra mı koyacağımız konusunda endişelenmemize gerek olmadığı anlamına gelir. Merkel ispatı kontrolü zincir üstünde gerçekleşir, orada ne kadar az kod kullanırsak o kadar iyi.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

Değerler tamsayı olmadığında bunun yerine boş dalları işlememiz gerekir. Program bunu yapmak için boş dallara varsayılan değer olarak 0 atar.

![Dalları eksik olan Merkle ağacı](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of
// each pair in sequence
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input

  // Add an empty value if necessary (we need all the leaves to be
  // paired)
  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Bu fonksiyon güncel katmandaki verileri hash hâline getirerek bir üst seviyeye tırmanır. Bunun en verimli uygulama olmadığını unutmayın, girdiyi kopyalamaktan kaçınabilir ve uygun olduğunda döngüye `hashEmpty` ekleyebilirdik, ancak bu kod okunabilirlik için optimize edilmiştir.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray]

  // Climb up the tree until there is only one value, that is the
  // root.
  //
  // If a layer has an odd number of entries the
  // code in oneLevelUp adds an empty value, so if we have, for example,
  // 10 leaves we'll have 5 branches in the second layer, 3
  // branches in the third, 2 in the fourth and the root is the fifth
  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Ana değere ulaşmak için ağaçta tek bir değer kalana kadar tırmanırız.

#### Bir Merkle ispatı oluşturma {#creating-a-merkle-proof}

Bir Merkle ispatı, Merkle kökünü geri almak için kanıtlanan değerle birlikte hash edilecek değerlerdir. İspatlanacak olan değer sıklıkla diğer veride bulunabilir. Bu yüzden kodun bir parçası yerine ayrı olarak sağlamayı tercih ederim.

```javascript
// A merkle proof consists of the value of the list of entries to
// hash with. Because we use a symmetrical hash function, we don't
// need the item's location to verify the proof, only to create it
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof
            ? currentLayer[currentN-1]
               // If it is even, add the value after it
            : currentLayer[currentN+1])

```

`(v[0],v[1])`, `(v[2],v[3])` vb. şeklinde hash ederiz. Yani çift değerler için bir sonrakine, tek değerler için bir öncekine ihtiyacımız var.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Zincir üstü kod {#off-chain-code}

Nihayet ispatları kontrol eden koda ulaştık. Zincir üstü kod, [Solidity](https://docs.soliditylang.org/en/v0.8.11/) ile yazılmıştır. Gaz maliyeti yüksek olduğundan burada optimizasyon çok daha önemlidir.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Bunu, [Hardhat geliştirme ortamını kullanarak yazdım](https://hardhat.org/). Bu, geliştirme yaparken [Solidity'den konsol çıktısına](https://hardhat.org/tutorial/debugging-with-hardhat-network.html) sahip olmamızı sağlar.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Merkle kökünü ayarlamak ve getirmek için fonksiyonlar. Bir üretim sisteminde herkesin Merkle kökünü güncellemesine izin vermek _son derece kötü bir fikirdir_. Örnek kodu basitleştirmek adına bunu burada yapıyorum. **Veri bütünlüğünün önemli olduğu bir sistemde bunu yapmayın**.

```solidity
    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a ^ _b)));
    }
```

Bu fonksiyon bir eş hash değeri oluşturur. Bu yalnızca JavaScript'teki `pairHash` kodunun Solidity'e uyarlamasıdır.

**Not:** Burada da okunabilirlik için optimizasyon yapılmıştır. [Fonksiyon tanımına](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) dayanarak; [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) olarak veriyi depolamak ve dönüşümleri önlemek mümkün olabilir.

```solidity
    // Verify a Merkle proof
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

Matematiksel gösterimde Merkle ispatı şöyle görünür: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Bu kod onu uygular.

## Merkle ispatları ve toplamalar uyumlu değildir {#merkle-proofs-and-rollups}

Merkle ispatları, [toplamalar](/developers/docs/scaling/#rollups) ile düzgün çalışmaz. Sebebi ise toplamalarda işlemlerin Katman 1 üzerinde yazılması ancak Katman 2 üzerinde işlenmesidir. Bir işlem ile Merkle ispatı göndermenin maliyeti katman başına ortalama 638 gazdır (güncel olarak çağrı verisinde gaz maliyeti, bayt sıfır değilse 16, sıfır ise 4'tür). Eğer 1024 kelimeden oluşan bir verimiz varsa, bir Merkle ispatı 10 katman veya 6380 gaz gerektirir.

Örneğin [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)'e bakacak olursak: Katman 1 gaz yazmak ortalama 100 gwei, Katman 2 gaz yazmak ise 0,001 gwei'ye mal olmaktadır (bu, normal fiyattır ve tıkanıklık olursa artabilir). Yani bir Katman 1 gazının bedeli ile Katman 2 işlemeye yüz bin gaz harcayabiliriz. Depolamanın üzerine yazmadığımızı varsayarsak bu, bir Katman 1 gazı fiyatına Katman 2'deki depolamaya yaklaşık beş kelime yazabileceğimiz anlamına gelir. Tek bir Merkle ispatı için, 1024 kelimenin tamamını depolamaya yazabiliriz (bir işlemde sağlanmak yerine zincir üzerinde hesaplayabileceklerini varsayarsak) ve hâlâ gaz maliyetinden tasarruf etme imkanımız olur.

## Sonuç {#conclusion}

Gerçek hayatta, Merkle ağaçlarını asla kendi başınıza uygulamayacak olabilirsiniz. Denetlenmiş ve iyi bilinen kütüphaneler mevcuttur. Genel olarak kendi başınıza ilkel kriptografik yöntemleri uygulamamanız en iyi seçimdir. Ama umarım Merkle ispatlarını ve ne zaman kullanmaya değer olduğunu daha iyi anlamışsınızdır.

Merkle ispatlarının, _bütünlüğü_ korurken _kullanılabilirlikten_ ödün verdiğini unutmayın. Veri deposuna erişim yoksa ve onlara erişmek için bir Merkle ağacı oluşturamıyorsanız, varlıklarınızı başka kimsenin alamayacağını bilmek küçük bir teselli olur. Yani en iyisi Merkle ağaçlarının IPFS gibi bir merkeziyetsiz depolama ile kullanılmasıdır.
