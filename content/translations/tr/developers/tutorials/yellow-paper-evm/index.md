---
title: Sarı Kağıdın Ethereum Sanal Makinesi Spesifikasyonlarını Anlama
description: Ethereum'un Ethereum sanal makinesini (EVM) açıklayan resmi spesifikasyonları olan Sarı Kağıdı anlama.
author: "qbzzt"
tags:
  - "EVM"
skill: intermediate
lang: tr
published: 2022-05-15
---

[Sarı Kağıt](https://ethereum.github.io/yellowpaper/paper.pdf), Ethereum'un resmi spesifikasyonudur. [EIP süreci](/eips/) tarafından düzenlenen yerler dışında, her şeyin nasıl çalıştığına dair net bir açıklama içerir. Programcıların anlaşılır bulmayabileceği terimler içeren matematiksel bir kağıt olarak yazılmıştır. Bu kağıtta, spesifikasyonu ve dolayısıyla bağlantılı diğer matematiksel kağıtları nasıl okuyacağınızı öğreneceksiniz.

## Hangi Sarı Kağıt? {#which-yellow-paper}

Ethereum'daki her şey gibi, Sarı Kağıt da zamanla evrimleşiyor. Spesifik bir versiyona atıfta bulunabilmek için [yazımı devam eden versiyonu](yellow-paper-berlin.pdf) yükledim. Kullanacağım bölüm, sayfa ve denklem numaraları o versiyona ait olacaktır. Bu dokümanı okurken farklı bir pencerede Sarı Kağıdı açık tutmak iyi bir fikir olabilir.

### Neden Ethereum Sanal Makinesi? {#why-the-evm}

Orijinal sarı kağıt, Ethereum'un geliştirme sürecinin başında yazılmıştı. Başlangıçta ağı korumak için kullanılan mutabakat mekanizmasını temel alan orijinal iş ispatını açıklamaktadır. Bununla birlikte, Ethereum Eylül 2022'de iş ispatını bırakıp hisse ispatı tabanlı istemciyi kullanmaya başladı. Bu öğretici, sarı kağıdın Ethereum Sanal Makinesi'ni tanıttığı bölümlere değinecektir. EVM, (DIFFICULTY işlem kodunun dönüş değeri dışında) hisse ispatına geçiş nedeniyle değiştirilmemiştir.

## 9 Yürütüm modeli {#9-execution-model}

Bu bölüm (sayfa 12-14) daha çok EVM'nin tanıtımını içeriyor.

_Sistem durumu_ terimi, sistemi çalıştırmak için bilmeniz gereken her şeyi içerir. Bu, tipik bir bilgisayarda bellek, kayıt içerikleri vs. anlamlarına gelir.

[Turing makinesi](https://en.wikipedia.org/wiki/Turing_machine), bir hesaplama modelidir. Aslında bir bilgisayarın basitleştirilmiş bir halidir ve normal bir bilgisayarın hesaplamaları yapma kabiliyetine sahip olduğu kanıtlanmıştır (bir bilgisayarın hesaplayabileceği her şeyi bir Turing makinesi de hesaplayabilir). Bu model neyin hesaplanabilir olduğuna ve olmadığına dair değişik teorileri kanıtlamayı kolaylaştırır.

[Turing-tamam](https://en.wikipedia.org/wiki/Turing_completeness) terimi, bir bilgisayarın hesapları bir Turing makinesi gibi çalıştırabileceği anlamına gelir. Turing makineleri sonsuz döngülere girebilir ancak EVM giremez; çünkü gazı biter, yani EVM sadece yarı-Turing-tamam niteliğindedir.

## 9.1 Temeller {#91-basics}

Bu bölüm EVM'nin temellerini ve diğer hesaplama modelleri ile nasıl benzerlik ve farklılıklarını gösterir.

Bir [yığın makinesi](https://en.wikipedia.org/wiki/Stack_machine), ara verileri kayıtlarda değil, [**yığın**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)da depolayan bir bilgisayardır. Bu, hata ve güvenlik açıklarının bulunma olasılığının az olması sayesinde uygulanması kolay olduğundan sanal makineler için tercih edilen mimaridir. Yığındaki bellek 256 bitlik kelimelere bölünür. Bunun seçilme sebebi, Keccak-256 karmalaması ve eliptik eğri hesaplamaları gibi Ethereum'un temel kriptografik operasyonları için uygun olmasıdır. Yığının sahip olabileceği maksimum boyut 1024 bayttır. İşlem kodları yürütüldüklerinde parametrelerini genelde yığından alırlar. Yığındaki elementleri yeniden düzenlemeye yarayan `POP` (yığının başındaki öğeyi siler), `DUP_N` (yığındaki n'inci öğeyi kopyalar) gibi işlem kodları vardır.

EVM'nin ayrıca çalıştırma sürecinde veri depolama amacıyla kullanılan **bellek** adında geçici bir alanı vardır. Bu bellek, 32 baytlık kelimeler halinde düzenlenmiştir. Her bellek konumu sıfırdan başlatılır. [Yul](https://docs.soliditylang.org/en/latest/yul.html) kodunu belleğe bir kelime eklemek için çalıştırırsanız, 32 baytlık bir belleği kelimedeki sıfırlı boş alan ile dolduracaktır, yani 0-29, 0x60'tan 30'a ve 0xA7'den 31'e konumlarındaki sıfırlarla yeni bir kelime oluşturur.

```yul
mstore(0, 0x60A7)
```

`mstore`, EVM'nin bellekle etkileşime girebilmek için sağladığı üç işlem kodundan biridir; belleğe bir kelime yükler. Diğer ikisi ise belleğe tek bir bayt yükleyen `mstore8` ile bellekteki bir kelimeyi yığına taşıyan `mload`'dur.

EVM ayrıca sistem durumunun bir parçası olarak korunan ve geçici olmayan ayrı bir **depolama**ya sahiptir; bu bellek, kelime dizileri olarak düzenlenir (yığındaki kelime adreslenebilir bayt dizilerinin aksine). Bu depolama, sözleşmelerin kalıcı verilerini tuttuğu yerdir, bir sözleşme sadece kendi depolamasıyla etkileşime girebilir. Depolama, anahtar-değer eşlemeleri şeklinde düzenlenir.

Sarı Kağıdın bu kısmında bahsedilmemiş olsa da, dördüncü bir bellek türü olduğunu bilmemizde fayda var. **Çağrı verileri**, bir işlemin `data` parametresiyle aktarılan değerini depolamak için kullanılan bayt-adreslenebilir, salt okunur bir bellektir. EVM'nin `calldata` yönetimine yönleik özel işlem kodları vardır. `calldatasize`, verinin boyutunu döndürür. `calldataload`, veriyi yığına yükler. `calldatacopy`, veriyi belleğe kopyalar.

Standart [Von Neumann mimarisi](https://en.wikipedia.org/wiki/Von_Neumann_architecture), kod ile veriyi aynı bellekte depolar. EVM güvenlik sebebiyle bu standarda uymaz; geçici belleğin paylaşılması, program kodunun değiştirilmesini mümkün kılar. Bunun yerine kod, depolamaya kaydedilir.

Kodun bellekten yürütüldüğü sadece iki durum vardır:

- Bir sözleşme ([`CREATE`](https://www.evm.codes/#f0) ya da [`CREATE2`](https://www.evm.codes/#f5)) kullanarak başka bir sözleşme oluşturduğunda, sözleşme oluşturucunun kodu bellekten gelir.
- _Herhangi_ bir sözleşmenin oluşturulma sürecinde, oluşturucu kodu çalışır ve yine bellekten asıl sözleşmenin kodunu döndürür.

İstisnai yürütüm terimi, güncel sözleşmenin yürütümünün durmasına sebep olan bir istisnayı ifade eder.

## 9.2 Ücretlerle ilgili genel bilgi {#92-fees-overview}

Bu bölüm, gaz ücretlerinin nasıl hesapladığını anlatır. Üç maliyet kalemi vardır:

### İşlem kodu maliyeti {#opcode-cost}

Spesifik işlem kodunun öz maliyeti. Bu değere ulaşabilmek için Ek H'de (sayfa 28, (327). denklemin altında) işlem kodunun maliyet grubunu ve (324.) denklemdeki maliyet grubunu bulun. Bu size bir maliyet fonksiyonu verir, bu da çoğu durumda Ek G'deki (sayfa 27) parametreleri kullanır.

Örnek olarak [`CALLDATACOPY`](https://www.evm.codes/#37) işlem kodu _W<sub>copy</sub>_ grubunun bir üyesidir. Bu grup için işlem kodu maliyeti _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_ şeklindedir. Ek G'ye baktığımızda, iki sabit değerin de 3 olduğunu görürüz, bu da bize _3+3×⌈μ<sub>s</sub>[2]÷32⌉_ değerini verir.

Hala _⌈μ<sub>s</sub>[2]÷32⌉_ ifadesini çözmemiz gerekiyor. En dıştaki kısım olan _⌈ \<value\> ⌉_ tavan fonksiyonudur ve değerden küçük olmayan en küçük tam sayıyı verir. Örneğin _⌈2.5⌉ = ⌈3⌉ = 3_. İç kısım _μ<sub>s</sub>[2]÷32_ şeklindedir. 3. bölüme (Yöntemler) bakarsak, sayfa 3'te _μ_, makinenin durumudur. Makine durumu sayfa 13, bölüm 9.4.1'de açıklanmıştır. O bölüme göre yığın için makine durumu parametrelerinden biri _s_'dir. Hepsini birleştirdiğimizde _μ<sub>s</sub>[2]_, yığındaki 2. konumdur. [İşlem koduna](https://www.evm.codes/#37) bakarsak, yığındaki 2. konum, verinin bayt cinsinden boyutudur. Grup W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) ve [`RETURNDATACOPY`](https://www.evm.codes/#3e) içindeki diğer işlem kodlarına bakarsak, işlem kodlarının da aynı konumda veri boyutları olduğunu görürüz. Yani _⌈μ<sub>s</sub>[2]÷32⌉_, kopyalanan veriyi depolayabilmek için gereken 32 baytlık kelimelerin sayısıdır. Toparlamak gerekirse, [`CALLDATACOPY`](https://www.evm.codes/#37) işlem kodunun kalıtımsal maliyeti, kopyalanan veri kelimesi başına 3 gaz artı 3'tür.

### Çalıştırma maliyeti {#running-cost}

Çağrı yaptığımız kodun çalıştırma maliyetidir.

- [`CREATE`](https://www.evm.codes/#f0) ve[`CREATE2`](https://www.evm.codes/#f5) durumlarında, yeni sözleşmenin oluşturucusu.
- [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), ya da [`DELEGATECALL`](https://www.evm.codes/#f4) durumlarında, çağırdığımız sözleşme.

### Bellek maliyetini genişletme {#expanding-memory-cost}

Bellek genişletme maliyeti (eğer gerekliyse).

324. denklemde bu değer _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_ olarak yazılmıştır. 9.4.1. bölüme baktığımızda _μ<sub>i</sub>_ değerinin bu bellekteki kelime sayısı olduğunu görürüz. Yani _μ<sub>i</sub>_, bellekte işlem kodundan önce bulunan kelime sayısı ve _μ<sub>i</sub>'_, bellekte işlem kodundan sonra bulunan kelime sayısıdır.

_C<sub>mem</sub>_ fonksiyonu 326. denklemde tanımlanmıştır: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ taban fonksiyonudur. Bir değer verildiğinde o değerden büyük olmayan en büyük tam sayıyı verir. Örneğin, _⌊2.5⌋ = ⌊2⌋ = 2._ _a < √512_, _a<sup>2</sup> < 512_ ve taban fonksiyonunun sonucu 0 olduğunda. Yani ilk 22 kelime için (704 bayt), gereken bellek kelimesi sayısı arttıkça maliyet de doğrusal olarak artar. O noktanın ötesinde _⌊a<sup>2</sup> ÷ 512⌋_ pozitiftir. Gereken bellek yeteri kadar yüksek olduğunda gaz maliyeti bellek miktarının karesiyle orantılıdır.

Bu faktörlerin sadece _kalıtımsal_ gaz maliyetini etkilediğini **unutmayın**. Ücret piyasasını ya da doğrulayıcılara yönelik son kullanıcının ne kadar ödemesi gerektiğini belirleyen ipuçlarını dikkate almaz; bu, sadece EVM'de belirli bir işlemi çalıştırmanın ham maliyetidir.

[Gaz hakkında daha fazla bilgi edinin](/developers/docs/gas/).

## 9.3 Yürütüm ortamı {#93-execution-env}

Yürütme ortamları veri tabanında kayıtları oluşturan bir veri grubudur, _I_, blokzincirin durumu ya da ESM'nin bir parçası olmayan bilgiyi içerir.

| Parametre       | Veriye erişecek işlem kodu                                                                                    | Veriye erişecek Solidity kodu           |
| --------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                        | `address(this)`                         |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                         | `tx.origin`                             |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                       | `tx.gasprice`                           |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), vs.                                                              | `msg.data`                              |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                         | `msg.sender`                            |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                      | `msg.value`                             |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                       | `address(this).code`                    |
| _I<sub>H</sub>_ | [`NUMBER`](https://www.evm.codes/#43) ve [`DIFFICULTY`](https://www.evm.codes/#44) gibi blok başlığı alanları | `block.number`, `block.difficulty`, vs. |
| _I<sub>e</sub>_ | Sözleşmeler arası çağrılar için çağrı yığınının derinliği (sözleşme oluşturma dahil)                          |                                         |
| _I<sub>w</sub>_ | EVM'nin durumu değiştirme izni var mı yoksa statik olarak mı çalışıyor?                                       |                                         |

9. bölümün geri kalanını anlamak için birkaç parametre daha gereklidir:

| Parametre | Anlatıldığı bölüm        | Anlam                                                                                                                                                                                                             |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (2. sayfa, 1. denklem) | Blokzincirin durumu                                                                                                                                                                                               |
| _g_       | 9.3 (13. sayfa)          | Kalan gaz                                                                                                                                                                                                         |
| _A_       | 6.1 (8. sayfa)           | Birikmiş yan durum (değişimler, işlem sonuna göre programlanmıştır)                                                                                                                                               |
| _o_       | 9.3 (13. sayfa)          | Çıktı - İç işlem durumunda (bir sözleşme bir diğerini aradığında) ve fonksiyonları görüntülemek için yapılan aramalarda (sadece bilgi istiyorken, yani bir işlem için beklemeye gerek yokken) döndürülen sonuçtur |

## 9.4 Yürütme ile ilgili temel bilgiler {#94-execution-overview}

Ön hazırlıkların hepsi tamam olduğuna göre, artık EVM'nin nasıl çalıştığı üzerinde çalışmaya başlayabiliriz.

137-142 denklemleri bize EVM'yi çalıştırmak için ilk şartları veriyor:

| Sembol           | Başlangıç değeri | Anlam                                                                                                                                                                                                                                      |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _μ<sub>g</sub>_  | _g_              | Kalan gaz                                                                                                                                                                                                                                  |
| _μ<sub>pc</sub>_ | _0_              | Program sayacı, yürütülecek yeni talimatın adresi                                                                                                                                                                                          |
| _μ<sub>m</sub>_  | _(0, 0, ...)_    | Bellek, tamamen sıfırlardan başlatılır                                                                                                                                                                                                     |
| _μ<sub>i</sub>_  | _0_              | Kullanılan en yüksek bellek konumu                                                                                                                                                                                                         |
| _μ<sub>s</sub>_  | _()_             | Yığın, başlangıçta boştur                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_              | Çıktı, döndürülen veriyle ([`RETURN`](https://www.evm.codes/#f3) ya da [`REVERT`](https://www.evm.codes/#fd)) ya da onsuz ([`STOP`](https://www.evm.codes/#00) ya da [`SELFDESTRUCT`](https://www.evm.codes/#ff)) durmazsak boş olan küme. |

143. denklem bize yürütüm sırasında her bir zaman noktasında dört olası durum olduğunu ve onlarla ne yapacağımızı söylüyor:

1. `Z(σ,μ,A,I)`. Z, bir işlemin geçersiz bir durum geçişi yapıp yapmadığını test eden bir fonksiyonu temsil eder (bkz. [istisnai durma](#942-exceptional-halting)). Değerlendirme sonucu Doğru olursa, yeni durum eskisiyle aynı olur (gazın yanması dışında) çünkü değişiklikler uygulanmamıştır.
1. Yürütülen işlem kodu [`REVERT`](https://www.evm.codes/#fd) ise yeni durum yine eski durumla aynıdır, bir miktar gaz kaybedilmiştir.
1. Eğer işlem dizisi [`RETURN`](https://www.evm.codes/#f3)) ile gösterildiği gibi tamamlanmışsa durum, yeni duruma güncellenir.
1. 1-3 uç koşullarından birinde değilsek, çalıştırmaya devam edin.

## 9.4.1 Makine Durumu {#941-machine-state}

Bu bölüm makine durumunu daha detaylı bir şekilde anlatıyor. _w_'nin güncel işlem kodu olduğunu belirtiyor. Eğer _μ<sub>pc</sub>_ _||I<sub>b</sub>||_ kodun uzunluğundan daha azsa, o zaman o bayt (_I<sub>b</sub>[μ<sub>pc</sub>]_) işlem kodudur. Aksi halde işlem kodu, [`STOP`](https://www.evm.codes/#00) olarak tanımlanır.

Bu bir [yığın makinesi olduğundan](https://en.wikipedia.org/wiki/Stack_machine), her bir işlem kodu tarafından çıkarılmış (_δ_) ve sokulmuş (_α_) öğeleri takip etmemiz gerekir.

## 9.4.2 İstisnai Durma {#942-exceptional-halt}

Bu bölüm, anormal bir sonuca ulaştığımızda verilen _Z_ fonksiyonunu tanımlar. Bu bir [Boole](https://en.wikipedia.org/wiki/Boolean_data_type) fonksiyonudur, dolayısıyla bir mantıksal veya için [_∨_ işaretini](https://en.wikipedia.org/wiki/Logical_disjunction) ve bir mantıksal ve için [_∧_ işaretini kullanır](https://en.wikipedia.org/wiki/Logical_conjunction).

Bu durumlardan biri doğruysa bir istisnai durma söz konusudur:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**, 9.2.Bölümde gördüğümüz gibi _C_ gaz maliyetini belirten fonksiyondur. Sonraki işlem kodunu karşılayacak kadar gaz kalmamıştır.

- **_δ<sub>w</sub>=∅_** Eğer bir işlem kodu için çıkarılmış öğe sayısı tanımlanmamışsa, işlem kodunun kendisi tanımsız olur.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**Yığın yetersizliği, güncel işlem kodu için yığında yeterli öğe yok.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_** İşlem kodu [`JUMP`](https://www.evm.codes/#56)'tır ve adres bir [`JUMPDEST`](https://www.evm.codes/#5b) değildir. Sıçramalar _sadece_ varış noktası bir [`JUMPDEST`](https://www.evm.codes/#5b) olduğunda geçerlidirler.

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_** İşlem kodu [`JUMPI`](https://www.evm.codes/#57), durum doğru (sıfır değil), bu yüzden sıçrama gerçekleşmeli ve adres bir [`JUMPDEST`](https://www.evm.codes/#5b) değil. Sıçramalar _sadece_ varış noktası bir [`JUMPDEST`](https://www.evm.codes/#5b) olduğunda geçerlidirler.

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_** İşlem kodu [`RETURNDATACOPY`](https://www.evm.codes/#3e). Bu işlem kodu yığın öğesinde _μ<sub>s</sub>[1]_ dönen veri arabelleğinden okunacak kaymadır ve yığın öğesi _μ<sub>s</sub>[2]_, verinin uzunluğudur. Bu durum, döndürülen arabelleğin son kısmının ötesini okumaya çalıştığınızda gerçekleşir. Çağrı verisi ya da kodun kendisi için benzer bir durum olmadığını dikkate alın. O arabelleklerin sonunun ötesini okumaya çalıştığınızda sadece sıfırlar elde edersiniz.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Yığın taşması. Eğer işlem kodunu çalıştırmak 1024 öğeden de büyük bir yığın ile sonuçlanacaksa, iptal edilir.

- **_¬I<sub>w</sub> ∧ W(w,μ)_** Statik olarak mı çalışıyoruz ([¬ olumsuzlama](https://en.wikipedia.org/wiki/Negation) ve _I<sub>w</sub>_ blokzincir durumunu değiştirmemize izin veriliyorken doğrudur)? Eğer böyleyse ve durum değiştirecek bir işlem deniyorsak bu gerçekleşemez.

  _W(w,μ)_ fonksiyonu daha sonra 150.denklemde anlatılacaktır. _W(w,μ)_ aşağıdaki durumlardan biri doğruysa doğru olur:

  - **_w ∈ {CREATE, CREATE2, SSTORE, SELFDESTRUCT}_** Bu işlem kodları, yeni bir söyleşme oluşturarak, bir değer depolayarak ya da güncel sözleşmeyi yok ederek durumu değiştirirler.

  - **_LOG0≤w ∧ w≤LOG4_** statik olarak çağrıldıysak günlük girdileri yayımlayamayız. Günlük işlem kodları [`LOG0` (A0)](https://www.evm.codes/#a0) ve [`LOG4` (A4)](https://www.evm.codes/#a4) arasında değişmektedir. Günlük işlem kodundan sonraki numara, günlük girdisinin kaç konu içerdiğini belirtir.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_** Statikken başka bir sözleşme çağırabilirsiniz fakat ona ETH transfer edemezsiniz.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_** [`SSTORE`](https://www.evm.codes/#55) değerini G<sub>callstipend</sub> değerinden daha fazla gazınız yoksa çalıştıramazsınız (Ek G'de 2300 olarak tanımlanmıştır).

## 9.4.3 Sıçrama Varış Noktası Doğruluğu {#943-jump-dest-valid}

Burada resmi olarak [`JUMPDEST`](https://www.evm.codes/#5b) işlem kodlarını tanımlıyoruz. Sadece 0x5B bayt değerini arayamayız, çünkü bir PUSH'un içinde de olabilir (ve bu yüzden bir işlem kodu değil, veridir).

(153). denklemde bir fonksiyon tanımlıyoruz, _N(i,w)_. İlk parametre olan _i_, işlem kodunun konumudur. İkinci parametre olan _w_, işlem kodunun kendisidir. _w∈[PUSH1, PUSH32]_ uygularsak bu, işlem kodunun bir PUSH olduğu anlamına gelir (kare parantezler başlangıç ve bitiş noktaları arasında bir değer olabileceğini ifade eder). Bu durumda bir sonraki işlem kodu _i+2+(w−PUSH1)_'dedir. [`PUSH1`](https://www.evm.codes/#60) için iki bayt ilerlemeliyiz (PUSH'un kendisi ve bir bayt değeri), [`PUSH2`](https://www.evm.codes/#61) için de 3 bayt ilerlemeliyiz çünkü kendisi iki baytlık bir değerdir, vs. Diğer tüm EVM işlem kodları sadece bir bayt uzunluğundadır, bu yüzden bütün diğer durumlarda _N(i,w)=i+1_.

Bu fonksiyon 152. denklemde _D<sub>J</sub>(c,i)_ öğesini tanımlamak için kullanılır; söz konusu öğe, _c_ kodunun içindeki tüm geçerli sıçrama varış noktalarından oluşan bir [kümedir](<https://en.wikipedia.org/wiki/Set_(mathematics)>) ve _i_ işlem kodu konumundan başlar. Bu fonksiyon tekrarlı olarak tanımlanır. _i≥||c||_ ise bu, kodumuzun sonunda ya da sonrasındayız demektir. Daha fazla sıçrama varış noktası bulmayacağız, sadece boş kümeyi döndüreceğiz.

Tüm ayrı durumlarda yeni işlem koduna giderek kodun geri kalanına bakarız ve buradan başlayan kümeyi alırız. _c[i]_ güncel işlem kodudur, bu yüzden _N(i,c[i])_ bir sonraki işlem kodunun konumudur. Bu yüzden _D<sub>J</sub>(c,N(i,c[i]))_, sonraki işlem kodunda başlayan geçerli işlem kodlarının bir kümesidir. Eğer şu anki işlem kodu `JUMPDEST` değilse, sadece o kümeyi döndürün. `JUMPDEST` ise, sonuç kümesine dahil edin ve döndürün.

## 9.4.4 Normal durma {#944-normal-halt}

Durma fonksiyonu _H_, üç farklı değer türü döndürebilir.

- Durma işlem kodunda değilsek, _∅_ boş kümesini döndürün. Kural olarak bu değer, bir Boole yanlış değeri olarak yorumlanır.
- Eğer çıktı oluşturmayan bir durma işlem kodumuz varsa, ([`STOP`](https://www.evm.codes/#00) ya da [`SELFDESTRUCT`](https://www.evm.codes/#ff)), sıfır boyutlu baytlardan oluşan bir diziyi dönen veri olarak döndürün. Bunun boş bir kümeden çok daha farklı olduğunu not edin. Bu değer EVM'nin gerçekten durduğu anlamına gelir, yalnız okunacak bir dönen veri yoktur.
- Eğer çıktı oluşturan bir işlem kodumuz varsa ([`RETURN`](https://www.evm.codes/#f3) ya da [`REVERT`](https://www.evm.codes/#fd)), o işlem kodu tarafından belirtilen bayt dizisini döndürün. Bu dizi bellekten alınır, yığının başındaki değer (_μ<sub>s</sub>[0]_) ilk bayttır ve ondan sonraki değer de (_μ<sub>s</sub>[1]_) uzunluktur.

## H.2 Talimat kümesi {#h2-instruction-set}

EVM'nin son alt kümesine olan 9.5'e gitmeden önce, talimatların kendilerine bir bakalım. Bu talimatlar, 29. sayfada başlayan Ek H.2'de tanımlanmıştır. O spesifik işlem koduyla değişen olarak belirtilmeyen her şeyin aynı kalması beklenir. Değişen değişkenler \<something\>′ olarak belirtilir.

Örnek olarak [`ADD`](https://www.evm.codes/#01) işlem koduna bakalım.

| Değer | Anımsatıcı | δ   | α   | Açıklama                                                  |
| ----: | ---------- | --- | --- | --------------------------------------------------------- |
|  0x01 | EKLE       | 2   | 1   | Ekleme işlemi.                                            |
|       |            |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ yığından çıkardığımız değerlerin sayısıdır. Bu durumda iki tane var, çünkü en üst iki değeri ekliyoruz.

_α_ geri ittiğimiz değerlerin sayısıdır. Bu durumda bir, toplam.

Bu yüzden yığının yeni başı (_μ′<sub>s</sub>[0]_), eski yığın başının (_μ<sub>s</sub>[0]_) ve aşağısındaki eski değerin (_μ<sub>s</sub>[1]_) toplamı olur.

Bu belge, "bıktırıcı bir listeyle" tüm işlem kodlarının üstünden geçmek yerine, sadece yeni bir şey tanıtan işlem kodlarını açıklıyor.

| Değer | Anımsatıcı | δ   | α   | Açıklama                                                                                                   |
| ----: | ---------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256  | 2   | 1   | Keccak-256 karmasını hesaplar.                                                                             |
|       |            |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |            |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Bu, belleğe erişen ilk işlem kodudur (bu durumda, salt okunur). Yine de, belleğin güncel sınırlarının ötesine kadar büyüyebilir, bu yüzden _μ<sub>i</sub> değerini güncellememiz gerekir._ Bunu 29. sayfadaki 328. denklemde tanımlanan _M_ fonksiyonunu kullanarak yaparız.

| Değer | Anımsatıcı | δ   | α   | Açıklama                            |
| ----: | ---------- | --- | --- | ----------------------------------- |
|  0x31 | BALANCE    | 1   | 1   | Söz konusu hesabın bakiyesini alın. |
|       |            |     |     | ...                                 |

Bakiyesini bulmamız gereken hesap: _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Yığının başı adrestir, fakat adresler sadece 160 bit olduğu için [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup> değerini hesaplarız.

Eğer _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_ ise, bu adresle ilgili bilgi bulunduğu anlamına gelir. Bu durumda _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_, bu hesabın bakiyesidir. Eğer _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_ ise, bu da adresin başlatılmadığını ve bakiyenin 0 olduğu anlamına gelir. Hesap bilgisi alanları listesini 4. sayfadaki 4.1. bölümünde bulabilirsiniz.

İkinci denklem olan _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ {μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, sıcak depolama (yakın zamanda erişilmiş ve muhtemelen önbellekte olan depolama) ile soğuk depolama (erişilmemiş ve muhtemelen daha yavaş ve alması daha pahalı olan depolama) arasındaki maliyet farkıyla alakalıdır. _A<sub>a</sub>_, işlem tarafından önceden erişilmiş adreslerin listesidir, bu yüzden 8. sayfada 6.1. bölümde anlatıldığı üzere erişilmesi daha ucuz olmalıdır. [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)'da bu konuyla ilgili daha fazla okuma yapabilirsiniz.

| Değer | Anımsatıcı | δ   | α   | Açıklama                                |
| ----: | ---------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16      | 16  | 17  | 16. yığın öğesini çoğaltın.             |
|       |            |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Herhangi bir yığın öğesini kullanabilmek için onu çıkarmamız gerektiğini, yani üstündeki her yığın öğesini çıkarmamız gerektiğini unutmayın. [`DUP<n>`](https://www.evm.codes/#8f) ve [`SWAP<n>`](https://www.evm.codes/#9f) durumlarında bu, on altı değere kadar ekleme ve çıkarma yapmak mecburiyeti anlamına gelir.

## 9.5 Yürütme döngüsü {#95-exec-cycle}

Artık her parçasına hakim olduğumuza göre, EVM'nin yürütme döngüsünün nasıl belgelendiğini sonunda anlayabiliriz.

(155). denklem, durum belirtildiğinde şunu söyler:

- _σ_ (küresel blokzincir durumu)
- _μ_ (EVM durumu)
- _A_ (alt durum, değişiklikler işlem bittiğinde gerçekleşir)
- _I_ (yürütme ortamı)

Yeni durum: _(σ', μ', A', I')_.

(156) ila (158). denklemler yığını ve işlem kodu sebepleri yığında olan değişiklikleri tanımlar (_μ<sub>s</sub>_). (159). denklem gazdaki değişimdir (_μ<sub>g</sub>_). (160). denklem program sayacındaki değişikliktir (_μ<sub>pc</sub>_). Son olarak, (161) ila (164). denklemler, diğer parametrelerin işlem kodu tarafından açıkça değiştirilmediği sürece aynı kalacaklarını belirtir.

Artık EVM tamamen açıklanmıştır.

## Sonuç {#conclusion}

Matematiksel gösterim kesindir ve Sarı Kağıdın Ethereum'un her detayını belirtmesini sağlamıştır. Yine de, bazı dezavantajları vardır:

- Sadece insanlar tarafından anlaşılabilir, bu da [uygunluk testlerinin](https://github.com/ethereum/tests) manuel olarak yazılması zorunluluğunu doğurur.
- Programcılar bilgisayar kodunu anlar. Matematiksel gösterimleri anlayabilir ya da anlamayabilirler.

Belki bu sebeplerden yeni [fikir birliği katmanı spesifikasyonları](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) Python'da yazılmaktadır. [ Python'da yürütüm katmanı spesifikasyonları](https://ethereum.github.io/execution-specs) da mevcuttur fakat bunlar henüz tamamlanmamıştır. Sarı Kağıt eksiksiz olarak Python ya da başka bir dile çevrilmeden, Sarı Kağıt kullanımda kalmaya devam edecektir ve onu okuma olanağına sahip olmak faydalıdır.
