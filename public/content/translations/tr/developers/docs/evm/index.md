---
title: Ethereum Sanal Makinesi (EVM)
description: Ethereum Sanal Makinesine (EVM) ve EVM'nin durum, işlem ve akıllı sözleşmelerle olan ilgisine dair bir giriş.
lang: tr
---

Ethereum Sanal Makinesi (EVM), tüm ethereum düğümlerinde kodu sürekli ve güvenli bir şekilde çalıştıran merkeziyetsiz bir sanal ortamdır. Düğümler, [işlemler](/developers/docs/evm/opcodes/) için gereken bilişim eforunu ölçmek amacıyla "[gaz](/gas/)" kullanarak akıllı sözleşmeleri yürütmek için EVM'yi çalıştırır, böylece kaynaklar verimli şekilde paylaştırılır ve ağ güvenliği sağlanır.

## Ön koşullar {#prerequisites}

[Bayt](https://wikipedia.org/wiki/Byte), [bellek](https://wikipedia.org/wiki/Computer_memory) ve [yığın](https://wikipedia.org/wiki/Stack_(abstract_data_type)) gibi bilgisayar bilimlerindeki yaygın terminolojiyi temel seviyede kavramak, EVM'yi anlamak için zorunludur. Ayrıca [karmafonksiyonları](https://wikipedia.org/wiki/Cryptographic_hash_function) ve [Merkleağaçları](https://wikipedia.org/wiki/Merkle_tree) gibi kriptografi/blok zincir konseptlerini bilmek faydalı olur.

## Defterden durum makinesine {#from-ledger-to-state-machine}

“Dağıtılmış defter” analojisi, genellikle temel kriptografi araçlarını kullanarak merkeziyetsiz bir para birimini mümkün kılan Bitcoin gibi blok zincirlerini tanımlamak için kullanılır. Defter, bir kişinin defteri değiştirmek için neler yapıp yapamayacağını düzenleyen kurallara uyması gereken bir faaliyet kaydı tutar. Örneğin, bir Bitcoin adresi daha önce aldığından daha fazla Bitcoin harcayamaz. Bu kurallar, Bitcoin ve diğer birçok blok zincirindeki tüm işlemlerin temelini oluşturur.

Ethereum'un neredeyse tamamen aynı sezgisel kuralları takip eden kendi yerel kripto parası (Ether) olsa da, Ethereum çok daha güçlü bir fonksiyonu da mümkün kılar: [akıllı sözleşmeler](/developers/docs/smart-contracts/). Bu daha karmaşık olan özellik için daha karmaşık bir analoji gerekir. Ethereum, dağıtılmış bir defter değil de dağıtılmış bir [durum makinesidir](https://wikipedia.org/wiki/Finite-state_machine). Ethereum'un durumu, yalnızca tüm hesapları ve bakiyeleri değil, aynı zamanda önceden tanımlanmış bir dizi kurala göre bloktan bloğa değişebilen ve isteğe bağlı makine kodunu çalıştırabilen _makine durumunu_ tutan büyük bir veri yapısıdır. Durumu bloktan bloğa değiştirmenin özel kuralları EVM tarafından tanımlanır.

![EVM'nin oluşumunu gösteren bir diyagram](./evm.png) _Diyagram [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

## Ethereum durum geçiş fonksiyonu {#the-ethereum-state-transition-function}

EVM, matematiksel bir fonksiyon gibi davranır: Bir girdi verildiğinde, deterministik bir çıktı üretir. Bu nedenle, Ethereum'u bir **durum geçiş fonksiyonuna** sahip olarak daha belirgin bir şekilde tanımlamak oldukça yararlıdır:

```
Y(S, T)= S'
```

Eski `(S)` geçerli durum ve yeni `(T)` geçerli işlem grubu ele alındığında, Ethereum `Y(S, T)` durum geçiş fonksiyonu, yeni `S'` geçerli çıktı durumu üretir

### Durum {#state}

Ethereum bağlamında durum, tüm [hesapları](/developers/docs/accounts/) hash değerleri ile bağlı tutabilen ve blok zincirinde saklanan tek bir kök hash değerine indirgenebilir hâle getirebilen [değiştirilmiş Merkle Patricia Ağacı](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) adlı devasa bir veri yapısıdır.

### İşlemler {#transactions}

İşlemler, hesaplardan gelen kriptografik olarak imzalanmış talimatlardır. İki tür işlem vardır: mesaj çağrılarıyla sonuçlananlar ve sözleşme oluşturulmasıyla sonuçlananlar.

Sözleşme oluşturma, derlenmiş [akıllı sözleşme](/developers/docs/smart-contracts/anatomy/) bayt kodunu içeren yeni bir sözleşme hesabının oluşturulmasıyla sonuçlanır. Başka bir hesap o sözleşmeye mesaj çağrısı yaptığında, sözleşme kendi bayt kodunu yürütür.

## EVM talimatları {#evm-instructions}

EVM, 1024 öğe derinliğinde bir [yığın makinesi](https://wikipedia.org/wiki/Stack_machine) olarak çalışır. Her öğe, 256 bitlik kriptografi (Keccak-256 hash'leri veya secp256k1 imzaları gibi) ile kullanım kolaylığı sağlamak için seçilmiş 256 bitlik bir kelimedir.

Yürütme sırasında EVM, işlemler arasında varlığını sürdürmeyen geçici bir _bellek_ (kelime adresli bayt dizisi olarak) tutar.

Ancak sözleşmeler, söz konusu hesap ve küresel durumun bir parçası ile ilişkili bir Merkle Patricia _depolama_ ağacı (kelime adreslenebilir bir kelime dizisi olarak) içerir.

Derlenmiş akıllı sözleşme bayt kodu, `XOR`, `AND`, `ADD`, `SUB` vb. gibi standart yığın işlemleri gerçekleştiren bir dizi EVM [işlem kodları](/developers/docs/evm/opcodes) olarak yürütülür. EVM ayrıca, `ADDRESS`, `BALANCE`, `BLOCKHASH` vb. gibi blok zincirine özgü bir dizi yığın işlemi uygular.

![EVM operasyonlarında gazın nerede gerekli olduğunu gösteren bir diyagram](../gas/gas.png) _Diyagramlar [Ethereum EVM resmediciden](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) uyarlanmıştır_

## EVM uygulamaları {#evm-implementations}

EVM'nin tüm uygulamaları, Ethereum Sarı Kağıdında açıklanan şartnameye uymalıdır.

Ethereum'un dokuz yıllık geçmişinde, EVM birkaç revizyondan geçmiştir ve çeşitli programlama dillerinde birkaç uygulaması mevcuttur.

Tüm [Ethereum yürütme istemcileri](/developers/docs/nodes-and-clients/#execution-clients) bir EVM uygulaması içerir. Ek olarak, çok sayıda bütünsel uygulama da vardır:

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm)-_Rust_

## Daha Fazla Bilgi {#further-reading}

- [Ethereum Sarı Kağıdı](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper ya da diğer adıyla KEVM: K'de EVM Semantiği](https://jellopaper.org/)
- [Bej Kağıt](https://github.com/chronaeon/beigepaper)
- [Ethereum Sanal Makinesi İşlem Kodları](https://www.ethervm.io/)
- [Ethereum Sanal Makinesi İşlem Kodları İnteraktif Referansı](https://www.evm.codes/)
- [Solidity'nin belgelerine kısa bir giriş](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Ethereum'da Uzmanlaşmak - Ethereum Sanal Makinası](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## İlgili konular {#related-topics}

- [Gaz](/developers/docs/gas/)
