---
title: "Sıfır bilgi ispatları ile Ethereum üzerinde gizlilik uygulamaları nasıl geliştirilir"
description: "Tek bir yeniden kullanılabilir kalıp; Ethereum üzerindeki anonim oylama, karıştırıcılar, airdrop'lar ve üyelik sistemlerine güç verir. Taahhüt-iptal edici-ispat döngüsünü ve sıfır bilgi araçlarının günümüzde bunları geliştirmeyi nasıl pratik hâle getirdiğini öğrenin."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "sıfır bilgi ispatları"
  - "gizlilik"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: "Ethereum'da gizlilik uygulamaları"
lang: tr
---

Ethereum tasarımı gereği radikal bir şekilde halka açıktır. Her adres, bakiye, işlem, sözleşme çağrısı ve olay, bir blok gezgini olan herkes tarafından görülebilir. Bu şeffaflık, doğrulanabilirlik istediğinizde faydalıdır. Ancak kullanıcıların her eylemi aynı cüzdan ile ilişkilendirmeden oy kullanması, talep etmesi, çekim yapması veya üyeliğini kanıtlaması gerektiğinde bu bir sorundur.

Anonim üyelik, Ethereum üzerindeki büyük bir gizlilik uygulamaları sınıfına güç veren yeniden kullanılabilir bir kalıptır. İnsanlar önce kaydolur, daha sonra hangi üye olduklarını ifşa etmeden gruba ait olduklarını kanıtlarlar. Bir sıfır bilgi ispatı, kayıt cüzdanı ile eylemi gerçekleştiren cüzdan arasındaki köprü görevi görür ve bu köprü, üzerinden kimin geçtiğini açığa çıkarmaz.

Çevresindeki ürün değişir, ancak gizlilik iskeleti aynı kalır.

## Anonim oylama üzerinden açıklanan kalıp {#the-pattern-explained-through-anonymous-voting}

Kalıbın üç parçası vardır. Bir taahhüt her üyeyi kaydeder. Bir Merkle ağacı bu taahhütleri bir kalabalığa dönüştürür. Bir ispat ve bir iptal edici (nullifier), bir üyenin hangi üye olduğunu ifşa etmeden bir kez eylemde bulunmasına izin verir.

### Birinci adım: kayıt olma {#step-one-registering}

Her seçmen zincir dışı iki gizli değer oluşturur: sır ve iptal edici. Seçmen bu değerleri hash'leyerek herkese açık bir taahhüt oluşturur ve ardından bu taahhüdü zincir içi kaydeder.

Taahhüt, herkese açık kayıt kaydıdır. Sır ve iptal edici, seçmenin daha sonra ihtiyaç duyacağı gizli nottur. Not kaybedilirse seçmen üyeliğini kanıtlayamaz. Sızdırılırsa, kullanıcının yerine başka biri oy kullanabilir.

Taahhüt bir hash olduğu için, gözlemciler içindeki gizli değerleri kurtaramazlar. Taahhüt, bu kaydı daha sonra kimin kullanacağını ifşa etmeden "birinin kaydolduğunu" söyler.

### İkinci adım: kalabalığı oluşturma {#step-two-building-the-crowd}

Daha fazla seçmen kaydoldukça, uygulama onların taahhütlerini bir Merkle ağacı içinde toplar. Bir Merkle ağacı, uzun bir değerler listesini kök adı verilen tek bir hash'e sıkıştırır. Listedeki herhangi bir değeri değiştirdiğinizde hash de değişir, bu nedenle kök, tüm kümenin kurcalanmaya karşı korumalı bir özeti olarak işlev görür.

Bu ağaç sizin anonimlik kümenizdir. Ağaçta on kullanıcı varsa, bir gözlemci daha sonraki bir eylemi bu on kişiden birine indirebilir. Ağaçta on bin kullanıcı varsa, eylemi tek bir kişiyle ilişkilendirmek çok daha zordur. Kriptografi doğru olsa bile, küçük bir anonimlik kümesine sahip gizli bir uygulama genellikle çok gizli değildir.

### Üçüncü adım: anonim olarak eylemde bulunma {#step-three-acting-anonymously}

