---
title: "Sarı Bülten'in EVM Spesifikasyonlarını Anlamak"
description: "Ethereum'un resmi spesifikasyonları olan Sarı Bülten'in Ethereum sanal makinesini (EVM) açıklayan bölümünü anlamak."
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: "Sarı Bülten EVM"
lang: tr
published: 2022-05-15
---

[Sarı Bülten](https://ethereum.github.io/yellowpaper/paper.pdf), Ethereum için resmi spesifikasyondur. [EIP süreci](/eips/) tarafından değiştirildiği yerler haricinde, her şeyin nasıl çalıştığının kesin açıklamasını içerir. Programcıların aşina olmayabileceği terminolojiyi içeren matematiksel bir makale olarak yazılmıştır. Bu makalede onu ve dolayısıyla diğer ilgili matematiksel makaleleri nasıl okuyacağınızı öğreneceksiniz.

## Hangi Sarı Bülten? {#which-yellow-paper}

Ethereum'daki hemen hemen her şey gibi, Sarı Bülten de zamanla gelişir. Belirli bir sürüme atıfta bulunabilmek için, [yazının yazıldığı sıradaki mevcut sürümü](yellow-paper-berlin.pdf) yükledim. Kullandığım bölüm, sayfa ve denklem numaraları bu sürüme atıfta bulunacaktır. Bu belgeyi okurken onu farklı bir pencerede açık tutmak iyi bir fikirdir.

### Neden EVM? {#why-the-evm}

Orijinal sarı bülten, Ethereum'un gelişiminin tam başında yazılmıştır. Ağı güvence altına almak için başlangıçta kullanılan orijinal İş Kanıtı (PoW) tabanlı mutabakat mekanizmasını açıklar. Ancak Ethereum, Eylül 2022'de İş Kanıtı'nı (PoW) kapattı ve Hisse Kanıtı (PoS) tabanlı mutabakat kullanmaya başladı. Bu eğitim, sarı bültenin Ethereum Sanal Makinesi'ni tanımlayan kısımlarına odaklanacaktır. EVM, Hisse Kanıtı'na (PoS) geçişten etkilenmedi (DIFFICULTY işlem kodunun dönüş değeri hariç).

## 9 Yürütme modeli {#9-execution-model}

Bu bölüm (s. 12-14), EVM tanımının çoğunu içerir.

_Sistem durumu_ terimi, sistemi çalıştırmak için sistem hakkında bilmeniz gereken her şeyi içerir. Tipik bir bilgisayarda bu, bellek, yazmaçların içeriği vb. anlamına gelir.

Bir [Turing makinesi](https://en.wikipedia.org/wiki/Turing_machine) hesaplamalı bir modeldir. Temel olarak, normal bir bilgisayarın yapabileceği hesaplamaları çalıştırma yeteneğine sahip olduğu kanıtlanmış, bilgisayarın basitleştirilmiş bir versiyonudur (bir bilgisayarın hesaplayabileceği her şeyi bir Turing makinesi hesaplayabilir ve bunun tersi de geçerlidir). Bu model, neyin hesaplanabilir olup neyin olmadığına dair çeşitli teoremleri kanıtlamayı kolaylaştırır.

[Turing-tam](https://en.wikipedia.org/wiki/Turing_completeness) terimi, bir Turing makinesiyle aynı hesaplamaları çalıştırabilen bir bilgisayar anlamına gelir. Turing makineleri sonsuz döngülere girebilir, ancak EVM giremez çünkü gazı biter, bu yüzden sadece yarı Turing-tamdır.

## 9.1 Temeller {#91-basics}

Bu bölüm, EVM'nin temellerini ve diğer hesaplama modelleriyle nasıl karşılaştırıldığını verir.

Bir [yığın makinesi](https://en.wikipedia.org/wiki/Stack_machine), ara verileri yazmaçlarda değil, bir [**yığında (stack)**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) depolayan bir bilgisayardır. Bu, sanal makineler için tercih edilen mimaridir çünkü uygulanması kolaydır, bu da hataların ve güvenlik açıklarının çok daha az olası olduğu anlamına gelir. Yığındaki bellek 256 bitlik kelimelere (words) bölünmüştür. Bu, Keccak-256 hashleme ve eliptik eğri hesaplamaları gibi Ethereum'un temel kriptografik işlemleri için uygun olduğundan seçilmiştir. Yığının maksimum boyutu 1024 öğedir (1024 x 256 bit). İşlem kodları yürütüldüğünde genellikle parametrelerini yığından alırlar. `POP` (öğeyi yığının en üstünden kaldırır), `DUP_N` (yığındaki N'inci öğeyi çoğaltır) vb. gibi yığındaki öğeleri yeniden düzenlemek için özel işlem kodları vardır.

EVM ayrıca yürütme sırasında verileri depolamak için kullanılan **bellek (memory)** adı verilen geçici bir alana sahiptir. Bu bellek 32 baytlık kelimeler halinde düzenlenmiştir. Tüm bellek konumları sıfır olarak başlatılır. Belleğe bir kelime eklemek için bu [Yul](https://docs.soliditylang.org/en/latest/yul.html) kodunu yürütürseniz, kelimedeki boş alanı sıfırlarla doldurarak 32 baytlık belleği dolduracaktır, yani 0-29 konumlarında sıfırlar, 30'da 0x60 ve 31'de 0xA7 olan bir kelime oluşturur.

```yul
mstore(0, 0x60A7)
```

`mstore`, EVM'nin bellekle etkileşim için sağladığı üç işlem kodundan biridir - belleğe bir kelime yükler. Diğer ikisi, belleğe tek bir bayt yükleyen `mstore8` ve bellekten yığına bir kelime taşıyan `mload` işlem kodlarıdır.

EVM ayrıca sistem durumunun bir parçası olarak korunan ayrı bir kalıcı **depolama (storage)** modeline sahiptir - bu bellek (yığındaki kelime adreslenebilir bayt dizilerinin aksine) kelime dizileri halinde düzenlenmiştir. Bu depolama, sözleşmelerin kalıcı verileri tuttuğu yerdir - bir sözleşme yalnızca kendi depolamasıyla etkileşime girebilir. Depolama, anahtar-değer eşlemeleri şeklinde düzenlenmiştir.

Sarı Bülten'in bu bölümünde bahsedilmese de, dördüncü bir bellek türü olduğunu bilmek de faydalıdır. **Çağrı verisi (Calldata)**, bir işlemin `data` parametresiyle iletilen değeri depolamak için kullanılan bayt adreslenebilir salt okunur bellektir. EVM'nin `calldata` yönetimi için özel işlem kodları vardır. `calldatasize` verinin boyutunu döndürür. `calldataload` veriyi yığına yükler. `calldatacopy` veriyi belleğe kopyalar.

Standart [Von Neumann mimarisi](https://en.wikipedia.org/wiki/Von_Neumann_architecture) kodu ve veriyi aynı bellekte depolar. EVM güvenlik nedenleriyle bu standardı izlemez - geçici belleği paylaşmak program kodunu değiştirmeyi mümkün kılar. Bunun yerine, kod depolamaya kaydedilir.

Kodun bellekten yürütüldüğü yalnızca iki durum vardır:

- Bir sözleşme başka bir sözleşme oluşturduğunda ([`CREATE`](https://www.evm.codes/#f0) veya [`CREATE2`](https://www.evm.codes/#f5) kullanarak), sözleşme kurucusu için kod bellekten gelir.
- _Herhangi bir_ sözleşmenin oluşturulması sırasında, kurucu kodu çalışır ve ardından yine bellekten gelen asıl sözleşmenin koduyla geri döner.

İstisnai yürütme terimi, mevcut sözleşmenin yürütülmesinin durmasına neden olan bir istisna anlamına gelir.

## 9.2 Ücretlere genel bakış {#92-fees-overview}

Bu bölüm gaz ücretlerinin nasıl hesaplandığını açıklar. Üç maliyet vardır:

### İşlem kodu maliyeti {#opcode-cost}

Belirli işlem kodunun doğal maliyeti. Bu değeri elde etmek için, Ek H'de (s. 28, denklem (327) altında) işlem kodunun maliyet grubunu bulun ve denklem (324)'teki maliyet grubunu bulun. Bu size, çoğu durumda Ek G'deki (s. 27) parametreleri kullanan bir maliyet işlevi verir.

Örneğin, [`CALLDATACOPY`](https://www.evm.codes/#37) işlem kodu _W<sub>copy</sub>_ grubunun bir üyesidir. Bu grup için işlem kodu maliyeti _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_ şeklindedir. Ek G'ye baktığımızda, her iki sabitin de 3 olduğunu görüyoruz, bu da bize _3+3×⌈μ<sub>s</sub>[2]÷32⌉_ verir.

Hâlâ _⌈μ<sub>s</sub>[2]÷32⌉_ ifadesini çözmemiz gerekiyor. En dıştaki kısım olan _⌈ \<değer\> ⌉_ tavan işlevidir, bir değer verildiğinde değerden daha küçük olmayan en küçük tam sayıyı döndüren bir işlevdir. Örneğin, _⌈2.5⌉ = ⌈3⌉ = 3_. İç kısım _μ<sub>s</sub>[2]÷32_'dir. Sayfa 3'teki bölüm 3'e (Kurallar) bakıldığında, _μ_ makine durumudur. Makine durumu sayfa 13'teki bölüm 9.4.1'de tanımlanmıştır. Bu bölüme göre, makine durumu parametrelerinden biri yığın için _s_'dir. Hepsini bir araya getirdiğimizde, _μ<sub>s</sub>[2]_'nin yığındaki 2 numaralı konum olduğu görülüyor. [İşlem koduna](https://www.evm.codes/#37) bakıldığında, yığındaki 2 numaralı konum bayt cinsinden verinin boyutudur. W<sub>copy</sub> grubundaki diğer işlem kodlarına, [`CODECOPY`](https://www.evm.codes/#39) ve [`RETURNDATACOPY`](https://www.evm.codes/#3e)'ye bakıldığında, onların da aynı konumda bir veri boyutuna sahip oldukları görülür. Yani _⌈μ<sub>s</sub>[2]÷32⌉_, kopyalanan veriyi depolamak için gereken 32 baytlık kelimelerin sayısıdır. Her şeyi bir araya getirdiğimizde, [`CALLDATACOPY`](https://www.evm.codes/#37)'nin doğal maliyeti 3 gaz artı kopyalanan verinin her kelimesi için 3'tür.

### Çalıştırma maliyeti {#running-cost}

Çağırdığımız kodu çalıştırmanın maliyeti.

- [`CREATE`](https://www.evm.codes/#f0) ve [`CREATE2`](https://www.evm.codes/#f5) durumunda, yeni sözleşme için kurucu.
- [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) veya [`DELEGATECALL`](https://www.evm.codes/#f4) durumunda, çağırdığımız sözleşme.

### Bellek genişletme maliyeti {#expanding-memory-cost}

Belleği genişletmenin maliyeti (gerekirse).

Denklem 324'te bu değer _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_ olarak yazılır. Bölüm 9.4.1'e tekrar baktığımızda, _μ<sub>i</sub>_'nin bellekteki kelime sayısı olduğunu görüyoruz. Yani _μ<sub>i</sub>_ işlem kodundan önceki bellekteki kelime sayısıdır ve _μ<sub>i</sub>'_ işlem kodundan sonraki bellekteki kelime sayısıdır.

_C<sub>mem</sub>_ işlevi denklem 326'da tanımlanmıştır: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ taban işlevidir, bir değer verildiğinde değerden daha büyük olmayan en büyük tam sayıyı döndüren bir işlevdir. Örneğin, _⌊2.5⌋ = ⌊2⌋ = 2._ _a < √512_ olduğunda, _a<sup>2</sup> < 512_ olur ve taban işlevinin sonucu sıfırdır. Yani ilk 22 kelime (704 bayt) için maliyet, gereken bellek kelimesi sayısıyla doğrusal olarak artar. Bu noktanın ötesinde _⌊a<sup>2</sup> ÷ 512⌋_ pozitiftir. Gereken bellek yeterince yüksek olduğunda gaz maliyeti, bellek miktarının karesiyle orantılıdır.

**Not:** Bu faktörler yalnızca _doğal_ gaz maliyetini etkiler - bir son kullanıcının ne kadar ödemesi gerektiğini belirleyen ücret piyasasını veya doğrulayıcılara verilen bahşişleri hesaba katmaz - bu sadece EVM'de belirli bir işlemi yürütmenin ham maliyetidir.

[Gaz hakkında daha fazla bilgi edinin](/developers/docs/gas/).

## 9.3 Yürütme ortamı {#93-execution-env}

Yürütme ortamı, blokzincir durumunun veya EVM'nin bir parçası olmayan bilgileri içeren bir demettir (tuple), _I_.

| Parametre       | Veriye erişmek için işlem kodu                                                                                        | Veriye erişmek için Solidity kodu         |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), vb.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | [`NUMBER`](https://www.evm.codes/#43) ve [`DIFFICULTY`](https://www.evm.codes/#44) gibi blok başlığı alanları | `block.number`, `block.difficulty`, vb. |
| _I<sub>e</sub>_ | Sözleşmeler arası çağrılar için çağrı yığınının derinliği (sözleşme oluşturma dahil)                                |
| _I<sub>w</sub>_ | EVM'nin durumu değiştirmesine izin veriliyor mu, yoksa statik olarak mı çalışıyor                                                  |

Bölüm 9'un geri kalanını anlamak için birkaç başka parametre daha gereklidir:

| Parametre | Tanımlandığı bölüm   | Anlamı                                                                                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (s. 2, denklem 1) | Blokzincirin durumu                                                                                                                                                                                              |
| _g_       | 9.3 (s. 13)          | Kalan gaz                                                                                                                                                                                                            |
| _A_       | 6.1 (s. 8)           | Tahakkuk eden alt durum (işlem sona erdiğinde yapılması planlanan değişiklikler)                                                                                                                                                       |
| _o_       | 9.3 (s. 13)          | Çıktı - dahili işlem durumunda (bir sözleşme diğerini çağırdığında) ve view işlevlerine yapılan çağrılarda (sadece bilgi istediğinizde, bu nedenle bir işlem beklemenize gerek olmadığında) döndürülen sonuç |

## 9.4 Yürütmeye genel bakış {#94-execution-overview}

Artık tüm ön bilgilere sahip olduğumuza göre, nihayet EVM'nin nasıl çalıştığı üzerinde çalışmaya başlayabiliriz.

137-142 denklemleri bize EVM'yi çalıştırmak için başlangıç koşullarını verir:

| Sembol           | Başlangıç değeri | Anlamı                                                                                                                                                                                                                                                     |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Kalan gaz                                                                                                                                                                                                                                               |
| _μ<sub>pc</sub>_ | _0_           | Program sayacı, yürütülecek bir sonraki talimatın adresi                                                                                                                                                                                             |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Bellek, tamamı sıfır olarak başlatılır                                                                                                                                                                                                                            |
| _μ<sub>i</sub>_  | _0_           | Kullanılan en yüksek bellek konumu                                                                                                                                                                                                                                |
| _μ<sub>s</sub>_  | _()_          | Yığın, başlangıçta boş                                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_           | Çıktı, dönüş verisiyle ([`RETURN`](https://www.evm.codes/#f3) veya [`REVERT`](https://www.evm.codes/#fd)) veya dönüş verisi olmadan ([`STOP`](https://www.evm.codes/#00) veya [`SELFDESTRUCT`](https://www.evm.codes/#ff)) durmadığımız sürece boş küme. |

Denklem 143 bize yürütme sırasındaki her zaman noktasında dört olası koşul olduğunu ve bunlarla ne yapacağımızı söyler:

1.  `Z(σ,μ,A,I)`. Z, bir işlemin geçersiz bir durum geçişi yaratıp yaratmadığını test eden bir işlevi temsil eder (bkz. [istisnai durma](#942-exceptional-halt)). Eğer Doğru (True) olarak değerlendirilirse, değişiklikler uygulanmadığı için yeni durum eskisiyle aynıdır (gazın yanması hariç).
2.  Yürütülen işlem kodu [`REVERT`](https://www.evm.codes/#fd) ise, yeni durum eski durumla aynıdır, bir miktar gaz kaybedilir.
3.  İşlem dizisi bittiyse (bir [`RETURN`](https://www.evm.codes/#f3) ile belirtildiği gibi), durum yeni duruma güncellenir.
4.  1-3 bitiş koşullarından birinde değilsek, çalışmaya devam edin.

## 9.4.1 Makine Durumu {#941-machine-state}

Bu bölüm makine durumunu daha ayrıntılı olarak açıklar. _w_'nin mevcut işlem kodu olduğunu belirtir. Eğer _μ<sub>pc</sub>_, kodun uzunluğu olan _||I<sub>b</sub>||_'den küçükse, o bayt (_I<sub>b</sub>[μ<sub>pc</sub>]_) işlem kodudur. Aksi takdirde, işlem kodu [`STOP`](https://www.evm.codes/#00) olarak tanımlanır.

Bu bir [yığın makinesi](https://en.wikipedia.org/wiki/Stack_machine) olduğundan, her işlem kodu tarafından çıkarılan (_δ_) ve itilen (_α_) öğelerin sayısını takip etmemiz gerekir.

## 9.4.2 İstisnai Durma {#942-exceptional-halt}

Bu bölüm, ne zaman anormal bir sonlandırma yaşayacağımızı belirten _Z_ işlevini tanımlar. Bu bir [Boole](https://en.wikipedia.org/wiki/Boolean_data_type) işlevidir, bu nedenle [mantıksal veya için _∨_](https://en.wikipedia.org/wiki/Logical_disjunction) ve [mantıksal ve için _∧_](https://en.wikipedia.org/wiki/Logical_conjunction) kullanır.

Bu koşullardan herhangi biri doğruysa istisnai bir durma yaşarız:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Bölüm 9.2'de gördüğümüz gibi, _C_ gaz maliyetini belirten işlevdir. Bir sonraki işlem kodunu karşılayacak kadar gaz kalmamıştır.

- **_δ<sub>w</sub>=∅_**
  Bir işlem kodu için çıkarılan öğelerin sayısı tanımsızsa, işlem kodunun kendisi de tanımsızdır.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Yığın yetersizliği (underflow), mevcut işlem kodu için yığında yeterli öğe yok.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  İşlem kodu [`JUMP`](https://www.evm.codes/#56)'tır ve adres bir [`JUMPDEST`](https://www.evm.codes/#5b) değildir. Atlamalar (jumps) _yalnızca_ hedef bir [`JUMPDEST`](https://www.evm.codes/#5b) olduğunda geçerlidir.

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  İşlem kodu [`JUMPI`](https://www.evm.codes/#57)'dir, koşul doğrudur (sıfır değil) bu nedenle atlama gerçekleşmelidir ve adres bir [`JUMPDEST`](https://www.evm.codes/#5b) değildir. Atlamalar _yalnızca_ hedef bir [`JUMPDEST`](https://www.evm.codes/#5b) olduğunda geçerlidir.

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  İşlem kodu [`RETURNDATACOPY`](https://www.evm.codes/#3e)'dir. Bu işlem kodunda yığın öğesi _μ<sub>s</sub>[1]_ dönüş verisi arabelleğinde okunacak ofsettir ve yığın öğesi _μ<sub>s</sub>[2]_ verinin uzunluğudur. Bu koşul, dönüş verisi arabelleğinin sonunun ötesini okumaya çalıştığınızda oluşur. Çağrı verisi veya kodun kendisi için benzer bir koşul olmadığına dikkat edin. Bu arabelleklerin sonunun ötesini okumaya çalıştığınızda sadece sıfırlar alırsınız.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Yığın taşması (overflow). İşlem kodunu çalıştırmak 1024 öğeden fazla bir yığınla sonuçlanacaksa iptal et.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Statik olarak mı çalışıyoruz ([¬ olumsuzlamadır](https://en.wikipedia.org/wiki/Negation) ve blokzincir durumunu değiştirmemize izin verildiğinde _I<sub>w</sub>_ doğrudur)? Eğer öyleyse ve durumu değiştiren bir işlem deniyorsak, bu gerçekleşemez.

  _W(w,μ)_ işlevi daha sonra denklem 150'de tanımlanmıştır. Bu koşullardan biri doğruysa _W(w,μ)_ doğrudur:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Bu işlem kodları, yeni bir sözleşme oluşturarak, bir değer depolayarak veya mevcut sözleşmeyi yok ederek durumu değiştirir.

  - **_LOG0≤w ∧ w≤LOG4_**
    Statik olarak çağrılırsak günlük (log) girdileri yayımlayamayız.
    Günlük işlem kodlarının tümü [`LOG0` (A0)](https://www.evm.codes/#a0) ile [`LOG4` (A4)](https://www.evm.codes/#a4) aralığındadır.
    Günlük işlem kodundan sonraki sayı, günlük girdisinin kaç konu (topic) içerdiğini belirtir.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Statik olduğunuzda başka bir sözleşmeyi çağırabilirsiniz, ancak bunu yaparsanız ona ETH transfer edemezsiniz.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  G<sub>callstipend</sub> (Ek G'de 2300 olarak tanımlanmıştır) gazından daha fazlasına sahip olmadığınız sürece [`SSTORE`](https://www.evm.codes/#55) çalıştıramazsınız.

## 9.4.3 Atlama Hedefi Geçerliliği {#943-jump-dest-valid}

Burada [`JUMPDEST`](https://www.evm.codes/#5b) işlem kodlarının ne olduğunu resmi olarak tanımlıyoruz. Sadece 0x5B bayt değerini arayamayız, çünkü bir PUSH içinde olabilir (ve bu nedenle bir işlem kodu değil, veridir).

Denklem (153)'te bir _N(i,w)_ işlevi tanımlıyoruz. İlk parametre olan _i_, işlem kodunun konumudur. İkincisi olan _w_, işlem kodunun kendisidir. Eğer _w∈[PUSH1, PUSH32]_ ise bu, işlem kodunun bir PUSH olduğu anlamına gelir (köşeli parantezler uç noktaları içeren bir aralığı tanımlar). Bu durumda bir sonraki işlem kodu _i+2+(w−PUSH1)_ konumundadır. [`PUSH1`](https://www.evm.codes/#60) için iki bayt (PUSH'un kendisi ve bir baytlık değer) ilerlememiz gerekir, [`PUSH2`](https://www.evm.codes/#61) için üç bayt ilerlememiz gerekir çünkü iki baytlık bir değerdir vb. Diğer tüm EVM işlem kodları sadece bir bayt uzunluğundadır, bu nedenle diğer tüm durumlarda _N(i,w)=i+1_'dir.

Bu işlev, denklem (152)'de, _i_ işlem kodu konumundan başlayarak _c_ kodundaki tüm geçerli atlama hedeflerinin [kümesi](<https://en.wikipedia.org/wiki/Set_(mathematics)>) olan _D<sub>J</sub>(c,i)_'yi tanımlamak için kullanılır. Bu işlev özyinelemeli olarak tanımlanır. Eğer _i≥||c||_ ise, bu kodun sonunda veya sonrasında olduğumuz anlamına gelir. Daha fazla atlama hedefi bulamayacağız, bu yüzden sadece boş kümeyi döndürün.

Diğer tüm durumlarda, bir sonraki işlem koduna giderek ve ondan başlayan kümeyi alarak kodun geri kalanına bakarız. _c[i]_ mevcut işlem kodudur, bu nedenle _N(i,c[i])_ bir sonraki işlem kodunun konumudur. Bu nedenle _D<sub>J</sub>(c,N(i,c[i]))_, bir sonraki işlem kodundan başlayan geçerli atlama hedefleri kümesidir. Mevcut işlem kodu bir `JUMPDEST` değilse, sadece o kümeyi döndürün. Eğer `JUMPDEST` ise, onu sonuç kümesine dahil edin ve onu döndürün.

## 9.4.4 Normal durma {#944-normal-halt}

Durma işlevi _H_, üç tür değer döndürebilir.

- Bir durma işlem kodunda değilsek, boş küme olan _∅_ döndürün. Geleneksel olarak, bu değer Boole yanlışı (false) olarak yorumlanır.
- Çıktı üretmeyen bir durma işlem kodumuz varsa ([`STOP`](https://www.evm.codes/#00) veya [`SELFDESTRUCT`](https://www.evm.codes/#ff)), dönüş değeri olarak sıfır bayt boyutunda bir dizi döndürün. Bunun boş kümeden çok farklı olduğuna dikkat edin. Bu değer, EVM'nin gerçekten durduğu, sadece okunacak dönüş verisi olmadığı anlamına gelir.
- Çıktı üreten bir durma işlem kodumuz varsa ([`RETURN`](https://www.evm.codes/#f3) veya [`REVERT`](https://www.evm.codes/#fd)), o işlem kodu tarafından belirtilen bayt dizisini döndürün. Bu dizi bellekten alınır, yığının en üstündeki değer (_μ<sub>s</sub>[0]_) ilk bayttır ve ondan sonraki değer (_μ<sub>s</sub>[1]_) uzunluktur.

## H.2 Talimat seti {#h2-instruction-set}

EVM'nin son alt bölümü olan 9.5'e geçmeden önce, talimatların kendilerine bakalım. Bunlar sayfa 29'da başlayan Ek H.2'de tanımlanmıştır. O belirli işlem koduyla değiştiği belirtilmeyen her şeyin aynı kalması beklenir. Değişen değişkenler \<bir şey\>′ olarak belirtilir.

Örneğin, [`ADD`](https://www.evm.codes/#01) işlem koduna bakalım.

| Değer | Anımsatıcı | δ   | α   | Açıklama                                               |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
|  0x01 | ADD      | 2   | 1   | Toplama işlemi.                                       |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ yığından çıkardığımız değerlerin sayısıdır. Bu durumda iki, çünkü en üstteki iki değeri topluyoruz.

_α_ geri ittiğimiz değerlerin sayısıdır. Bu durumda bir, yani toplam.

Yani yeni yığın üstü (_μ′<sub>s</sub>[0]_), eski yığın üstü (_μ<sub>s</sub>[0]_) ile onun altındaki eski değerin (_μ<sub>s</sub>[1]_) toplamıdır.

Tüm işlem kodlarının üzerinden "gözleri yoran bir listeyle" geçmek yerine, bu makale yalnızca yeni bir şey sunan işlem kodlarını açıklamaktadır.

| Değer | Anımsatıcı  | δ   | α   | Açıklama                                                                                                |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2   | 1   | Keccak-256 hash'ini hesapla.                                                                                   |
|       |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Bu, belleğe erişen ilk işlem kodudur (bu durumda, salt okunur). Ancak, belleğin mevcut sınırlarının ötesine genişleyebilir, bu nedenle _μ<sub>i</sub>_'yi güncellememiz gerekir. Bunu sayfa 29'daki denklem 328'de tanımlanan _M_ işlevini kullanarak yapıyoruz.

| Değer | Anımsatıcı | δ   | α   | Açıklama                       |
| ----: | -------- | --- | --- | --------------------------------- |
|  0x31 | BALANCE  | 1   | 1   | Verilen hesabın bakiyesini al. |
|       |          |     |     | ...                               |

Bakiyesini bulmamız gereken adres _μ<sub>s</sub>[0] mod 2<sup>160</sup>_'tır. Yığının en üstü adrestir, ancak adresler yalnızca 160 bit olduğundan, değeri 2<sup>160</sup> [modülüne](https://en.wikipedia.org/wiki/Modulo_operation) göre hesaplarız.

Eğer _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_ ise, bu adres hakkında bilgi olduğu anlamına gelir. Bu durumda, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ o adresin bakiyesidir. Eğer _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_ ise, bu adresin başlatılmadığı ve bakiyenin sıfır olduğu anlamına gelir. Hesap bilgi alanlarının listesini sayfa 4'teki bölüm 4.1'de görebilirsiniz.

İkinci denklem olan _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, sıcak depolamaya (yakın zamanda erişilen ve muhtemelen önbelleğe alınmış depolama) ve soğuk depolamaya (erişilmemiş ve muhtemelen alınması daha pahalı olan daha yavaş depolamada bulunan depolama) erişim arasındaki maliyet farkıyla ilgilidir. _A<sub>a</sub>_, sayfa 8'deki bölüm 6.1'de tanımlandığı gibi, işlem tarafından daha önce erişilen ve bu nedenle erişimi daha ucuz olması gereken adreslerin listesidir. Bu konu hakkında daha fazla bilgiyi [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)'da okuyabilirsiniz.

| Değer | Anımsatıcı | δ   | α   | Açıklama                             |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16    | 16  | 17  | 16. yığın öğesini çoğalt.              |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Herhangi bir yığın öğesini kullanmak için onu çıkarmamız gerektiğine dikkat edin, bu da onun üzerindeki tüm yığın öğelerini de çıkarmamız gerektiği anlamına gelir. [`DUP<n>`](https://www.evm.codes/#8f) ve [`SWAP<n>`](https://www.evm.codes/#9f) durumunda bu, on altı değere kadar çıkarıp ardından itmek zorunda kalmak anlamına gelir.

## 9.5 Yürütme döngüsü {#95-exec-cycle}

Artık tüm parçalara sahip olduğumuza göre, EVM'nin yürütme döngüsünün nasıl belgelendiğini nihayet anlayabiliriz.

Denklem (155), durum verildiğinde şunları söyler:

- _σ_ (küresel blokzincir durumu)
- _μ_ (EVM durumu)
- _A_ (alt durum, işlem bittiğinde gerçekleşecek değişiklikler)
- _I_ (yürütme ortamı)

Yeni durum _(σ', μ', A', I')_ şeklindedir.

(156)-(158) denklemleri yığını ve bir işlem kodu (_μ<sub>s</sub>_) nedeniyle yığındaki değişikliği tanımlar. Denklem (159) gazdaki (_μ<sub>g</sub>_) değişikliktir. Denklem (160) program sayacındaki (_μ<sub>pc</sub>_) değişikliktir. Son olarak, (161)-(164) denklemleri, işlem kodu tarafından açıkça değiştirilmedikçe diğer parametrelerin aynı kaldığını belirtir.

Bununla birlikte EVM tam olarak tanımlanmış olur.

## Sonuç {#conclusion}

Matematiksel gösterim kesindir ve Sarı Bülten'in Ethereum'un her detayını belirtmesine olanak tanımıştır. Ancak bazı dezavantajları vardır:

- Sadece insanlar tarafından anlaşılabilir, bu da [uyumluluk testlerinin](https://github.com/ethereum/tests) manuel olarak yazılması gerektiği anlamına gelir.
- Programcılar bilgisayar kodunu anlar.
  Matematiksel gösterimi anlayabilirler veya anlamayabilirler.

Belki de bu nedenlerden dolayı, daha yeni [mutabakat katmanı spesifikasyonları](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) Python'da yazılmıştır. [Python'da yürütme katmanı spesifikasyonları](https://ethereum.github.io/execution-specs) vardır, ancak bunlar tam değildir. Tüm Sarı Bülten de Python veya benzeri bir dile çevrilene kadar Sarı Bülten hizmet vermeye devam edecektir ve onu okuyabilmek faydalıdır.