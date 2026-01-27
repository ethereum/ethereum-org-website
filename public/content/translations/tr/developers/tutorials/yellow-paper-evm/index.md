---
title: Sarı Kağıdın EVM Spesifikasyonlarını Anlama
description: Ethereum için resmi spesifikasyonlar olan Sarı Kağıt'ın, Ethereum Sanal Makinesi'ni (EVM) açıklayan bölümünü anlama.
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: tr
published: 15.05.2022
---

[Sarı Kağıt](https://ethereum.github.io/yellowpaper/paper.pdf), Ethereum'un resmi spesifikasyonudur. [EIP süreci](/eips/) tarafından değiştirilen yerler dışında, her şeyin tam olarak nasıl çalıştığının açıklamasını içerir. Programcıların aşina olmayabileceği bir terminoloji içeren matematiksel bir makale olarak yazılmıştır. Bu makalede, onu ve dolayısıyla ilgili diğer matematiksel makaleleri nasıl okuyacağınızı öğreneceksiniz.

## Hangi Sarı Kağıt? {#which-yellow-paper}

Ethereum'daki hemen hemen her şey gibi Sarı Kağıt da zamanla gelişir. Belirli bir sürüme atıfta bulunabilmek için, bu yazının yazıldığı andaki [güncel sürümü](yellow-paper-berlin.pdf) yükledim. Kullandığım bölüm, sayfa ve denklem numaraları o sürüme atıfta bulunacaktır. Bu belgeyi okurken başka bir pencerede açık tutmak iyi bir fikirdir.

### Neden EVM? {#why-the-evm}

Orijinal sarı kağıt, Ethereum'un geliştirilmesinin en başında yazılmıştır. Ağı güvence altına almak için başlangıçta kullanılan, iş ispatı tabanlı orijinal mutabakat mekanizmasını açıklamaktadır. Ancak Ethereum, Eylül 2022'de iş ispatını bırakarak hisse ispatı tabanlı mutabakat kullanmaya başladı. Bu öğretici, sarı kağıdın Ethereum Sanal Makinesi'ni tanımlayan kısımlarına odaklanacaktır. EVM, hisse ispatına geçişten etkilenmemiştir (DIFFICULTY işlem kodunun geri dönüş değeri hariç).

## 9 Yürütme modeli {#9-execution-model}

Bu bölüm (s. 12-14), EVM tanımının çoğunu içerir.

_Sistem durumu_ terimi, sistemi çalıştırmak için sistem hakkında bilmeniz gereken her şeyi içerir. Tipik bir bilgisayarda bu, bellek, yazmaçların içeriği vb. anlamına gelir.

[Turing makinesi](https://en.wikipedia.org/wiki/Turing_machine) bir hesaplama modelidir. Esasen bu, bir bilgisayarın basitleştirilmiş bir sürümüdür ve normal bir bilgisayarın yapabildiği hesaplamaları yapma yeteneğine sahip olduğu kanıtlanmıştır (bir bilgisayarın hesaplayabildiği her şeyi bir Turing makinesi de hesaplayabilir ve bunun tersi de geçerlidir). Bu model, neyin hesaplanabilir olup neyin olmadığına dair çeşitli teoremleri kanıtlamayı kolaylaştırır.

[Turing-tam](https://en.wikipedia.org/wiki/Turing_completeness) terimi, bir Turing makinesi ile aynı hesaplamaları yapabilen bir bilgisayar anlamına gelir. Turing makineleri sonsuz döngülere girebilir, ancak EVM gazı biteceği için giremez, bu yüzden sadece yarı-Turing-tamdır.

## 9.1 Temel Bilgiler {#91-basics}

Bu bölüm, EVM'nin temellerini ve diğer hesaplama modelleriyle nasıl karşılaştırıldığını açıklar.

[Yığın makinesi](https://en.wikipedia.org/wiki/Stack_machine), ara verileri yazmaçlarda değil, bir [**yığında**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)) depolayan bir bilgisayardır. Uygulaması kolay olduğu için bu, sanal makineler için tercih edilen mimaridir, bu da hataların ve güvenlik açıklarının çok daha az olası olduğu anlamına gelir. Yığındaki bellek 256 bitlik kelimelere bölünür. Bu, Ethereum'un Keccak-256 ile özetleme ve eliptik eğri hesaplamaları gibi temel kriptografik işlemleri için uygun olduğu için seçilmiştir. Yığının maksimum boyutu 1024 öğedir (1024 x 256 bit). İşlem kodları yürütüldüğünde, parametrelerini genellikle yığından alırlar. Yığındaki öğeleri yeniden düzenlemek için özel olarak `POP` (yığının en üstündeki öğeyi kaldırır), `DUP_N` (yığındaki N'inci öğeyi çoğaltır) vb. gibi işlem kodları vardır.

EVM'nin ayrıca, yürütme sırasında veri depolamak için kullanılan **bellek** adında geçici bir alanı vardır. Bu bellek, 32 baytlık kelimeler halinde düzenlenmiştir. Tüm bellek konumları sıfıra başlatılır. Belleğe bir kelime eklemek için bu [Yul](https://docs.soliditylang.org/en/latest/yul.html) kodunu yürütürseniz, kelimedeki boş alanı sıfırlarla doldurarak 32 baytlık belleği doldurur, yani 0-29 konumlarında sıfırlar, 30. konumda 0x60 ve 31. konumda 0xA7 olan bir kelime oluşturur.

```yul
mstore(0, 0x60A7)
```

`mstore`, EVM'nin bellekle etkileşim için sağladığı üç işlem kodundan biridir - belleğe bir kelime yükler. Diğer ikisi, belleğe tek bir bayt yükleyen `mstore8` ve bellekten yığına bir kelime taşıyan `mload`'dur.

EVM'nin ayrıca sistem durumunun bir parçası olarak tutulan ayrı, kalıcı bir **depolama** modeli vardır - bu bellek (yığındaki kelime adresli bayt dizilerinin aksine) kelime dizileri halinde düzenlenmiştir. Bu depolama, sözleşmelerin kalıcı verilerini tuttuğu yerdir - bir sözleşme yalnızca kendi depolamasıyla etkileşime girebilir. Depolama, anahtar-değer eşlemeleri şeklinde düzenlenir.

Sarı Kağıt'ın bu bölümünde bahsedilmese de, dördüncü bir bellek türünün olduğunu bilmek de faydalıdır. **Çağrı verileri**, bir işlemin `veri` parametresiyle aktarılan değeri depolamak için kullanılan bayt adresli, salt okunur bir bellektir. EVM'nin `calldata` yönetimi için özel işlem kodları vardır. `calldatasize`, verilerin boyutunu döndürür. `calldataload` veriyi yığına yükler. `calldatacopy` veriyi belleğe kopyalar.

Standart [Von Neumann mimarisi](https://en.wikipedia.org/wiki/Von_Neumann_architecture), kodu ve veriyi aynı bellekte saklar. EVM, güvenlik nedenleriyle bu standardı izlemez - geçici belleği paylaşmak program kodunu değiştirmeyi mümkün kılar. Bunun yerine kod, depolamaya kaydedilir.

Kodun bellekten yürütüldüğü sadece iki durum vardır:

- Bir sözleşme, başka bir sözleşme oluşturduğunda ([`CREATE`](https://www.evm.codes/#f0) veya [`CREATE2`](https://www.evm.codes/#f5) kullanarak), sözleşme oluşturucunun kodu bellekten gelir.
- _Herhangi bir_ sözleşmenin oluşturulması sırasında, kurucu kod çalışır ve ardından asıl sözleşmenin kodunu (yine bellekten) döndürür.

İstisnai yürütme terimi, mevcut sözleşmenin yürütülmesinin durmasına neden olan bir istisna anlamına gelir.

## 9.2 Ücretlere genel bakış {#92-fees-overview}

Bu bölüm, gaz ücretlerinin nasıl hesaplandığını açıklar. Üç maliyet vardır:

### İşlem kodu maliyeti {#opcode-cost}

Belirli işlem kodunun doğal maliyeti. Bu değeri elde etmek için Ek H'deki (s. 28, denklem (327) altında) işlem kodunun maliyet grubunu ve denklem (324)'teki maliyet grubunu bulun. Bu size bir maliyet fonksiyonu verir, bu da çoğu durumda Ek G'deki (s. 27) parametreleri kullanır.

Örneğin, [`CALLDATACOPY`](https://www.evm.codes/#37) işlem kodu, _W<sub>copy</sub>_ grubunun bir üyesidir. Bu grubun işlem kodu maliyeti _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_ şeklindedir. Ek G'ye baktığımızda, her iki sabitin de 3 olduğunu görürüz, bu da bize _3+3×⌈μ<sub>s</sub>[2]÷32⌉_ sonucunu verir.

_⌈μ<sub>s</sub>[2]÷32⌉_ ifadesini hâlâ çözmemiz gerekiyor. En dıştaki kısım olan _⌈ \<değer\> ⌉_, tavan fonksiyonudur; bu fonksiyon, verilen bir değer için o değerden küçük olmayan en küçük tam sayıyı döndürür. Örneğin, _⌈2.5⌉ = ⌈3⌉ = 3_. İç kısım _μ<sub>s</sub>[2]÷32_'dir. 3. sayfadaki 3. bölüme (Kurallar) bakıldığında, _μ_ makine durumudur. Makine durumu, 13. sayfadaki 9.4.1 bölümünde tanımlanmıştır. O bölüme göre, makine durumu parametrelerinden biri yığın için olan _s_'dir. Hepsini bir araya getirdiğimizde, _μ<sub>s</sub>[2]_ yığındaki 2 numaralı konum gibi görünüyor. [İşlem koduna](https://www.evm.codes/#37) bakıldığında, yığındaki 2 numaralı konum, verinin bayt cinsinden boyutudur. W<sub>copy</sub> grubundaki diğer işlem kodlarına, yani [`CODECOPY`](https://www.evm.codes/#39) ve [`RETURNDATACOPY`](https://www.evm.codes/#3e) kodlarına bakıldığında, onların da aynı konumda bir veri boyutuna sahip olduğu görülür. Yani _⌈μ<sub>s</sub>[2]÷32⌉_, kopyalanan veriyi depolamak için gereken 32 baytlık kelimelerin sayısıdır. Hepsini bir araya getirdiğimizde, [`CALLDATACOPY`](https://www.evm.codes/#37) işleminin doğal maliyeti 3 gaz artı kopyalanan her veri kelimesi başına 3 gazdır.

### Çalıştırma maliyeti {#running-cost}

Çağırdığımız kodu çalıştırmanın maliyeti.

- [`CREATE`](https://www.evm.codes/#f0) ve [`CREATE2`](https://www.evm.codes/#f5) durumunda, yeni sözleşmenin kurucusu.
- [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) veya [`DELEGATECALL`](https://www.evm.codes/#f4) durumunda, çağırdığımız sözleşme.

### Bellek genişletme maliyeti {#expanding-memory-cost}

Bellek genişletme maliyeti (gerekirse).

Denklem 324'te bu değer _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_ olarak yazılır. 9.4.1 bölümüne tekrar baktığımızda _μ<sub>i</sub>_'nin bellekteki kelime sayısı olduğunu görürüz. Yani _μ<sub>i</sub>_ işlem kodundan önceki bellekteki kelime sayısıdır ve _μ<sub>i</sub>'_ işlem kodundan sonraki bellekteki kelime sayısıdır.

_C<sub>mem</sub>_ fonksiyonu denklem 326'da şu şekilde tanımlanır: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ taban fonksiyonudur; bu fonksiyon, verilen bir değer için o değerden büyük olmayan en büyük tam sayıyı döndürür. Örneğin, _⌊2.5⌋ = ⌊2⌋ = 2._ _a < √512_ olduğunda, _a<sup>2</sup> < 512_ olur ve taban fonksiyonunun sonucu sıfırdır. Yani ilk 22 kelime (704 bayt) için maliyet, gereken bellek kelimesi sayısıyla doğrusal olarak artar. Bu noktanın ötesinde _⌊a<sup>2</sup> ÷ 512⌋_ pozitiftir. Gereken bellek yeterince yüksek olduğunda, gaz maliyeti bellek miktarının karesiyle orantılıdır.

**Not**: Bu faktörler yalnızca _doğal_ gaz maliyetini etkiler. Bir son kullanıcının ne kadar ödemesi gerektiğini belirleyen ücret piyasasını veya doğrulayıcılara verilen ipuçlarını hesaba katmaz. Bu sadece EVM'de belirli bir işlemi çalıştırmanın ham maliyetidir.

[Gaz hakkında daha fazlasını okuyun](/developers/docs/gas/).

## 9.3 Yürütme ortamı {#93-execution-env}

Yürütme ortamı, blokzincir durumunun veya EVM'nin bir parçası olmayan bilgileri içeren bir demet olan _I_'dır.

| Parametre       | Veriye erişim için işlem kodu                                                                                  | Veriye erişim için Solidity kodu                        |
| --------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                         | `address(this)`                                         |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                          | `tx.origin`                                             |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                        | `tx.gasprice`                                           |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35) vb.                                                | `msg.data`                                              |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                          | `msg.sender`                                            |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                       | `msg.value`                                             |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                        | `address(this).code`                                    |
| _I<sub>H</sub>_ | Blok başlığı alanları, [`NUMBER`](https://www.evm.codes/#43) ve [`DIFFICULTY`](https://www.evm.codes/#44) gibi | `block.number`, `block.difficulty`, vb. |
| _I<sub>e</sub>_ | Sözleşmeler arasındaki çağrılar için çağrı yığınının derinliği (sözleşme oluşturma dahil)   |                                                         |
| _I<sub>w</sub>_ | EVM'nin durumu değiştirmesine izin veriliyor mu yoksa statik olarak mı çalışıyor                               |                                                         |

9. bölümün geri kalanını anlamak için birkaç parametre daha gereklidir:

| Parametre | Tanımlandığı bölüm                                             | Anlamı                                                                                                                                                                                                                                                               |
| --------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (s. 2, denklem 1)         | Blokzincir durumu                                                                                                                                                                                                                                                    |
| _g_       | 9.3 (s. 13) | Kalan gaz                                                                                                                                                                                                                                                            |
| _A_       | 6.1 (s. 8)  | Birikmiş alt durum (işlem bittiğinde gerçekleşmesi planlanan değişiklikler)                                                                                                                                                                       |
| _o_       | 9.3 (s. 13) | Çıktı - dahili işlem (bir sözleşmenin diğerini çağırdığı durum) ve görüntüleme işlevlerine (yalnızca bilgi istediğiniz, dolayısıyla bir işlemi beklemenize gerek olmayan durum) yapılan çağrılar durumunda döndürülen sonuçtur |

## 9.4 Yürütmeye genel bakış {#94-execution-overview}

Tüm ön bilgileri edindiğimize göre, nihayet EVM'nin nasıl çalıştığını incelemeye başlayabiliriz.

137-142 arası denklemler bize EVM'yi çalıştırmak için başlangıç koşullarını verir:

| Sembol           | Başlangıç değeri                                                                 | Anlamı                                                                                                                                                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Kalan gaz                                                                                                                                                                                                                                                                                          |
| _μ<sub>pc</sub>_ | _0_                                                                              | Program sayacı, yürütülecek bir sonraki komutun adresi                                                                                                                                                                                                                                             |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Bellek, tamamı sıfır olarak başlatılır                                                                                                                                                                                                                                                             |
| _μ<sub>i</sub>_  | _0_                                                                              | Kullanılan en yüksek bellek konumu                                                                                                                                                                                                                                                                 |
| _μ<sub>s</sub>_  | _()_                                                          | Yığın, başlangıçta boştur                                                                                                                                                                                                                                                                          |
| _μ<sub>o</sub>_  | _∅_                                                                              | Çıktı, geri dönüş verisiyle ([`RETURN`](https://www.evm.codes/#f3) veya [`REVERT`](https://www.evm.codes/#fd)) veya verisiz ([`STOP`](https://www.evm.codes/#00) veya [`SELFDESTRUCT`](https://www.evm.codes/#ff)) durana kadar boş kümedir. |

Denklem 143, yürütme sırasında her zaman noktasında dört olası koşul olduğunu ve bunlarla ne yapılacağını söyler:

1. `Z(σ,μ,A,I)`. Z, bir işlemin geçersiz bir durum geçişi oluşturup oluşturmadığını test eden bir işlevi temsil eder (bkz. [istisnai durdurma](#942-exceptional-halting)). Doğru olarak değerlendirilirse, değişiklikler uygulanmadığı için yeni durum (gaz yakılması hariç) eski durumla aynıdır.
2. Yürütülen işlem kodu [`REVERT`](https://www.evm.codes/#fd) ise, yeni durum eski durumla aynıdır, bir miktar gaz kaybolur.
3. İşlem dizisi bir [`RETURN`](https://www.evm.codes/#f3)) ile belirtildiği gibi biterse, durum yeni duruma güncellenir.
4. 1-3 bitiş koşullarından birinde değilsek, çalıştırmaya devam edin.

## 9.4.1 Makine Durumu {#941-machine-state}

Bu bölüm makine durumunu daha ayrıntılı olarak açıklamaktadır. _w_'nin geçerli işlem kodu olduğunu belirtir. _μ<sub>pc</sub>_, kodun uzunluğu olan _||I<sub>b</sub>||_'den küçükse, o bayt (_I<sub>b</sub>[μ<sub>pc</sub>]_) işlem kodudur. Aksi takdirde, işlem kodu [`STOP`](https://www.evm.codes/#00) olarak tanımlanır.

Bu bir [yığın makinesi](https://en.wikipedia.org/wiki/Stack_machine) olduğu için, her işlem kodu tarafından çıkarılan (_δ_) ve itilen (_α_) öğelerin sayısını takip etmemiz gerekir.

## 9.4.2 İstisnai Durdurma {#942-exceptional-halt}

Bu bölüm, anormal bir sonlandırma olduğunda belirten _Z_ fonksiyonunu tanımlar. Bu bir [Boole](https://en.wikipedia.org/wiki/Boolean_data_type) işlevidir, bu nedenle [mantıksal veya için _∨_](https://en.wikipedia.org/wiki/Logical_disjunction) ve [mantıksal ve için _∧_](https://en.wikipedia.org/wiki/Logical_conjunction) kullanır.

Bu koşullardan herhangi biri doğruysa istisnai bir durdurma olur:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  9.2. bölümde gördüğümüz gibi, _C_ gaz maliyetini belirten fonksiyondur. Bir sonraki işlem kodunu karşılayacak kadar gaz kalmadı.

- **_δ<sub>w</sub>=∅_**
  Bir işlem kodu için çıkarılan öğe sayısı tanımsızsa, işlem kodunun kendisi de tanımsızdır.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Yığın yetersizliği, mevcut işlem kodu için yığında yeterli öğe yok.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  İşlem kodu [`JUMP`](https://www.evm.codes/#56) ve adres bir [`JUMPDEST`](https://www.evm.codes/#5b) değil. Atlamalar _yalnızca_ hedefin bir [`JUMPDEST`](https://www.evm.codes/#5b) olduğu durumlarda geçerlidir.

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  İşlem kodu [`JUMPI`](https://www.evm.codes/#57), koşul doğru (sıfır değil) bu yüzden atlama gerçekleşmeli ve adres bir [`JUMPDEST`](https://www.evm.codes/#5b) değil. Atlamalar _yalnızca_ hedefin bir [`JUMPDEST`](https://www.evm.codes/#5b) olduğu durumlarda geçerlidir.

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  İşlem kodu [`RETURNDATACOPY`](https://www.evm.codes/#3e). Bu işlem kodunda yığın elemanı _μ<sub>s</sub>[1]_, geri dönüş veri arabelleğinde okunacak ofsettir ve yığın elemanı _μ<sub>s</sub>[2]_ verinin uzunluğudur. Bu durum, geri dönüş veri arabelleğinin sonunun ötesini okumaya çalıştığınızda meydana gelir. Çağrı verileri veya kodun kendisi için benzer bir koşul olmadığını unutmayın. Bu arabelleklerin sonunun ötesini okumaya çalıştığınızda yalnızca sıfırlar elde edersiniz.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Yığın taşması. İşlem kodunu çalıştırmak 1024'ten fazla öğeye sahip bir yığınla sonuçlanırsa, işlemi iptal et.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Statik olarak mı çalışıyoruz ([¬ olumsuzlamadır](https://en.wikipedia.org/wiki/Negation) ve _I<sub>w</sub>_, blokzincir durumunu değiştirmemize izin verildiğinde doğrudur)? Eğer öyleyse ve durum değiştiren bir işlem deniyorsak, bu gerçekleşemez.

  _W(w,μ)_ fonksiyonu daha sonra denklem 150'de tanımlanmıştır. _W(w,μ)_ aşağıdaki koşullardan biri doğruysa doğrudur:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Bu işlem kodları, yeni bir sözleşme oluşturarak, bir değer depolayarak veya mevcut sözleşmeyi yok ederek durumu değiştirir.

  - **_LOG0≤w ∧ w≤LOG4_**
    Statik olarak çağrılırsak günlük girdileri yayımlayamayız.
    Günlük işlem kodlarının tümü [`LOG0` (A0)](https://www.evm.codes/#a0) ile [`LOG4` (A4)](https://www.evm.codes/#a4) aralığındadır.
    Günlük işlem kodundan sonraki sayı, günlük girdisinin kaç konu içerdiğini belirtir.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Statik durumdayken başka bir sözleşmeyi arayabilirsiniz, ancak bunu yaparsanız ona ETH aktaramazsınız.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  G<sub>callstipend</sub>'den (Ek G'de 2300 olarak tanımlanmıştır) daha fazla gazınız yoksa [`SSTORE`](https://www.evm.codes/#55) çalıştıramazsınız.

## 9.4.3 Atlama Hedefi Geçerliliği {#943-jump-dest-valid}

Burada [`JUMPDEST`](https://www.evm.codes/#5b) işlem kodlarının ne olduğunu resmi olarak tanımlıyoruz. Sadece 0x5B bayt değerine bakamayız, çünkü bir PUSH'un içinde olabilir (ve bu nedenle bir işlem kodu değil, veridir).

Denklem (153)'te bir fonksiyon olan _N(i,w)_'yi tanımlıyoruz. İlk parametre olan _i_, işlem kodunun konumudur. İkinci parametre olan _w_, işlem kodunun kendisidir. Eğer _w∈[PUSH1, PUSH32]_ ise, bu, işlem kodunun bir PUSH olduğu anlamına gelir (köşeli parantezler uç noktaları içeren bir aralığı tanımlar). Bu durumda bir sonraki işlem kodu _i+2+(w−PUSH1)_ konumundadır. [`PUSH1`](https://www.evm.codes/#60) için iki bayt (PUSH'ın kendisi ve bir baytlık değer) ilerlememiz gerekir, [`PUSH2`](https://www.evm.codes/#61) için ise iki baytlık bir değer olduğu için üç bayt ilerlememiz gerekir, vb. Diğer tüm EVM işlem kodları sadece bir bayt uzunluğundadır, bu yüzden diğer tüm durumlarda _N(i,w)=i+1_'dir.

Bu fonksiyon, denklem (152)'de _D<sub>J</sub>(c,i)_'yi tanımlamak için kullanılır, bu da _c_ kodundaki tüm geçerli atlama hedeflerinin _i_ işlem kodu konumundan başlayan [kümesidir](https://en.wikipedia.org/wiki/Set_\(mathematics\)). Bu fonksiyon özyinelemeli olarak tanımlanmıştır. _i≥||c||_ ise, bu, kodun sonunda veya sonrasında olduğumuz anlamına gelir. Daha fazla atlama hedefi bulamayacağız, bu yüzden sadece boş kümeyi döndürün.

Diğer tüm durumlarda, bir sonraki işlem koduna giderek ve ondan başlayan kümeyi alarak kodun geri kalanına bakarız. _c[i]_ mevcut işlem kodudur, dolayısıyla _N(i,c[i])_ bir sonraki işlem kodunun konumudur. Dolayısıyla _D<sub>J</sub>(c,N(i,c[i]))_ bir sonraki işlem kodunda başlayan geçerli atlama hedefleri kümesidir. Mevcut işlem kodu bir `JUMPDEST` değilse, sadece o kümeyi döndürün. `JUMPDEST` ise, sonuç kümesine dahil edin ve onu döndürün.

## 9.4.4 Normal durdurma {#944-normal-halt}

Durdurma fonksiyonu _H_, üç tür değer döndürebilir.

- Bir durdurma işlem kodunda değilsek, _∅_ yani boş kümeyi döndürün. Geleneksel olarak, bu değer Boole yanlış olarak yorumlanır.
- Çıktı üretmeyen bir durdurma işlem kodumuz varsa ([`STOP`](https://www.evm.codes/#00) veya [`SELFDESTRUCT`](https://www.evm.codes/#ff)), geri dönüş değeri olarak sıfır boyutlu bir bayt dizisi döndürün. Bunun boş kümeden çok farklı olduğunu unutmayın. Bu değer, EVM'nin gerçekten durduğu, sadece okunacak bir geri dönüş verisi olmadığı anlamına gelir.
- Çıktı üreten bir durdurma işlem kodumuz varsa ([`RETURN`](https://www.evm.codes/#f3) veya [`REVERT`](https://www.evm.codes/#fd)), o işlem kodu tarafından belirtilen bayt dizisini döndürün. Bu dizi bellekten alınır, yığının en üstündeki değer (_μ<sub>s</sub>[0]_) ilk bayttır ve ondan sonraki değer (_μ<sub>s</sub>[1]_) uzunluktur.

## H.2 Komut seti {#h2-instruction-set}

EVM'nin son alt bölümü olan 9.5'e geçmeden önce, talimatların kendilerine bir göz atalım. Bunlar, s. 29'da başlayan Ek H.2'de tanımlanmıştır. Belirli bir işlem koduyla değiştiği belirtilmeyen her şeyin aynı kalması beklenir. Değişen değişkenler \<bir şey\>′ olarak belirtilir.

Örneğin, [`ADD`](https://www.evm.codes/#01) işlem koduna bakalım.

| Değer | Anımsatıcı | δ | α | Açıklama                                                                                                                                                                                                              |
| ----: | ---------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x01 | EKLE       | 2 | 1 | Toplama işlemi.                                                                                                                                                                                       |
|       |            |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_, yığından çıkardığımız değerlerin sayısıdır. Bu durumda iki, çünkü en üstteki iki değeri topluyoruz.

_α_, geri ittiğimiz değerlerin sayısıdır. Bu durumda bir, toplam.

Yani yeni yığın tepesi (_μ′<sub>s</sub>[0]_) eski yığın tepesinin (_μ<sub>s</sub>[0]_) ve onun altındaki eski değerin (_μ<sub>s</sub>[1]_) toplamıdır.

Bu makale, tüm işlem kodlarını "gözleri kamaştıran bir liste" ile gözden geçirmek yerine, yalnızca yeni bir şey sunan işlem kodlarını açıklamaktadır.

| Değer | Anımsatıcı | δ | α | Açıklama                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----: | ---------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256  | 2 | 1 | Keccak-256 karmasını hesaplayın.                                                                                                                                                                                                                                                                                                                                                                                                                     |
|       |            |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |            |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Bu, belleğe erişen ilk işlem kodudur (bu durumda, salt okunur). Ancak, belleğin mevcut sınırlarının ötesine genişleyebilir, bu nedenle _μ<sub>i</sub>_'yi güncellememiz gerekir. Bunu s. 29'daki denklem 328'de tanımlanan _M_ fonksiyonunu kullanarak yaparız.

| Değer | Anımsatıcı | δ | α | Açıklama                                            |
| ----: | ---------- | - | - | --------------------------------------------------- |
|  0x31 | BALANCE    | 1 | 1 | Verilen hesabın bakiyesini alın.    |
|       |            |   |   | ... |

Bakiyesini bulmamız gereken adres _μ<sub>s</sub>[0] mod 2<sup>160</sup>_'tır. Yığının tepesi adrestir, ancak adresler yalnızca 160 bit olduğu için değeri [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup> olarak hesaplarız.

_σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_ ise, bu adres hakkında bilgi olduğu anlamına gelir. Bu durumda, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ o adresin bakiyesidir. _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_ ise, bu adresin başlatılmadığı ve bakiyenin sıfır olduğu anlamına gelir. Hesap bilgisi alanlarının listesini s. 4'teki 4.1. bölümde görebilirsiniz.

İkinci denklem, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, sıcak depolamaya (yakın zamanda erişilmiş ve büyük olasılıkla önbelleğe alınmış depolama) ve soğuk depolamaya (erişilmemiş ve büyük olasılıkla daha yavaş ve alınması daha pahalı olan depolama) erişim arasındaki maliyet farkıyla ilgilidir. _A<sub>a</sub>_, s. 8'deki 6.1. bölümde tanımlandığı gibi, işlem tarafından daha önce erişilen ve bu nedenle erişimi daha ucuz olması gereken adreslerin listesidir. Bu konu hakkında daha fazla bilgiyi [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) adresinde okuyabilirsiniz.

| Değer | Anımsatıcı | δ  | α  | Açıklama                                                                                                                                        |
| ----: | ---------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x8F | DUP16      | 16 | 17 | 16. yığın öğesini çoğaltın.                                                                              |
|       |            |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Herhangi bir yığın öğesini kullanmak için onu çıkarmamız gerektiğini, bunun da üzerindeki tüm yığın öğelerini çıkarmamız gerektiği anlamına geldiğini unutmayın. [`DUP<n>`](https://www.evm.codes/#8f) ve [`SWAP<n>`](https://www.evm.codes/#9f) durumunda, bu, on altı kadar değeri çıkarıp sonra itmek anlamına gelir.

## 9.5 Yürütme döngüsü {#95-exec-cycle}

Artık tüm parçalara sahip olduğumuza göre, EVM'nin yürütme döngüsünün nasıl belgelendiğini nihayet anlayabiliriz.

Denklem (155), durum verildiğinde şunu söyler:

- _σ_ (küresel blokzincir durumu)
- _μ_ (EVM durumu)
- _A_ (alt durum, işlem bittiğinde gerçekleşecek değişiklikler)
- _I_ (yürütme ortamı)

Yeni durum _(σ', μ', A', I')_'dir.

(156)-(158) denklemleri yığını ve bir işlem kodu nedeniyle yığındaki değişikliği (_μ<sub>s</sub>_) tanımlar. Denklem (159) gazdaki değişimdir (_μ<sub>g</sub>_). Denklem (160) program sayacındaki değişimdir (_μ<sub>pc</sub>_). Son olarak, (161)-(164) denklemleri, işlem kodu tarafından açıkça değiştirilmediği sürece diğer parametrelerin aynı kaldığını belirtir.

Bununla EVM tamamen tanımlanmıştır.

## Sonuç {#conclusion}

Matematiksel gösterim kesindir ve Sarı Kağıt'ın Ethereum'un her ayrıntısını belirtmesine olanak tanımıştır. Ancak bazı dezavantajları vardır:

- Yalnızca insanlar tarafından anlaşılabilir, bu da [uyumluluk testlerinin](https://github.com/ethereum/tests) manuel olarak yazılması gerektiği anlamına gelir.
- Programcılar bilgisayar kodunu anlar.
  Matematiksel gösterimi anlıyor olabilirler veya anlamıyor olabilirler.

Belki de bu nedenlerden dolayı, daha yeni olan [mutabakat katmanı özellikleri](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) Python ile yazılmıştır. [Python'da yürütme katmanı özellikleri](https://ethereum.github.io/execution-specs) vardır, ancak bunlar tam değildir. Tüm Sarı Kağıt Python'a veya benzer bir dile çevrilene kadar Sarı Kağıt hizmette kalmaya devam edecek ve onu okuyabilmek faydalı olacaktır.
