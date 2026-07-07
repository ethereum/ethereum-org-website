---
title: "Bir Sözleşmeye Tersine Mühendislik Uygulamak"
description: "Kaynak koduna sahip olmadığınızda bir sözleşmeyi nasıl anlarsınız"
author: Ori Pomerantz
lang: tr
tags: ["evm", "işlem kodları"]
skill: advanced
breadcrumb: "Tersine mühendislik"
published: 2021-12-30
---
## Giriş {#introduction}

_Blokzincirde sır yoktur_, gerçekleşen her şey tutarlı, doğrulanabilir ve herkese açıktır. İdeal olarak, [sözleşmelerin kaynak kodları Etherscan üzerinde yayınlanmalı ve doğrulanmalıdır](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Ancak, [durum her zaman böyle değildir](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Bu makalede, kaynak kodu olmayan bir sözleşmeye, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), bakarak sözleşmelere nasıl tersine mühendislik uygulayacağınızı öğreneceksiniz.

Tersine derleyiciler vardır, ancak her zaman [kullanılabilir sonuçlar](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f) üretmezler. Bu makalede, bir sözleşmeyi [işlem kodlarından](https://github.com/wolflo/evm-opcodes) manuel olarak nasıl tersine mühendislik uygulayıp anlayacağınızı ve bir tersine derleyicinin sonuçlarını nasıl yorumlayacağınızı öğreneceksiniz.

Bu makaleyi anlayabilmek için EVM'nin temellerini zaten biliyor olmalı ve EVM assembly'sine en azından biraz aşina olmalısınız. [Bu konular hakkında buradan bilgi edinebilirsiniz](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Çalıştırılabilir Kodu Hazırlama {#prepare-the-executable-code}

Sözleşme için Etherscan'e gidip **Sözleşme** sekmesine ve ardından **İşlem Kodları Görünümüne Geç**'e tıklayarak işlem kodlarını alabilirsiniz. Her satırda bir işlem kodu olan bir görünüm elde edersiniz.

![Opcode View from Etherscan](opcode-view.png)

Ancak atlamaları anlayabilmek için her bir işlem kodunun kodun neresinde bulunduğunu bilmeniz gerekir. Bunu yapmanın bir yolu, bir Google E-Tablosu açmak ve işlem kodlarını C sütununa yapıştırmaktır. [Önceden hazırlanmış bu e-tablonun bir kopyasını oluşturarak aşağıdaki adımları atlayabilirsiniz](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Sonraki adım, atlamaları anlayabilmemiz için doğru kod konumlarını elde etmektir. İşlem kodu boyutunu B sütununa ve konumu (onaltılık sistemde) A sütununa koyacağız. Bu işlevi `B1` hücresine yazın ve ardından kodun sonuna kadar B sütununun geri kalanı için kopyalayıp yapıştırın. Bunu yaptıktan sonra B sütununu gizleyebilirsiniz.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

İlk olarak bu işlev, işlem kodunun kendisi için bir bayt ekler ve ardından `PUSH` arar. Push işlem kodları özeldir çünkü yığına eklenen değer için ek baytlara sahip olmaları gerekir. Eğer işlem kodu bir `PUSH` ise, bayt sayısını çıkarır ve bunu ekleriz.

`A1` hücresine ilk ofseti, yani sıfırı koyun. Ardından, `A2` hücresine bu işlevi koyun ve yine A sütununun geri kalanı için kopyalayıp yapıştırın:

```
=dec2hex(hex2dec(A1)+B1)
```

Bu işlevin bize onaltılık değeri vermesine ihtiyacımız var çünkü atlamalardan önce yığına eklenen değerler (`JUMP` ve `JUMPI`) bize onaltılık sistemde verilir.

## Giriş Noktası (0x00) {#the-entry-point-0x00}

Sözleşmeler her zaman ilk bayttan itibaren yürütülür. Bu, kodun başlangıç kısmıdır:

| Ofset | İşlem kodu       | Yığın (işlem kodundan sonra) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | Boş                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | Boş                    |

Bu kod iki şey yapar:

1. 0x40-0x5F bellek konumlarına 32 baytlık bir değer olarak 0x80 yazar (0x80, 0x5F'de depolanır ve 0x40-0x5E'nin tamamı sıfırdır).
2. Çağrı verisi boyutunu okur. Normalde bir Ethereum sözleşmesi için çağrı verisi, işlev seçici için en az dört bayt gerektiren [ABI'yi (uygulama ikili arayüzü)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html) izler. Çağrı verisi boyutu dörtten küçükse, 0x5E'ye atlar.

![Flowchart for this portion](flowchart-entry.png)

### 0x5E'deki İşleyici (ABI olmayan çağrı verisi için) {#the-handler-at-0x5e-for-non-abi-call-data}

| Ofset | İşlem kodu       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Bu kod parçacığı bir `JUMPDEST` ile başlar. EVM (Ethereum sanal makinesi) programları, `JUMPDEST` olmayan bir işlem koduna atlarsanız bir istisna fırlatır. Ardından CALLDATASIZE'a bakar ve eğer "doğru" ise (yani sıfır değilse) 0x7C'ye atlar. Buna aşağıda değineceğiz.

| Ofset | İşlem kodu     | Yığın (işlem kodundan sonra)                                                       |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | Çağrı tarafından sağlanan [Wei](/glossary/#wei). Solidity'de `msg.value` olarak adlandırılır |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Yani çağrı verisi olmadığında Storage[6] değerini okuruz. Bu değerin ne olduğunu henüz bilmiyoruz, ancak sözleşmenin çağrı verisi olmadan aldığı işlemleri arayabiliriz. Herhangi bir çağrı verisi (ve dolayısıyla hiçbir yöntem) olmadan sadece ETH transfer eden işlemler Etherscan'de `Transfer` yöntemine sahiptir. Aslında, [sözleşmenin aldığı ilk işlem](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) bir transferdir.

O işleme bakıp **Click to see More** (Daha Fazlasını Görmek İçin Tıklayın) seçeneğine tıklarsak, girdi verisi olarak adlandırılan çağrı verisinin gerçekten boş olduğunu (`0x`) görürüz. Ayrıca değerin 1.559 ETH olduğuna dikkat edin, bu daha sonra önemli olacaktır.

![The call data is empty](calldata-empty.png)

Ardından, **State** (Durum) sekmesine tıklayın ve tersine mühendislik yaptığımız sözleşmeyi (0x2510...) genişletin. İşlem sırasında `Storage[6]`'nın değiştiğini görebilirsiniz ve Hex'i **Number** (Sayı) olarak değiştirirseniz, wei cinsinden transfer edilen değere (netlik için virgülleri ben ekledim) karşılık gelen 1.559.000.000.000.000.000 olduğunu görürsünüz, bu da bir sonraki sözleşme değerine karşılık gelir.

![Storage[6]'daki değişiklik](storage6.png)

[Aynı dönemdeki diğer `Transfer` işlemlerinin](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) neden olduğu durum değişikliklerine bakarsak, `Storage[6]`'nın bir süre sözleşmenin değerini izlediğini görürüz. Şimdilik buna `Value*` diyeceğiz. Yıldız işareti (`*`) bize bu değişkenin ne yaptığını henüz _bilmediğimizi_ hatırlatır, ancak sadece sözleşme değerini izlemek için olamaz çünkü hesap bakiyenizi `ADDRESS BALANCE` kullanarak alabiliyorken çok pahalı olan depolamayı kullanmaya gerek yoktur. İlk işlem kodu sözleşmenin kendi adresini iter. İkincisi, yığının en üstündeki adresi okur ve onu o adresin bakiyesiyle değiştirir.

| Ofset | İşlem kodu       | Yığın                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Bu kodu atlama hedefinde izlemeye devam edeceğiz.

| Ofset | İşlem kodu     | Yığın                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` bitseldir, bu nedenle çağrı değerindeki her bitin değerini tersine çevirir.

| Ofset | İşlem kodu       | Yığın                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

`Value*`, 2^256-CALLVALUE-1'den küçük veya ona eşitse atlarız. Bu, taşmayı önlemeye yönelik bir mantık gibi görünüyor. Ve gerçekten de, birkaç anlamsız işlemden sonra (örneğin belleğe yazma işleminin silinmek üzere olması) 0x01DE ofsetinde, taşma tespit edilirse sözleşmenin geri alındığını görüyoruz, ki bu normal bir davranıştır.

Böyle bir taşmanın son derece düşük bir ihtimal olduğunu unutmayın, çünkü çağrı değeri artı `Value*`'ın 2^256 wei'ye, yani yaklaşık 10^59 ETH'ye kıyaslanabilir olmasını gerektirir. [Yazının yazıldığı sırada toplam ETH arzı iki yüz milyondan azdır](https://etherscan.io/stat/supply).

| Ofset | İşlem kodu   | Yığın                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Buraya ulaştıysak, `Value* + CALLVALUE`'i alın ve 0x75 ofsetine atlayın.

| Ofset | İşlem kodu   | Yığın                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Buraya ulaşırsak (ki bu çağrı verisinin boş olmasını gerektirir), `Value*`'a çağrı değerini ekleriz. Bu, `Transfer` işlemlerinin yaptığını söylediğimiz şeyle tutarlıdır.

| Ofset | İşlem kodu |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Son olarak, yığını temizleyin (ki bu gerekli değildir) ve işlemin başarılı bir şekilde sona erdiğini bildirin.

Özetlemek gerekirse, işte başlangıç kodu için bir akış şeması.

![Entry point flowchart](flowchart-entry.png)

## 0x7C'deki İşleyici {#the-handler-at-0x7c}

Bu işleyicinin ne yaptığını bilerek başlığa koymadım. Amaç size bu belirli sözleşmenin nasıl çalıştığını öğretmek değil, sözleşmelerde nasıl tersine mühendislik yapılacağını öğretmektir. Ne yaptığını benim yaptığım gibi, kodu takip ederek öğreneceksiniz.

Buraya birkaç yerden geliyoruz:

- 1, 2 veya 3 baytlık çağrı verisi varsa (0x63 ofsetinden)
- Yöntem imzası bilinmiyorsa (0x42 ve 0x5D ofsetlerinden)

| Ofset | İşlem Kodu   | Yığın                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Bu başka bir depolama hücresidir, hiçbir işlemde bulamadığım bir hücre olduğu için ne anlama geldiğini bilmek daha zordur. Aşağıdaki kod bunu daha net hale getirecektir.

| Ofset | İşlem Kodu                                        | Yığın                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

Bu işlem kodları, Storage[3]'ten okuduğumuz değeri bir Ethereum adresinin uzunluğu olan 160 bite keser.

| Ofset | İşlem Kodu | Yığın                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

Bir sonraki işlem koduna geçeceğimiz için bu atlama gereksizdir. Bu kod olabileceği kadar gaz açısından verimli değildir.

| Ofset | İşlem Kodu | Yığın                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

Kodun en başında Mem[0x40] değerini 0x80 olarak ayarladık. Daha sonra 0x40'ı ararsak, onu değiştirmediğimizi görürüz - bu yüzden 0x80 olduğunu varsayabiliriz.

| Ofset | İşlem Kodu   | Yığın                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

Tüm çağrı verisini 0x80'den başlayarak belleğe kopyalayın.

| Ofset | İşlem Kodu    | Yığın                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

Şimdi işler çok daha net. Bu sözleşme, asıl işi yapması için Storage[3]'teki adresi çağırarak bir [vekil kontrat](https://blog.openzeppelin.com/proxy-patterns/) olarak hareket edebilir. `DELEGATE_CALL` ayrı bir sözleşmeyi çağırır, ancak aynı depolamada kalır. Bu, yetkilendirilen sözleşmenin, yani vekili olduğumuz sözleşmenin aynı depolama alanına eriştiği anlamına gelir. Çağrı için parametreler şunlardır:

- _Gaz_: Kalan tüm gaz
- _Çağrılan adres_: Storage[3]-as-address
- _Çağrı verisi_: Orijinal çağrı verisini koyduğumuz yer olan 0x80'den başlayan CALLDATASIZE baytları
- _Dönüş verisi_: Yok (0x00 - 0x00) Dönüş verisini başka yollarla alacağız (aşağıya bakın)

| Ofset | İşlem Kodu     | Yığın                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address                          |

Burada tüm dönüş verisini 0x80'den başlayan bellek arabelleğine kopyalıyoruz.

| Ofset | İşlem Kodu   | Yığın                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address                              |
|     B7 | DUP1         | (((çağrı başarısı/başarısızlığı))) (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address   |
|     B8 | ISZERO       | (((çağrı başarısız oldu mu))) (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((çağrı başarısız oldu mu))) (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address |
|     BC | JUMPI        | (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address                              |
|     BD | DUP2         | RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address          |
|     BF | RETURN       |                                                                                                                              |

Yani çağrıdan sonra dönüş verisini 0x80 - 0x80+RETURNDATASIZE arabelleğine kopyalıyoruz ve çağrı başarılı olursa tam olarak bu arabellek ile `RETURN` yapıyoruz.

### DELEGATECALL Başarısız Oldu {#delegatecall-failed}

Eğer buraya, 0xC0'a gelirsek, bu çağırdığımız sözleşmenin geri alındığı anlamına gelir. O sözleşme için sadece bir vekil kontrat olduğumuzdan, aynı veriyi döndürmek ve aynı zamanda geri almak istiyoruz.

| Ofset | İşlem Kodu | Yığın                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address                     |
|     C1 | DUP2     | RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) RETURNDATASIZE (((çağrı başarısı/başarısızlığı))) 0x80 Storage[3]-as-address |
|     C3 | REVERT   |

Böylece daha önce `RETURN` için kullandığımız aynı arabellek ile `REVERT` yapıyoruz: 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## ABI çağrıları {#abi-calls}

Eğer çağrı verisi boyutu dört bayt veya daha fazlaysa, bu geçerli bir ABI çağrısı olabilir.

| Ofset | İşlem kodu       | Yığın                                             |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((Çağrı verisinin ilk kelimesi (256 bit))))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Çağrı verisinin ilk kelimesi (256 bit)))) |
|     12 | SHR          | (((çağrı verisinin ilk 32 biti (4 bayt))))    |

Etherscan bize `1C`'nin bilinmeyen bir işlem kodu olduğunu söylüyor, çünkü [Etherscan bu özelliği yazdıktan sonra eklendi](https://eips.ethereum.org/EIPS/eip-145) ve henüz güncellemediler. [Güncel bir işlem kodu tablosu](https://github.com/wolflo/evm-opcodes) bize bunun sağa kaydırma olduğunu gösteriyor.

| Ofset | İşlem kodu           | Yığın                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((çağrı verisinin ilk 32 biti (4 bayt)))) (((çağrı verisinin ilk 32 biti (4 bayt))))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((çağrı verisinin ilk 32 biti (4 bayt)))) (((çağrı verisinin ilk 32 biti (4 bayt)))) |
|     19 | GT               | 0x3CD8045E>cagri-verisinin-ilk-32-biti (((çağrı verisinin ilk 32 biti (4 bayt))))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>cagri-verisinin-ilk-32-biti (((çağrı verisinin ilk 32 biti (4 bayt))))            |
|     1D | JUMPI            | (((çağrı verisinin ilk 32 biti (4 bayt))))                                                           |

Yöntem imzası eşleştirme testlerini bu şekilde ikiye bölmek, ortalama olarak testlerin yarısından tasarruf sağlar. Bunu hemen takip eden kod ve 0x43'teki kod aynı kalıbı izler: çağrı verisinin ilk 32 bitini `DUP1` ile kopyala, `PUSH4 (((method signature>` ekle, eşitliği kontrol etmek için `EQ` çalıştır ve ardından yöntem imzası eşleşirse `JUMPI` ile atla. İşte yöntem imzaları, adresleri ve biliniyorsa [ilgili yöntem tanımı](https://www.4byte.directory/):

| Yöntem                                                                                 | Yöntem imzası | Atlanacak ofset |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

Eğer eşleşme bulunamazsa kod, vekili olduğumuz sözleşmede bir eşleşme olması umuduyla [0x7C'deki vekil işleyiciye](#the-handler-at-0x7c) atlar.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Offset | İşlem kodu   | Yığın                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

Bu fonksiyonun yaptığı ilk şey, çağrının herhangi bir ETH göndermediğini kontrol etmektir. Bu fonksiyon [`payable`](https://solidity-by-example.org/payable/) değildir. Eğer birisi bize ETH gönderdiyse bu bir hata olmalıdır ve bu ETH'nin geri alamayacakları bir yerde kalmasını önlemek için `REVERT` yapmak istiyoruz.

| Offset | İşlem kodu                                        | Yığın                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] yani vekili olduğumuz sözleşme)))                             |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] yani vekili olduğumuz sözleşme)))                        |
|    116 | MLOAD                                             | 0x80 (((Storage[3] yani vekili olduğumuz sözleşme)))                        |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] yani vekili olduğumuz sözleşme)))              |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] yani vekili olduğumuz sözleşme)))              |
|    12D | SWAP2                                             | (((Storage[3] yani vekili olduğumuz sözleşme))) 0xFF...FF 0x80              |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Ve 0x80 artık vekil adresini içeriyor

| Offset | İşlem kodu   | Yığın     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 Kodu {#the-e4-code}

Bu satırları ilk kez görüyoruz, ancak diğer metotlarla paylaşılıyorlar (aşağıya bakın). Bu yüzden yığındaki değere X diyeceğiz ve `splitter()` içinde bu X değerinin 0xA0 olduğunu hatırlayacağız.

| Offset | İşlem kodu | Yığın       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Yani bu kod, yığında (X) bir bellek işaretçisi alır ve sözleşmenin 0x80 - X boyutunda bir arabellek ile `RETURN` yapmasına neden olur.

`splitter()` durumunda, bu, vekili olduğumuz adresi döndürür. `RETURN`, bu veriyi yazdığımız yer olan (yukarıdaki 0x130 konumu) 0x80-0x9F aralığındaki arabelleği döndürür.

## currentWindow() {#currentwindow}

0x158-0x163 ofsetlerindeki kod, `splitter()` içinde 0x103-0x10E'de gördüğümüzle aynıdır (`JUMPI` hedefi dışında), bu yüzden `currentWindow()`'ün de `payable` olmadığını biliyoruz.

| Ofset | İşlem kodu   | Yığın                |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA kodu {#the-da-code}

Bu kod diğer metotlarla da paylaşılıyor. Bu yüzden yığındaki değere Y diyeceğiz ve `currentWindow()` içinde bu Y değerinin Storage[1] olduğunu hatırlayacağız.

| Ofset | İşlem kodu | Yığın            |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Y'yi 0x80-0x9F'ye yazın.

| Ofset | İşlem kodu | Yığın          |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

Ve geri kalanı zaten [yukarıda](#the-e4-code) açıklandı. Yani 0xDA'ya atlamalar, yığının en üstündekini (Y) 0x80-0x9F'ye yazar ve bu değeri döndürür. `currentWindow()` durumunda, Storage[1] döndürür.

## merkleRoot() {#merkleroot}

0xED-0xF8 ofsetlerindeki kod, (`JUMPI` hedefi dışında) `splitter()` içinde 0x103-0x10E'de gördüğümüzle aynıdır, bu yüzden `merkleRoot()`'nin de `payable` olmadığını biliyoruz.

| Ofset | İşlem Kodu   | Yığın                |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Atlamadan sonra ne olacağını [zaten çözmüştük](#the-da-code). Yani `merkleRoot()`, Storage[0] döndürür.

## 0x81e580d3 {#0x81e580d3}

0x138-0x143 ofsetlerindeki kod, `splitter()` içindeki 0x103-0x10E'de gördüğümüzle aynıdır (`JUMPI` hedefi dışında), bu yüzden bu fonksiyonun da `payable` olmadığını biliyoruz.

| Ofset | İşlem kodu   | Yığın                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
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
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Görünüşe göre bu fonksiyon en az 32 bayt (bir kelime) çağrı verisi alıyor.

| Ofset | İşlem kodu | Yığın                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

Çağrı verisini almazsa, işlem herhangi bir dönüş verisi olmadan geri alınır.

Fonksiyon ihtiyaç duyduğu çağrı verisini _alırsa_ ne olacağına bakalım.

| Ofset | İşlem kodu   | Yığın                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)`, metot imzasından _sonraki_ çağrı verisinin ilk kelimesidir

| Ofset | İşlem kodu   | Yığın                                                                        |
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
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

İlk kelime Storage[4]'ten küçük değilse, fonksiyon başarısız olur. Herhangi bir dönüş değeri olmadan geri alınır:

| Ofset | İşlem kodu | Yığın         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

calldataload(4), Storage[4]'ten küçükse şu kodu elde ederiz:

| Ofset | İşlem kodu | Yığın                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Ve 0x00-0x1F bellek konumları artık 0x04 verisini içerir (0x00-0x1E tamamen sıfırdır, 0x1F ise dörttür)

| Ofset | İşlem kodu | Yığın                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Yani depolamada, 0x000...0004'ün SHA3'ünden başlayan ve her geçerli çağrı verisi değeri (Storage[4] altındaki değer) için bir girdi içeren bir arama tablosu vardır.

| Ofset | İşlem kodu | Yığın                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Biz zaten [0xDA ofsetindeki kodun](#the-da-code) ne yaptığını biliyoruz, yığının en üstündeki değeri çağırana döndürür. Yani bu fonksiyon, arama tablosundaki değeri çağırana döndürür.

## 0x1f135823 {#0x1f135823}

0xC4-0xCF ofsetlerindeki kod, `splitter()` içinde 0x103-0x10E'de gördüğümüzle aynıdır (`JUMPI` hedefi dışında), bu yüzden bu fonksiyonun da `payable` olmadığını biliyoruz.

| Ofset | İşlem Kodu   | Yığın             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

[0xDA ofsetindeki kodun](#the-da-code) ne yaptığını zaten biliyoruz, yığının en üstündeki değeri çağırana döndürür. Yani bu fonksiyon `Value*` döndürür.

### Metot Özeti {#method-summary}

Bu noktada sözleşmeyi anladığınızı hissediyor musunuz? Ben hissetmiyorum. Şimdiye kadar şu metotlara sahibiz:

| Metot                             | Anlamı                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | Çağrı tarafından sağlanan değeri kabul et ve `Value*` değerini bu miktar kadar artır           |
| [splitter()](#splitter)           | Storage[3]'ü, yani vekil kontrat adresini döndür                                                 |
| [currentWindow()](#currentwindow) | Storage[1]'i döndür                                                                    |
| [merkleRoot()](#merkleroot)        | Storage[0]'ı döndür                                                                    |
| [0x81e580d3](#0x81e580d3)         | Parametrenin Storage[4]'ten küçük olması koşuluyla, bir arama tablosundan değeri döndür |
| [0x1f135823](#0x1f135823)         | Storage[6]'yı, diğer adıyla Value\*'ı döndür                                                    |

Ancak diğer tüm işlevlerin Storage[3]'teki sözleşme tarafından sağlandığını biliyoruz. Belki o sözleşmenin ne olduğunu bilseydik bize bir ipucu verebilirdi. Neyse ki, bu bir blokzincir ve en azından teoride her şey biliniyor. Storage[3]'ü ayarlayan herhangi bir metot görmedik, bu yüzden kurucu tarafından ayarlanmış olmalı.

## Kurucu {#the-constructor}

Bir [sözleşmeye baktığımızda](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) onu oluşturan işlemi de görebiliriz.

![Click the create transaction](create-tx.png)

Bu işleme ve ardından **Durum** sekmesine tıklarsak, parametrelerin başlangıç değerlerini görebiliriz. Özellikle, Storage[3]'ün [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761) içerdiğini görebiliriz. Bu sözleşme eksik işlevselliği içeriyor olmalıdır. İncelediğimiz sözleşme için kullandığımız aynı araçları kullanarak onu anlayabiliriz.

## Vekil Kontrat {#the-proxy-contract}

Yukarıdaki orijinal sözleşme için kullandığımız aynı teknikleri kullanarak, sözleşmenin şu durumlarda geri alındığını görebiliriz:

- Çağrıya eklenmiş herhangi bir ETH varsa (0x05-0x0F)
- Çağrı verisi boyutu dörtten küçükse (0x10-0x19 ve 0xBE-0xC2)

Ve desteklediği yöntemler şunlardır:

| Yöntem                                                                                                          | Yöntem imzası                | Atlanacak ofset     |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

Alttaki dört yöntemi görmezden gelebiliriz çünkü onlara asla ulaşamayacağız. İmzaları, orijinal sözleşmemizin bunları kendi başına halledeceği şekildedir (ayrıntıları yukarıda görmek için imzalara tıklayabilirsiniz), bu yüzden bunlar [geçersiz kılınan yöntemler](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf) olmalıdır.

Kalan yöntemlerden biri `claim(<params>)` ve diğeri `isClaimed(<params>)`'dir, bu yüzden bir airdrop sözleşmesi gibi görünüyor. Geri kalanını işlem kodu (opcode) işlem kodu incelemek yerine, bu sözleşmedeki üç işlev için kullanılabilir sonuçlar üreten [geri derleyiciyi (decompiler) deneyebiliriz](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Diğerlerini tersine mühendislikle çözmek okuyucuya bir alıştırma olarak bırakılmıştır.

### scaleAmountByPercentage {#scaleamountbypercentage}

Geri derleyicinin bu işlev için bize verdiği şey şudur:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

İlk `require`, çağrı verisinin, işlev imzasının dört baytına ek olarak, iki parametre için yeterli olan en az 64 bayta sahip olup olmadığını test eder. Eğer yoksa, açıkça yanlış bir şeyler vardır.

`if` ifadesi, `_param1` değerinin sıfır olmadığını ve `_param1 * _param2` değerinin negatif olmadığını kontrol ediyor gibi görünüyor. Bu muhtemelen başa sarma (wrap around) durumlarını önlemek içindir.

Son olarak, işlev ölçeklenmiş bir değer döndürür.

### claim {#claim}

Geri derleyicinin oluşturduğu kod karmaşıktır ve tamamı bizimle ilgili değildir. Yararlı bilgiler sağladığına inandığım satırlara odaklanmak için bir kısmını atlayacağım.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Burada iki önemli şey görüyoruz:

- `_param2`, bir `uint256` olarak bildirilmiş olsa da, aslında bir adrestir
- `_param1`, talep edilen penceredir ve `currentWindow` veya daha öncesi olmalıdır.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Böylece artık Storage[5]'in pencereler ve adreslerden oluşan bir dizi olduğunu ve adresin o pencere için ödülü talep edip etmediğini biliyoruz.

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

`unknown2eb4a7ab`'nın aslında `merkleRoot()` işlevi olduğunu biliyoruz, bu nedenle bu kod bir [Merkle kanıtını](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) doğruluyor gibi görünüyor. Bu, `_param4`'nin bir Merkle kanıtı olduğu anlamına gelir.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Bir sözleşme kendi ETH'sini başka bir adrese (sözleşme veya harici olarak sahip olunan) bu şekilde transfer eder. Onu, transfer edilecek miktar olan bir değerle çağırır. Yani bu bir ETH airdrop'u gibi görünüyor.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Alttaki iki satır bize Storage[2]'nin aynı zamanda çağırdığımız bir sözleşme olduğunu söylüyor. [Kurucu (constructor) işlemine bakarsak](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), bu sözleşmenin [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), yani [kaynak kodu Etherscan'e yüklenmiş](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code) bir Sarılmış Ether (Wrapped Ether) sözleşmesi olduğunu görürüz.

Yani sözleşmeler `_param2` adresine ETH göndermeye çalışıyor gibi görünüyor. Bunu yapabilirse, harika. Yapamazsa, [WETH](https://weth.tkn.eth.limo/) göndermeye çalışır. Eğer `_param2` harici olarak sahip olunan bir hesap (EOA) ise her zaman ETH alabilir, ancak sözleşmeler ETH almayı reddedebilir. Ancak, WETH bir ERC-20'dir ve sözleşmeler bunu kabul etmeyi reddedemez.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

İşlevin sonunda bir günlük girdisinin oluşturulduğunu görüyoruz. [Oluşturulan günlük girdilerine bakın](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) ve `0xdbd5...` ile başlayan konuyu filtreleyin. [Böyle bir girdi oluşturan işlemlerden birine tıklarsak](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), bunun gerçekten de bir talep gibi göründüğünü anlarız - hesap, tersine mühendislik yaptığımız sözleşmeye bir mesaj gönderdi ve karşılığında ETH aldı.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Bu işlev, yukarıdaki [`claim`](#claim) işlevine çok benzer. Ayrıca bir Merkle kanıtını kontrol eder, ilkine ETH transfer etmeye çalışır ve aynı türde günlük girdisi üretir.

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

Temel fark, ilk parametre olan çekilecek pencerenin orada olmamasıdır. Bunun yerine, talep edilebilecek tüm pencereler üzerinde bir döngü vardır.

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

Yani tüm pencereleri talep eden bir `claim` varyantı gibi görünüyor.

## Sonuç {#conclusion}

Şimdiye kadar, işlem kodlarını veya (çalıştığında) geri derleyiciyi kullanarak kaynak kodu mevcut olmayan sözleşmeleri nasıl anlayacağınızı öğrenmiş olmalısınız. Bu makalenin uzunluğundan da anlaşılacağı üzere, bir sözleşmeye tersine mühendislik uygulamak basit bir iş değildir, ancak güvenliğin esas olduğu bir sistemde sözleşmelerin vaat edildiği gibi çalıştığını doğrulayabilmek önemli bir beceridir.

[Çalışmalarımın daha fazlasını görmek için buraya göz atın](https://cryptodocguy.pro/).