Oylama başladığında, seçmen taahhüdü kaydeden aynı cüzdan üzerinden oy kullanmamalıdır. Kayıt cüzdanından oy kullanmak, oyu doğrudan kayıt olan kişiyle ilişkilendirir ve gizlilik çabasını boşa çıkarır. Bunun yerine, seçmen bir sıfır bilgi ispatı oluşturur. İfade, "Kayıtlı bir taahhüt üreten gizli değerleri biliyorum ve bu oylama için doğru iptal edici hash'ini açıklıyorum" diyen bir devre olarak kodlanır.

İspat, doğrulayıcı sözleşmeyi ifadenin doğru olduğuna ikna eder. Sırrı, iptal ediciyi veya hangi taahhüdün kullanıldığını açığa çıkarmaz.

İptal edici, mükerrer oy kullanımını önleyen şeydir. İspatın yanı sıra, seçmen bir iptal edici hash'i yayınlar. Oylama sözleşmesi, oyu kabul ettikten sonra bu hash'i saklar. Aynı gizli not aynı oylama için tekrar kullanılırsa, aynı iptal edici hash'ini üretir ve sözleşme ikinci oyu reddeder. İspatla birleştirildiğinde bu durum, sözleşmenin sadece kayıtlı bir seçmenin bir kez eylemde bulunduğunu bilmesini sağlar, hangisinin olduğunu değil.

## Yeniden kullanılabilir geçit {#the-reusable-gate}

Aynı ispat ve iptal edici çifti, oylamanın ötesinde de işe yarar. Oylama hikayesini bir kenara bıraktığınızda, elinizde akıllı sözleşme işlevleri için bir gizlilik geçidi kalır.

İşlev çalışmadan önce sözleşme Merkle kökünü kontrol eder, ispatı doğrular, iptal edici hash'inin kullanılmadığını onaylar ve herkese açık girdileri doğru uygulamaya, zincire, oylamaya, talebe veya çekime bağlar. Bu kontroller geçerse, iptal ediciyi kullanılmış olarak işaretler ve işlevin geri kalanını çalıştırır.

Bu geçidi bir oyun önüne koyduğunuzda anonim oylama elde edersiniz. Bir airdrop talebinin önüne koyduğunuzda anonim talepler elde edersiniz. Bir çekim işlevinin önüne koyduğunuzda, karıştırıcı tarzı bir çekim akışının çekirdeğini elde edersiniz. Aynı taahhüt ağacı, aynı iptal edici fikri, aynı ispat kalıbı. Değişen şey, işlev gövdesi ve çevresindeki uygulama mantığıdır.

## Neyin nerede çalıştığı {#what-runs-where}

Gizli işler genellikle zincir dışı gerçekleşir. Kullanıcı notu saklar ve bir istemci uygulaması tanığı oluşturup ispatı üretmek için kanıtlayıcıyı çalıştırır. Bir indeksleyici, taahhütleri ve Merkle köklerini izler. Bir paketleyici, Kullanıcı İşlemini (UserOperation) zincir içi yayar ve bir ERC-4337 ödemecisi Gazı finanse eder, böylece yeni bir cüzdanın öncelikle kullanıcının bilinen cüzdanından ETH almasına gerek kalmaz.

Herkese açık yaptırım zincir içi gerçekleşir. Doğrulayıcı sözleşme ispatı kontrol eder. Uygulama sözleşmesi geçerli kökleri ve kullanılmamış iptal edicileri kontrol eder, iptal edici hash'ini saklar ve herkese açık eylemi çalıştırır.

Hassas kullanıcı deneyimi (UX) not yönetimidir. Sırra ve iptal ediciye anahtar gibi davranın. Bunları analizlere, günlüklere, URL'lere, hata raporlarına veya normal sunucu tarafı telemetrisine koymayın. İspat ne kadar güçlü olursa olsun, not sızdırıldığında gizlilik ortadan kalkar.

## Araçlar arayı kapattı {#the-tooling-caught-up}

Temeldeki kriptografiyi elle kodlamanıza gerek yoktur. Yaygın bir yol, devreyi üst düzey bir sıfır bilgi dilinde yazmak, bir Solidity doğrulayıcısı oluşturmak ve bu doğrulayıcıyı uygulama sözleşmesinden çağırmaktır.

