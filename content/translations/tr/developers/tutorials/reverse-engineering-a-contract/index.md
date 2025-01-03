---
title: "Sözleşmeye Tersine Mühendislik Uygulama"
description: Kaynak koduna sahip olmadığınız bir sözleşmeyi anlama
author: Ori Pomerantz
lang: tr
tags:
  - "EVM"
  - "işlem kodları"
skill: advanced
published: 2021-12-30
---

## Giriş {#introduction}

_Blokzincirde sır yoktur_; her şey tutarlı, doğrulanabilir ve herkes tarafından erişilebilirdir. İdeal olarak [sözleşmelerin kaynak kodları Etherscan'de yayımlanmalı ve doğrulanmalıdır](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Fakat, [durum her zaman böyle değildir](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Bu makalede, kaynak kodu olmayan bir sözleşmeye bakarak sözleşmelerde tersine mühendislik yapmayı öğreneceksiniz, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Ters derleyiciler vardır, fakat her zaman [ kullanılabilir sonuçlar](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f) üretmezler. Bu makalede manuel olarak bir sözleşmeye [işlem kodlarından](https://github.com/wolflo/evm-opcodes) nasıl ters mühendislik yapabileceğinizi, sözleşmeyi nasıl anlayacağınızı ve bununla birlikte bir ters derleyicinin sonuçlarını nasıl yorumlayacağınızı öğreneceksiniz.

Bu makaleyi anlayabilmek için Ethereum Sanal Makinesi'nin temellerini çoktan biliyor olmalı ve en azından Ethereum Sanal Makinesi'nin derleyicisine aşina olmalısınız. [Bu konuları buradan okuyabilirsiniz](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Yürütülebilir Kodu Hazırlama {#prepare-the-executable-code}

İşlem kodlarını sözleşme için Etherscan'e gidip **Sözleşme** seçeneğine ve sonrasında **İşlem Kodu Görünümüne Geç**'e tıklayarak alabilirsiniz. Bir satıra bir işlem kodunun düştüğü bir görünüm elde edeceksiniz.

![Etherscan'den İşlem Kodu Görünümü](opcode-view.png)

Bununla birlikte, sıçramaları anlayabilmek için her kodda işlem kodunun nerede olduğunu bilmeniz gerekir. Bunu yapmanın bir yolu, bir Google Elektronik Tablosu açıp işlem kodlarını C sütununa yapıştırmaktır. [Önceden hazırlanmış bu elektronik tablonun bir kopyasını oluşturarak sonraki adımları atlayabilirsiniz](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Sonraki adım, sıçramaları anlayabilmemiz için doğru kod konumlarını almaktır. B sütununa işlem kodu boyutunu, A sütünuna da (onaltılık olarak) konumu koyacağız. `B1` hücresine bu fonksiyonu yazın ve kodun sonuna kadar B sütunun geri kalanı için kopyalayıp yapıştırın. Bunu yaptıktan sonra B sütununu gizleyebilirsiniz.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

İlk olarak bu fonksiyon işlem kodunun kendisi için bir bayt ekler, sonra da `PUSH` araması yapar. İtme işlem kodları özeldir, çünkü itilen değer için ekstra baytlara sahip olmak zorundadırlar. Eğer işlem kodu bir `PUSH` ise, bayt sayısını çıkarır ve ekleriz.

`A1`'e ilk kayma olan 0'ı koyun. Ardından `A2`'ye bu fonksiyonu koyun ve yine A sütununun geri kalanı için kopyalayıp yapıştırın:

```
=dec2hex(hex2dec(A1)+B1)
```

Bu fonksiyonun bize onaltılık bir değer vermesine ihtiyacımız var çünkü sıçramalardan (`JUMP` and `JUMPI`) önceki itilen değerler de bize onaltılık şekilde verilir.

## Giriş Noktası (0x00) {#the-entry-point-0x00}

Sözleşmeler her zaman ilk bayttan yürütülür. Bu kodun ilk kısmıdır:

| Offset | İşlem kodları | Yığın (işlem kodundan sonra) |
| -----: | ------------- | ---------------------------- |
|      0 | PUSH1 0x80    | 0x80                         |
|      2 | PUSH1 0x40    | 0x40, 0x80                   |
|      4 | MSTORE        | Boş                          |
|      5 | PUSH1 0x04    | 0x04                         |
|      7 | CALLDATASIZE  | CALLDATASIZE 0x04            |
|      8 | LT            | CALLDATASIZE<4               |
|      9 | PUSH2 0x005e  | 0x5E CALLDATASIZE<4          |
|      C | JUMPI         | Boş                          |

Bu kod iki şey yapar:

1. 0x80'i 0x40-0x5F bellek konumlarına 32 baytlık bir değer olarak (0x80, 0x5F'de depolanır ve 0x40-0x5E tamamen sıfırlardan oluşur) yazın.
2. Çağrı verisini boyutunu okuyun. Ethereum sözleşmesi için olan bir çağrı verisi normalde, fonksiyon seçici için minimum 4 bayta ihtiyaç duyan [ABI'yi (uygulama ikili arayüzü)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html) takip eder. Eğer çağrı verisi boyutu dörtten azsa, 0x5E'ye sıçrayın.

![Bu kısım için akış şeması](flowchart-entry.png)

### 0X5E'deki (ABI olmayan çağrı verisi) İşleyici {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Opcode       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Bu kod parçası bir `JUMPDEST` ile başlar. Eğer `JUMPDEST` olmayan bir işlem koduna sıçrama yaparsanız EVM (Ethereum Sanal Makinesi) bir istisna verir. Ardından CALLDATASIZE'a bakar ve eğer "doğru" ise (sıfır değilse) 0x7C'ye sıçrar. Buna aşağıda değineceğiz.

| Offset | Opcode     | Stack (opcode'dan sonra)                                                       |
| -----: | ---------- | ------------------------------------------------------------------------------ |
|     64 | CALLVALUE  | Çağrı tarafından sağlanan [wei](/glossary/#wei). Solidity'de `msg.value` denir |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                    |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                  |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                        |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                      |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                             |

Yani hiç çağrı verisi olmadığında Depo[6] değerini okuruz. Bu değerin ne olduğunu henüz bilmiyoruz, fakat sözleşmenin hiç çağrı verisi almadığı işlemleri arayabiliriz. Çağrı verisi olmadan (bu sebeple yöntem da olmadan) ETH transfer eden işlemler için Etherscan'de `Transfer` adında bir yöntem vardır. Aslında, [sözleşmenin aldığı ilk işlem](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) bir transferdir.

Eğer işleme bakıp **Daha fazlası için tıklayın** öğesine tıklarsak, girdi verileri de denen çağrı verilerinin aslında boş olduğunu (`0x`) görürüz. Değerin 1,559 ETH olduğuna da dikkat edin, daha sonra işimize yarayacak.

![Çağrı verisi boş](calldata-empty.png)

Şimdi, **Durum** sekmesine tıklayın ve tersine mühendislik yaptığımız sözleşmeyi (0x2510...) genişletin. İşlem sırasında `Storage[6]`'ın değiştiğini görebilirsiniz, eğer Onaltılığı **Sayı** olarak değiştirirseniz değerin, bir sonraki sözleşme değerine karşılık gelen 1.559.000.000.000.000.000'a dönüştüğünü görebilirsiniz, bu değer wei cinsindendir (noktaları kolay anlaşılması için ekledim).

![Storage[6]'daki değişiklik](storage6.png)

Aynı zaman aralığında [diğer `Transfer` işlemlerinden kaynaklanan durum değişikliklerine baktığımızda](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) `Storage[6]`'ın, sözleşmenin değerini bir süre takip ettiğiniz görürüz. Şimdilik buna `Value*` adını vereceğiz. Buradaki yıldız işareti (`*`), henüz bu değişkenin ne yaptığını _bilmediğimizi_ hatırlatır, fakat bu sadece sözleşme değerini takip etmeye yönelik olamaz çünkü hesap bakiyenizi `ADDRESS BALANCE`'ı kullanarak görebilirken depolamayı kullanmaya gerek yoktur ve zaten çok pahalıdır. İlk işlem kodu sözleşmenin kendi adresini iter. İkincisi de yığının en üstündeki adresi okur ve bunu hesabın bakiyesiyle değiştirir.

| Offset | Opcode       | Yığın                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |                                             |

Bu kodu sıçrama hedefinde takip etmeye devam edeceğiz.

| Offset | Opcode     | Yığın                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` bitseldir, bu yüzden çağrı değerindeki her bitin değerini tersine çevirir.

| Offset | Opcode       | Yığın                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |                                                                             |

Eğer `Value*`, 2^256-CALLVALUE-1'den küçük ya da ona eşitse sıçrarız. Bu, taşmayı engelleme mantığına benzer. Ve gerçekten de, 0x01DE ofsetinde birkaç anlamsız işlemden sonra (örneğin belleğe yazma silinmek üzere) normal davranış olan taşma algılanırsa sözleşmenin geri döndüğünü görüyoruz.

Bunun gibi bir taşmanın oldukça uzak bir ihtimal olduğunu da gözden kaçırmayın. Çünkü böyle bir taşma, çağrı değeri ile `Value*` toplamının 2^256 wei ya da 10^59 ETH gibi bir değer civarında olmasını gerektirir. [Toplam ETH arzı, yazıyla iki yüz milyondan azdır](https://etherscan.io/stat/supply).

| Offset | Opcode   | Yığın                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | EKLE     | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |                                           |

Eğer buraya geldiysek `Value* + CALLVALUE` değerini alalım ve kayma 0x75 değerine sıçrayalım.

| Offset | Opcode   | Yığın                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Buraya gelince de (bu, çağrı verisinin boş olmasını gerektirir), `Value*`'yu çağrı değerine ekleyelim. Bu `Transfer` işlemlerinin yaptıkları ile tutarlıdır.

| Offset | Opcode |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Son olarak, yığını temizleyin (aslında pek de gerekli değildir) ve işlemin başarıyla tamamlandığına dair sinyali verin.

Hepsini özetlemek için işte başlangıçtaki kod için bir akış şeması.

![Giriş noktası akış şeması](flowchart-entry.png)

## 0x7C'deki İşleyici {#the-handler-at-0x7c}

Bu işleyicinin ne yaptığını bilerek başlığa koymadım. Buradaki amaç, size bu spesifik sözleşmenin nasıl çalıştığını değil, sözleşmelere nasıl tersine mühendislik yapacağınızı öğretmek. Ne yaptığını benimle aynı şekilde öğreneceksiniz, yani kodu takip ederek.

Buraya birkaç farklı yerden geliriz:

- Eğer çağrı verisi 1, 2 ya da 3 baytsa (0x63 kaymasından)
- Eğer yöntem imzası bilinmiyorsa (0x42 ve 0x5D kaymalarından)

| Offset | Opcode       | Yığın                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |                      |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Bu başka bir depolama hücresidir, herhangi bir işlemde bulamadığım bir hücre. Bu yüzden bunun ne anlama geldiğini bilmek biraz daha zor. Aşağıdaki kod bunu daha açık hale getirecektir.

| Offset | Opcode                                            | Yığın                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Bu işlem kodları Storage[3]'den okuduğumuz değeri 160 bite kırpar, bu da bir Ethereum adresinin uzunluğudur.

| Offset | Opcode | Yığın                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

Bu sıçrama sadece bir sonraki işlem koduna gideceğimiz için gereksizdir. Bu kod, ulaşabileceği gaz verimliliğine yakın bile değildir.

| Offset | İşlem kodları | Yığın                           |
| -----: | ------------- | ------------------------------- |
|     9D | JUMPDEST      | Storage[3]-as-address 0x00      |
|     9E | SWAP1         | 0x00 Storage[3]-as-address      |
|     9F | POP           | Storage[3]-as-address           |
|     A0 | PUSH1 0x40    | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD         | Mem[0x40] Storage[3]-as-address |

Bu kodun en başında Mem[0x40]'i 0x80 olarak ayarlıyoruz. 0x40'ı aradığımızda, değiştirmediğimizi görüyoruz; yani 0x80 olduğunu varsayabiliriz.

| Offset | İşlem kodları | Yığın                                             |
| -----: | ------------- | ------------------------------------------------- |
|     A3 | CALLDATASIZE  | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00    | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3          | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY  | 0x80 Storage[3]-as-address                        |

0x80'den başlayarak tüm veriyi belleğe kopyalayın.

| Offset | İşlem kodu    | Yığın                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |                                                                                  |

Şimdi her şey daha açık. Bu sözleşme asıl işi yapması için Storage[3]'teki adresi arayan bir [vekil](https://blog.openzeppelin.com/proxy-patterns/) olarak hareket edebilir. `DELEGATE_CALL` ayrı bir sözleşmeye çağrı yapar, fakat aynı depoda kalır. Bu, vekili olduğumuz yetkili sözleşmenin aynı depolama alanına eriştiği anlamına gelir. Bu çağrı için parametreler şu şekildedir:

- _Gaz_: Kalan tüm gaz
- _Aranan adres_: Adres-olarak-Storage[3]
- _Çağrı verisi_ Orijinal çağrı verisini koyduğumuz 0x80'den başlayan CALLDATASIZE baytları
- _Dönen veri_: Yok (0x00 - 0x00) Dönen veriyi başka şekillerde alacağız (aşağıya bakın)

| Offset | İşlem kodları  | Yığın                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

Burada dönen veriyi 0x80'den başlayan arabellek hafızasına kopyalıyoruz.

| Offset | İşlem kodları | Yığın                                                                                                                        |
| -----: | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2          | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1          | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO        | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0  | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     BC | JUMPI         | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2          | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address               |
|     BE | DUP5          | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address          |
|     BF | RETURN        |                                                                                                                              |

Yani çağrının ardından dönen veriyi 0x80 - 0x80+RETURNDATASIZE arabelleğine kopyaladıktan sonra, çağrı başarılı olduysa sonrasında tam olarak o arabellekle `RETURN` yapıyoruz.

### DELEGATECALL Başarısız oldu {#delegatecall-failed}

Buraya, yani 0xC0'a geldiysek, çağrı yaptığımız sözleşme geri dönmüştür. Bu sözleşme açısından sadece bir vekil olduğumuz için aynı veriyi döndürmek ve ayrıca geri dönmek istiyoruz.

| Offset | Işlem kodları | Yığın                                                                                                               |
| -----: | ------------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST      | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2          | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5          | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|     C3 | REVERT        |                                                                                                                     |

Yani daha önce `RETURN`: 0x80 - 0x80+RETURNDATASIZE için kullandığımız arabellekle `REVERT` yapıyoruz

![Vekil akış şeması çağrısı](flowchart-proxy.png)

## ABI çağrıları {#abi-calls}

Eğer veri boyutu 4 bayt ya da daha fazlaysa bu, geçerli bir ABI çağrısı olabilir.

| Offset | Opcode       | Yığın                                             |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((First word (256 bits) of the call data)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((First word (256 bits) of the call data))) |
|     12 | SHR          | (((first 32 bits (4 bytes) of the call data)))    |

Etherscan bize `1C`'nin bilinmeyen bir işlem kodu olduğunu söylüyor, çünkü [bu, Etherscan bu özelliği yazdıktan sonra eklendi](https://eips.ethereum.org/EIPS/eip-145) ve onu henüz güncellemediler. [Güncel bir işlem kodu tablosu](https://github.com/wolflo/evm-opcodes) bize bunun sağa kaydırma olduğunu gösteriyor

| Offset | Opcode           | Yığın                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((first 32 bits (4 bytes) of the call data))) (((first 32 bits (4 bytes) of the call data))) |
|     19 | GT               | 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>first-32-bits-of-the-call-data (((first 32 bits (4 bytes) of the call data)))            |
|     1D | JUMPI            | (((first 32 bits (4 bytes) of the call data)))                                                           |

Testleri eşleştiren yöntem imzasını buradaki gibi ikiye bölmek, ortalama olarak testlerin yarısından tasarruf etmemizi sağlar. Bu cümlenin hemen ardından gelen kod ve 0x43'teki kod aynı deseni izler: İlk 32 bitlik çağrı verileri için `DUP1`, ardından `PUSH4 (((method signature>` uygulayın, eşitliği kontrol etmek için `EQ` çalıştırın ve ardından yöntem imzası eşleşirse `JUMPI` komutunu kullanın. Yöntem imzaları, adresleri ve biliniyorsa [karşılık gelen yöntem tanımı](https://www.4byte.directory/) aşağıda verilmiştir:

| Metod                                                                                  | Yöntem imzası | Sıçranacak kayma |
| -------------------------------------------------------------------------------------- | ------------- | ---------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e    | 0x0103           |
| ???                                                                                    | 0x81e580d3    | 0x0138           |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4    | 0x0158           |
| ???                                                                                    | 0x1f135823    | 0x00C4           |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab    | 0x00ED           |

Eşleşme bulunamazsa kod, bizim vekili olduğumuz sözleşmenin bir eşleşmesi olmasını umarak [0x7C'deki vekil işlayicisine](#the-handler-at-0x7c) sıçrar.

![ABI çağrıları akış şeması](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Opcode       | Yığın                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |                               |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |                               |

Bu fonksiyonun yaptığı ilk şey, çağrının ETH göndermediğini doğrulamaktır. Bu fonksiyon [`payable`](https://solidity-by-example.org/payable/) değildir. Eğer biri bize ETH gönderdiyse bu bir hata olarak gerçekleşmiştir ve o kişiyi ETH'lerini geri alamayacağı bir duruma sokmaktan kaçınmak için `REVERT` yapmamız gerekir.

| Offset | Opcode                                            | Yığın                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |                                                                             |
|    110 | POP                                               |                                                                             |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] a.k.a the contract for which we are a proxy)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] a.k.a the contract for which we are a proxy)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] a.k.a the contract for which we are a proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] a.k.a the contract for which we are a proxy))) |
|    12D | SWAP2                                             | (((Storage[3] a.k.a the contract for which we are a proxy))) 0xFF...FF 0x80 |
|    12E | VE                                                | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Ve 0x80 artık vekil adresini içeriyor

| Offset | Opcode       | Yığın     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | EKLE         | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 Kodu {#the-e4-code}

Bu bu satırları ilk görüşümüz, fakat bunlar diğer yöntemlerle paylaşıldı (aşağı bakın). X yığınındaki değeri arayacağız; `splitter()`'da bu Xin değerinin 0xA0 olduğunu unutmayın.

| Offset | Opcode     | Yığın       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | ALT        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |             |

Yani bu kod, yığında (X) bir bellek işaretçisi alır ve sözleşmenin, arabelleği 0x80 - X olan bir `RETURN` durumuna uğramasına sebep olur.

`splitter()` durumunda bu, vekili olduğumuz adresi döndürür. `RETURN`, veriyi yazdığımız yerin adresi olan 0x80-0x9F'deki arabelleği verir (0x130un yukarısındaki kayma).

## currentWindow() {#currentwindow}

0x158-0x163 kaymalarındaki kod, `splitter()` içindeki 0x103-0x10E'de gördüğümüzle aynıdır (`JUMPI` hedefi dışında), bu nedenle `currentWindow()`'un da `payable` olmadığını biliyoruz.

| Offset | Opcode       | Yığın                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |                      |
|    165 | POP          |                      |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA kodu {#the-da-code}

Bu kod da diğer yöntemlerle paylaşılmıştır. Yani Y yığınındaki değeri çağıracağız; `currentWindow()`'da bu Y'nin değerinin Storage[1] olduğunu unutmayın.

| Offset | Opcode     | Yığın            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

0x80-0x9F'e Y'yi yazalım.

| Offset | Opcode     | Yığın          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | EKLE       | 0xA0 0xDA      |

Ve geri kalanı da [yukarıda](#the-e4-code) anlatılmıştır. Yani 0xDA'ya yapılan sıçramalar yığının başını (Y), 0x80-0x9F'ye yazar ve bu değeri döndürür. Bir `currentWindow()` durumunda, Storage[1]'ı verir.

## merkleRoot() {#merkleroot}

0x158-0x163 kaymalarındaki kod, `splitter()` içindeki 0x103-0x10E'de gördüğümüzle aynıdır (`JUMPI` hedefi dışında), bu nedenle `merkleRoot()`'un da `payable` olmadığını biliyoruz.

| Offset | Opcode       | Yığın                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |                      |
|     FA | POP          |                      |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Sıçramadan sonra ne olduğunu [çoktan anladık](#the-da-code). Yani `merkleRoot()` Storage[0]'ı döndürür.

## 0x81e580d3 {#0x81e580d3}

0xC4-0xCF kaymalarındaki kod, `splitter()` içindeki 0x103-0x10E'de gördüğümüzle aynıdır (`JUMPI` hedefi dışında), dolayısıyla bu fonksiyonun da `payable` olmadığını biliyoruz.

| Offset | Opcode       | Yığın                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |                                                              |
|    145 | POP          |                                                              |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Bu fonksiyon en az 32 bayt (1 kelime) çağrı verisi alıyor gibi görünüyor.

| Offset | Opcode | Yığın                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |                                              |

Eğer hiçbir çağrı verisi almazsa bu işlem gelen hiçbir veri olmadan geri döndürülür.

Şimdi de _does_ fonksiyonu ihtiyacı olan çağrı verisini aldığında neler olduğunu görelim.

| Offset | Opcode       | Yığın                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)`, çağrı verisinin yöntem imzasından _sonraki_ ilk kelimesidir

| Offset | Opcode       | Yığın                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Eğer ilk kelime Storage[4]'ten az değilse, fonksiyon başarısız olur. Herhangi bir gelen veri olmadan geri döndürülür:

| Offset | Opcode     | Yığın         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |               |

Eğer calldataload(4) Storage[4]'ten azsa, şu kodu alırız:

| Offset | Opcode     | Yığın                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Ve 0x00-0x1F bellek konumları artık 0x04 verilerini içermektedir (0x00-0x1E'lerin hepsi sıfır, 0x1F ise dört)

| Offset | Opcode     | Yığın                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | EKLE       | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Öyleyse depolamada, 0x000...0004'ün SHA3'ünde başlayan bir arama tablosu vardır ve bu tablo, her yasal çağrı verisi değeri için bir giriş içerir (Storage[4]'ın altında değer).

| Offset | Opcode | Yığın                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

[0xDA kaymasındaki kodun](#the-da-code) ne yaptığını zaten biliyoruz, arayan kişiye yığının üst değerini döndürür. Yani bu fonksiyon, arayana arama tablosundaki değeri döndürür.

## 0x1f135823 {#0x1f135823}

0xC4-0xCF kaymalarındaki kod, `splitter()` içindeki 0x103-0x10E'de gördüğümüzle aynıdır (`JUMPI` hedefi dışında), dolayısıyla bu fonksiyonun da `payable` olmadığını biliyoruz.

| Offset | Opcode       | Yığın             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |                   |
|     D1 | POP          |                   |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

[0xDA uzaklığındaki kodun](#the-da-code) ne yaptığını zaten biliyoruz, arayan kişiye yığının üst değerini döndürür. Yani bu fonksiyon `Value*` döndürür.

### Yöntem Özeti {#method-summary}

Bu noktada sözleşmeyi anladığınızı düşünüyor musunuz? Ben düşünmüyorum. Şu ana kadar elimizde şu yöntemler var:

| Metod                             | Anlam                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| Aktarım                           | Çağrı tarafından sağlanan değeri kabul edin ve `Value*` değerini bu miktarda artırın         |
| [splitter()](#splitter)           | Return Storage[3], the proxy address                                                         |
| [currentWindow()](#currentwindow) | Return Storage[1]                                                                            |
| [merkleRoot()](#merkeroot)        | Return Storage[0]                                                                            |
| [0x81e580d3](#0x81e580d3)         | Parametrenin Storage[4] değerinden küçük olması koşuluyla, arama tablosundan değeri döndürün |
| [0x1f135823](#0x1f135823)         | Return Storage[6], a.k.a. Value\*                                                            |

Ancak diğer işlevlerin Storage[3]'da sözleşme tarafından sağlandığını biliyoruz. Belki o sözleşmenin ne olduğunu bilseydik bize bir ipucu verirdi. Neyse ki, blokzincirden bahsediyoruz ve en azından teoride de olsa her şey biliniyor. Storage[3] değerini ayarlayan herhangi bir yöntem görmedik, dolayısıyla bunun oluşturucu tarafından ayarlanmış olması gerekir.

## Yapıcı {#the-constructor}

[Bir sözleşmeye baktığımızda](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) onu oluşturan işlemi de görebiliriz.

![İşlem oluştur öğesine tıklayın](create-tx.png)

O işleme ve sonrasında da **Durum** sekmesine tıklarsak, parametrelerin başlangıç değerlerini görebiliriz. Spesifik olarak, Storage[3]'ın [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) değerini içerdiğini görebiliriz. O sözleşme, eksik işlevselliği içermek zorundadır. Araştırdığımız sözleşme için kullandığımız araçların aynılarını kullanarak bunu anlayabiliriz.

## Vekil Sözleşmesi {#the-proxy-contract}

Yukarıdaki orijinal sözleşme için kullandığımız tekniklerin aynılarını kullanarak kontratın şu durumlarda eski haline döndüğünü görüyoruz:

- Çağrıya iliştirilmiş herhangi bir miktarda ETH varsa (0x05-0x0F)
- Çağrı verisi boyutu dörtten azsa (0x10-0x19 ve 0xBE-0xC2)

Desteklediği yöntemler:

| Metod                                                                                                           | Yöntem imzası                | Atlamak için ofset |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------ |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/x/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135             |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151             |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4             |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110             |
| ???                                                                                                             | 0x3f26479e                   | 0x0118             |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3             |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148             |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107             |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122             |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8             |

Alttaki 4 metodu görmezden gelebiliriz, çünkü onları ele almayacağız. İmzaları, orijinal sözleşmemizin kendileriyle ilgileneceği şekildedir (yukarıdaki ayrıntıları görmek için imzalara tıklayabilirsiniz), bu nedenle bunlar, [geçersiz kılınan yöntemler](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf) olmalıdır.

Kalan yöntemlerden biri `claim(<params>)`, diğeri de `isClaimed(<params>)` şeklindedir, dolayısıyla bir airdrop sözleşmesini andırır. İşlem kodundan işlem koduna geri kalanların üzerinden geçmek yerine, bu sözleşmeden üç fonksiyon için kullanılabilir sonuçlar oluşturan [geri derleyiciyi deneyebiliriz](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Diğerlerine tersine mühendislik yapmak ise alıştırma olarak okuyucuya bırakılmıştır.

### scaleAmountByPercentage {#scaleamountbypercentage}

Bu fonksiyon için geri derleyicinin bize verdiği şey şudur:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

İlk `require` çağrı verilerinin, fonksiyon imzasının dört baytına ek olarak iki parametre için yeterli olan en az 64 bayta sahip olup olmadığını test eder. Eğer durum bu değilse, kesinlikle yanlış bir şeyler vardır.

`if` ifadesi, `_param1` değerinin sıfır olmadığını ve `_param1 * _param2` değerinin negatif olmadığını doğrulamaya çalışıyor gibi görünüyor. Muhtemelen paketleme durumlarını önlemek içindir.

Son olarak, fonksiyon ölçeklendirilmiş bir değer döndürür.

### talep et {#claim}

Geri derleyicinin oluşturduğu kod karmaşık ve bunun haricinde tamamı da bizim açımızdan ilgili değil. Bunların bir kısmını atlayıp bize işe yarar bilgi sağlayacağına inandığım satırlara odaklanacağım

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Burada iki önemli şey görüyoruz:

- `_param2`, bir `uint256` olarak tanıtılmasına rağmen aslında bir adrestir
- `_param1`, şimdi ya da öncesinde `currentWindow` olması gereken, üstlenilen penceredir.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Yani artık Storage[5]'ın pencere ve adreslerden oluşan bir dizi olduğunu ve adresin o pencere için ödülü alıp almadığını biliyoruz.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

`unknown2eb4a7ab` değerinin aslında `merkleRoot()` fonksiyonu olduğunu biliyoruz, dolayısıyla bu kod bir [merkle kanıtını](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) doğruluyor gibi görünüyor. Bu, `_param4` değerinin bir merkle kanıtı olduğu anlamına geliyor.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Bir sözleşme kendi ETH'sini başka bir adrese (sözleşme ya da harici olarak sahip olunan) işte bu şekilde transfer eder. Transfer edilecek miktar olan bir değerle ona çağrı yapar. Yani bu, ETH'nin bir airdrop'u gibi görünüyor.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

En alttaki iki satır, bize Storage[2]'ın da çağrı yaptığımız bir sözleşme olduğunu söyler. [Oluşturucu işlemine bakarsak](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) bu sözleşmenin [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), [kaynak kodu Etherscan'e yüklenmiş bir Paketlenmiş Ether sözleşmesi olduğunu görürüz](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Sözleşme, `_param2`'ye ETH göndermeye çalışıyor gibi görünüyor. Eğer yapabilirse, çok iyi. Yapamazsa, [WETH](https://weth.tkn.eth.limo/) göndermeye çalışacak. Eğer `_param2` dışarıdan sahip olunan hesap (EOA) ise, her zaman ETH alabilir, fakat sözleşmeler ETH almayı reddedebilir. Bununla birlikte, WETH bir ERC-20'dir ve sözleşmeler bunu kabul etmeyi reddedemez.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Fonksiyonun sonunda bir günlük girdisinin oluşturulduğunu görüyoruz. [Oluşturulmuş günlük girdilerine bakın](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) ve `0xdbd5...` ile başlayan konuyu filtreleyin. Böyle bir girdi oluşturmuş işlemlerden birine [tıklarsak](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) gerçekten de üstlenme gibi göründüğünü görebiliriz; hesap, tersine mühendislik yaptığımız sözleşmeye bir mesaj göndermiş ve karşılığında ETH almıştır.

![Üstlenme işlemi](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Bu fonksiyon, yukarıdaki [`claim`](#claim) fonksiyonuna çok benziyor. Ayrıca bir merkle kanıtını kontrol eder, ilkine ETH transfer etmeyi dener ve aynı türde bir günlük girdisi oluşturur.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Asıl fark geri çekilecek olan pencere olan ilk parametrenin orada olmamasıdır. Bunun yerine, her pencerenin üstünde alınabilecek bir döngü vardır.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Yani tüm pencereleri üstlenen bir `claim` varyantı gibi görünüyor.

## Sonuç {#conclusion}

Şu ana kadar kaynak kodu ulaşılabilir olmayan sözleşmeleri, işlem kodlarını ya da geri derleyiciyi kullanarak (eğer çalışırsa) nasıl anlayacağınızı öğrenmiş olmalısınız. Bu makalenin uzunluğundan da anlaşılacağı gibi, bir sözleşmeye tersine mühendislik uygulamak önemsiz değildir, ancak güvenliğin önemli olduğu bir sistemde sözleşmelerin vaat edildiği gibi çalıştığını doğrulayabilmek önemli bir beceridir.
