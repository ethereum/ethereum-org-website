---
title: Akıllı sözleşme güvenlik yönergeleri
description: Dapp'inizi oluştururken göz önünde bulundurmanız gereken güvenlik yönergelerinin bir kontrol listesi
author: "Trailofbits"
tags:
  - "solidity"
  - "akıllı sözleşmeler"
  - "güvenlik"
skill: beginner
lang: tr
published: 2020-09-06
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Daha güvenli akıllı sözleşmeler oluşturmak için bu üst düzey önerileri izleyin.

## Tasarım rehberi {#design-guidelines}

Herhangi bir kod satırı yazmadan önce sözleşmenin tasarımı önceden tartışılmalıdır.

### Belgeler ve özellikler {#documentation-and-specifications}

Belgeler farklı seviyelerde yazılabilir ve sözleşmeler uygulanırken güncellenmelidir:

- **Sözleşmelerin ne yaptığını ve kod tabanındaki varsayımları açıklayan, sistemin sade bir İngilizce açıklaması**.
- Sözleşme etkileşimleri ve sistemin durum makinesi dahil **şema ve yapısal diyagramlar**. [Slither yazıcıları](https://github.com/crytic/slither/wiki/Printer-documentation), bu şemaların oluşturulmasına yardımcı olabilir.
- **Kod belgeleri** ile [Natspec formatı](https://solidity.readthedocs.io/en/develop/natspec-format.html) Solidity için kullanılabilir.

### Zincir üstü ve zincir dışı hesaplama {#on-chain-vs-off-chain-computation}

- **Zincir dışı bırakabileceğiniz kadar kod saklayın.** Zincir üstü katmanı küçük tutun. Verileri zincir dışı kodla, zincir üstünde doğrulamanın basit olacağı şekilde ön işleme tabi tutun. Sıralı bir listeye mi ihtiyacınız var? Listeyi zincir dışı sıralayın, ardından yalnızca zincirdeki sırasını kontrol edin.

### Yükseltilebilirlik {#upgradeability}

[Blog gönderimizde](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) farklı yükseltilebilirlik çözümlerini tartıştık. Herhangi bir kod yazmadan önce yükseltilebilirliği desteklemek için bilinçli bir seçim yapın. Karar, kodumuzu nasıl yapılandırdığınızı etkileyecektir. Genel olarak, şunları öneririz:

- **Yükseltilebilirlik yerine [sözleşme geçişini](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) tercih etme.** Geçiş sistemi, dezavantajları olmaksızın yükseltilebilir sistemle aynı avantajların çoğuna sahiptir.
- **delegatecallproxy yerine veri ayrımı modelini kullanma.** Projenizin net bir soyutlama ayrımı vardır, veri ayrımı kullanılarak yükseltilebilirlik yalnızca birkaç ayarlama gerektirecektir. Delegecallproxy, EVM uzmanlığı gerektirir ve yüksek oranda hataya açıktır.
- **Dağıtımdan önce taşıma/yükseltme prosedürünü belgeleyin.** Herhangi bir yönerge olmadan stres altında tepki vermeniz gerekiyorsa, hata yaparsınız. İzlenecek prosedürü önceden yazın. Şunları içermeli:
  - Yeni sözleşmeleri başlatan çağrılar
  - Anahtarlar nerede saklanır ve bunlara nasıl erişilir
  - Dağıtımın nasıl kontrol edileceği! Bir dağıtım sonrası komut dosyası geliştirin ve test edin.

## Uygulama yönergeleri {#implementation-guidelines}

**Sadelik sağlamaya çalışın.** Daima amacınıza uyan en basit çözümü kullanın. Ekibinizin herhangi bir üyesi çözümünüzü anlayabilmelidir.

### Fonksiyon kompozisyonu {#function-composition}

Kod tabanınızın mimarisi, kodunuzun gözden geçirilmesini kolaylaştırmalıdır. Doğruluğu hakkında mantık kurma yeteneğini azaltan mimari seçimlerden kaçının.

- Ya birden çok sözleşme aracılığıyla ya da benzer fonksiyonları aynı grupta toplayarak (örneğin kimlik doğrulama, aritmetik vb.) **sisteminizin mantığını bölün**.
- **Açık bir amaç ile küçük işlevler yazın.** Bu, incelemeyi kolaylaştıracak ve ayrı bileşenlerin test edilmesini sağlayacaktır.

### Kalıtım {#inheritance}

- **Kalıtımı yönetilebilir seviyede tutun.** Mantığı bölmek için kalıtım kullanılmalıdır ancak projeniz kalıtım ağacının derinliğini ve genişliğini en aza indirmeyi hedeflemelidir.
- **Sözleşmelerin hiyerarşisini kontrol etmek için Slither'ın [kalıtım yazıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) kullanın.** Kalıtım yazıcısı, hiyerarşinin boyutunu gözden geçirmenize yardımcı olur.

### Olaylar {#events}

- **Tüm önemli işlemleri kaydedin.** Olaylar, geliştirme sırasında sözleşmede hata ayıklamaya ve dağıtımdan sonra sözleşmeyi izlemeye yardımcı olur.

### Bilinen hatalardan kaçının {#avoid-known-pitfalls}

- **En yaygın güvenlik sorunlarının farkında olun.** Yaygın sorunlar hakkında bilgi edinmek için [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) veya [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/) gibi birçok çevrimiçi kaynak bulunur.
- **[Solidity belgelerindeki](https://solidity.readthedocs.io/en/latest/) uyarı bölümlerine dikkat edin.** Uyarı bölümleri, dilin açık olmayan davranışı hakkında sizi bilgilendirecektir.

### Bağımlılıklar {#dependencies}

- **İyi test edilmiş kütüphaneleri kullanın.** İyi test edilmiş kütüphanelerden kod içe aktarmak, hatalı kod yazma olasılığınızı azaltır. Eğer bir ERC20 sözleşmesi yazmak istiyorsanız, [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) kullanın.
- **Bir bağımlılık yöneticisi kullanın; kodu kopyalayıp yapıştırmaktan kaçının.** Harici bir kaynak kullanıyorsanız, onu orijinal kaynakla güncel tutmalısınız.

### Test ve doğrulama {#testing-and-verification}

- **Kapsamlı birim testleri yazın.** Yüksek kaliteli yazılım oluşturmak için kapsamlı bir test paketi çok önemlidir.
- **[Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://github.com/trailofbits/manticore) özel kontrolleri ve özellikleri yazın.** Otomatikleştirilmiş araçlar sözleşmenizin güvenli olduğundan emin olmaya yardımcı olacaktır. Etkili kontrollerin ve özelliklerin nasıl yazılacağını öğrenmek için bu kılavuzun geri kalanını gözden geçirin.
- **[crytic.io](https://crytic.io/) kullanın.** Crytic, GitHub ile bütünleşir, özel Slither algılayıcılarına erişim sağlar ve Echidna'dan özel özellik kontrolleri çalıştırır.

### Solidity {#solidity}

- **0.4 ve 0.6 yerine Solidity 0.5'i tercih edin.** Bize göre Solidity 0.5, 0.4'ten daha güvenli ve daha iyi yerleşik uygulamalara sahip. Solidity 0.6'nın üretim için fazla dengesiz olduğu tespit edildi ve olgunlaşması için zamana ihtiyacı var.
- **Derlemek için dengeli bir sürüm kullanın; uyarıları kontrol etmek için en son sürümü kullanın.** Kodunuzun en son derleyici sürümüyle ilgili bildirilen herhangi bir sorun olup olmadığını kontrol edin. Bununla birlikte, Solidity'nin hızlı bir yayın döngüsü ve bir derleyici hataları geçmişi vardır, bu nedenle dağıtım için en son sürümü önermiyoruz (bkz. Slither'ın [solc sürümü önerisi](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Satır içi derleme kullanmayın.** Derleme, EVM uzmanlığı gerektirir. Sarı kağıtta _ustalaşmadıysanız_ EVM kodu yazmayın.

## Dağıtım yönergeleri {#deployment-guidelines}

Sözleşme geliştirilip dağıtıldıktan sonra:

- **Sözleşmelerinizi izleyin.** Kayıtları izleyin ve sözleşme veya cüzdan güvenliğinin ihlal edilmesi durumunda tepki vermeye hazır olun.
- **İletişim bilgilerinizi [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)'e ekleyin.** Bu liste, bir güvenlik açığı tespit edilirse üçüncü tarafların sizinle iletişim kurmasına yardımcı olur.
- **Ayrıcalıklı kullanıcıların cüzdanlarını güvence altına alın.** [en iyi yönetim uygulamalarımızı](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) takip edin.
- **Olay planına bir karşılık geliştirin.** Akıllı sözleşmelerinizin güvenliğinin ihlal edilebileceğini unutmayın. Sözleşmeleriniz hata içermese bile bir saldırgan, sözleşme sahibinin anahtarlarının kontrolünü ele geçirebilir.