Doğru teknoloji yığını işe bağlıdır. snarkjs ile Circom, uygulama düzeyindeki devreler için köklü bir yoldur. Barretenberg ile Noir, geliştirici dostu daha yeni bir yoldur. Halo2 ve gnark daha düşük seviyeli devre kütüphaneleridir. RISC Zero veya SP1 gibi zkVM'ler normal programları kanıtlar, ancak kanıtlanması küçük özel bir devreden daha pahalı olabilir.

Anonim üyelik için, kendi devrenizi yazmadan önce mevcut bir protokole başvurun. Semaphore, grup üyeliğini ve iptal edici tabanlı mükerrer kullanım önlemesini sözleşmeler ve JavaScript kütüphaneleri hâline getirir. Gizli oylama ve yönetişim için MACI, gizli anlaşmaları önleme (anti-collusion) özellikleri eklediği için uzmanlaşmış bir yoldur. Olgun protokoller genellikle yeni devrelerden daha güvenlidir.

## İspat yeterli değildir {#the-proof-is-not-enough}

Cüzdan akışı bağlantıyı sızdırırsa mükemmel bir ispat bile başarısız olur. A cüzdanından kaydolup daha sonra A cüzdanından eylemde bulunursanız, izleyen herkes işlemleri birbirine bağlayabilir. Eylemden hemen önce A cüzdanından B cüzdanını fonlarsanız, bu fonlama işlemi de aynı sorunu yaratır.

Paketleyicilerin ve ödemecilerin önemli olmasının nedeni budur. Eylemi gerçekleştiren cüzdan yeni olmalı ve kullanıcının eylemden ayırmaya çalıştığı bir cüzdandan ETH almasına gerek kalmamalıdır.

Aynı sorun zincir dışı da mevcuttur. Kayıt ve eylem işlemlerini aynı IP adresinden, RPC sağlayıcısından veya oturumdan göndermek, devrenin sağladığı gizliliği zayıflatabilir. Ön yüzler analizler, yerel depolama ve destek günlükleri aracılığıyla sızıntı yapabilir. Bir sıfır bilgi ispatı, ispatın içindeki değerleri gizler. İşlemin etrafındaki her şeyi gizlemez.

Herkese açık girdiler, gizlilik uygulamalarının başarısız olduğu başka bir yerdir. Devrede herkese açık olarak işaretlenen, bir olay olarak yayımlanan, çağrı verisine (calldata) dâhil edilen veya sözleşme tarafından saklanan her şey görülebilir. Herkese açık girdileri, bir Solidity sözleşmesindeki erişim kontrolü kadar dikkatli bir şekilde inceleyin.

## Bu durum geliştiriciler için neyi değiştiriyor {#what-this-changes-for-builders}

Ethereum'da gizlilik kullanıma sunulabilir durumdadır. Geliştiriciler parçaları birleştirerek gerçek uygulamalar oluşturabilirler. Teknoloji yığını; gizli ifade için bir devre, ispat kontrolü için bir doğrulayıcı, herkese açık kurallar için bir uygulama sözleşmesi, Merkle verileri için bir indeksleyici ve ilişkilendirilemez gönderim ile Gaz sponsorluğu için bir paketleyici artı ödemeciden oluşur.

Zor kısımlar ürün tasarımı, anahtar yönetimi, meta veri hijyeni, denetimler ve anonimlik kümesini büyütmektir. Bunlardan herhangi birini yanlış yaptığınızda, ispatın sağladığı gizlilik ortadan kalkar.

## İleri okuma {#further-reading}

1. [Sıfır bilgi ispatları (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Semaphore Belgeleri](https://docs.semaphore.pse.dev/)
3. [MACI Belgeleri](https://maci.pse.dev/)
4. [Circom Belgeleri](https://docs.circom.io/)
5. [Noir Belgeleri](https://noir-lang.org/)
6. [Halo2 Kitabı](https://zcash.github.io/halo2/)
7. [gnark Belgeleri](https://docs.gnark.consensys.io/)
8. [RISC Zero Belgeleri](https://dev.risczero.com/api/)
9. [SP1 Belgeleri](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: EntryPoint Sözleşmesi Aracılığıyla Hesap Soyutlama](https://eips.ethereum.org/EIPS/eip-4337)