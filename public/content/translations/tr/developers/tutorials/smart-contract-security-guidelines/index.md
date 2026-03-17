---
title: "Akıllı sözleşme güvenlik yönergeleri"
description: "Dapp'inizi oluştururken göz önünde bulundurmanız gereken güvenlik yönergelerinin bir kontrol listesi"
author: "Trailofbits"
tags: [ "solidity", "akıllı kontratlar", "güvenlik" ]
skill: intermediate
lang: tr
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Daha güvenli akıllı sözleşmeler oluşturmak için bu üst düzey önerileri izleyin.

## Tasarım yönergeleri {#design-guidelines}

Herhangi bir kod satırı yazmadan önce sözleşmenin tasarımı önceden tartışılmalıdır.

### Dokümantasyon ve spesifikasyonlar {#documentation-and-specifications}

Belgeler farklı seviyelerde yazılabilir ve sözleşmeler uygulanırken güncellenmelidir:

- **Sözleşmelerin ne yaptığını ve kod tabanındaki varsayımları açıklayan, sistemin sade bir İngilizce açıklaması.**
- **Sözleşme etkileşimleri ve sistemin durum makinesi de dâhil olmak üzere şema ve mimari diyagramlar.** [Slither yazıcıları](https://github.com/crytic/slither/wiki/Printer-documentation) bu şemaların oluşturulmasına yardımcı olabilir.
- **Kapsamlı kod dokümantasyonu**, Solidity için [Natspec formatı](https://docs.soliditylang.org/en/develop/natspec-format.html) kullanılabilir.

### Zincir üstü ve zincir dışı hesaplama {#onchain-vs-offchain-computation}

- **Olabildiğince çok kodu zincir dışında tutun.** Zincir üstü katmanı küçük tutun. Verileri zincir dışı kodla, zincir üstünde doğrulamanın basit olacağı şekilde ön işleme tabi tutun. Sıralı bir listeye mi ihtiyacınız var? Listeyi zincir dışı sıralayın, ardından yalnızca zincirdeki sırasını kontrol edin.

### Yükseltilebilirlik {#upgradeability}

[Blog yazımızda](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) farklı yükseltilebilirlik çözümlerini tartıştık. Herhangi bir kod yazmadan önce yükseltilebilirliği desteklemek için bilinçli bir seçim yapın. Karar, kodunuzu nasıl yapılandırdığınızı etkileyecektir. Genel olarak, şunları öneririz:

- **[Sözleşme geçişini](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) yükseltilebilirliğe tercih etmek.** Geçiş sistemleri, yükseltilebilir olanlarla aynı avantajların çoğuna, dezavantajları olmaksızın sahiptir.
- **`delegatecallproxy` yerine veri ayırma modelini kullanmak.** Projenizin net bir soyutlama ayrımı varsa, veri ayırma kullanılarak yükseltilebilirlik yalnızca birkaç ayarlama gerektirecektir. Delegecallproxy, EVM uzmanlığı gerektirir ve yüksek oranda hataya açıktır.
- **Dağıtımdan önce taşıma/yükseltme prosedürünü belgeleyin.** Herhangi bir yönerge olmadan stres altında tepki vermeniz gerekiyorsa hata yaparsınız. İzlenecek prosedürü önceden yazın. Şunları içermeli:
  - Yeni sözleşmeleri başlatan çağrılar
  - Anahtarlar nerede saklanır ve bunlara nasıl erişilir
  - Dağıtımın nasıl kontrol edileceği! Bir dağıtım sonrası komut dosyası geliştirin ve test edin.

## Uygulama yönergeleri {#implementation-guidelines}

**Sadelik için çabalayın.** Daima amacınıza uyan en basit çözümü kullanın. Ekibinizin herhangi bir üyesi çözümünüzü anlayabilmelidir.

### Fonksiyon bileşimi {#function-composition}

Kod tabanınızın mimarisi, kodunuzun gözden geçirilmesini kolaylaştırmalıdır. Doğruluğu hakkında mantık kurma yeteneğini azaltan mimari seçimlerden kaçının.

- **Sisteminizin mantığını,** ya birden çok sözleşme aracılığıyla ya da benzer fonksiyonları (örneğin; kimlik doğrulama, aritmetik...) bir araya getirerek **bölün**.
- **Açık bir amaca sahip küçük fonksiyonlar yazın.** Bu, daha kolay gözden geçirmeyi kolaylaştıracak ve bireysel bileşenlerin test edilmesine olanak tanıyacaktır.

### Kalıtım {#inheritance}

- **Kalıtımı yönetilebilir tutun.** Mantığı bölmek için kalıtım kullanılmalıdır, ancak projeniz kalıtım ağacının derinliğini ve genişliğini en aza indirmeyi hedeflemelidir.
- **Sözleşmelerin hiyerarşisini kontrol etmek için Slither'ın [kalıtım yazıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) kullanın.** Kalıtım yazıcısı, hiyerarşinin boyutunu gözden geçirmenize yardımcı olur.

### Olaylar {#events}

- **Tüm kritik işlemleri günlüğe kaydedin.** Olaylar, geliştirme sırasında sözleşmede hata ayıklamaya ve dağıtım sonrasında onu izlemeye yardımcı olacaktır.

### Bilinen tuzaklardan kaçının {#avoid-known-pitfalls}

- **En yaygın güvenlik sorunlarının farkında olun.** [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) veya [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/) gibi yaygın sorunlar hakkında bilgi edinmek için birçok çevrimiçi kaynak bulunmaktadır.
- **[Solidity dokümantasyonundaki](https://docs.soliditylang.org/en/latest/) uyarı bölümlerine dikkat edin.** Uyarı bölümleri sizi dilin bariz olmayan davranışları hakkında bilgilendirecektir.

### Bağımlılıklar {#dependencies}

- **İyi test edilmiş kütüphaneler kullanın.** İyi test edilmiş kütüphanelerden kod içe aktarmak, hatalı kod yazma olasılığınızı azaltır. Bir ERC20 sözleşmesi yazmak istiyorsanız, [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) kullanın.
- **Bir bağımlılık yöneticisi kullanın; kodu kopyalayıp yapıştırmaktan kaçının.** Harici bir kaynağa güveniyorsanız, onu orijinal kaynakla güncel tutmalısınız.

### Test ve doğrulama {#testing-and-verification}

- **Kapsamlı birim testleri yazın.** Yüksek kaliteli yazılım oluşturmak için kapsamlı bir test paketi çok önemlidir.
- **[Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://github.com/trailofbits/manticore) için özel denetimler ve özellikler yazın.** Otomatikleştirilmiş araçlar, sözleşmenizin güvenli olmasını sağlamaya yardımcı olacaktır. Etkili kontrollerin ve özelliklerin nasıl yazılacağını öğrenmek için bu kılavuzun geri kalanını gözden geçirin.
- **[crytic.io](https://crytic.io/) kullanın.** Crytic, GitHub ile entegre olur, özel Slither dedektörlerine erişim sağlar ve Echidna'dan özel özellik denetimleri çalıştırır.

### Solidity {#solidity}

- **0.4 ve 0.6 yerine Solidity 0.5'i tercih edin. Bize göre Solidity 0.5, 0.4'ten daha güvenli ve daha iyi yerleşik uygulamalara sahip.** Solidity 0.6'nın üretim için fazla dengesiz olduğu tespit edildi ve olgunlaşması için zamana ihtiyacı var.
- **Derlemek için kararlı bir sürüm kullanın; uyarıları kontrol etmek için en son sürümü kullanın.** Kodunuzun en son derleyici sürümüyle ilgili bildirilmiş bir sorunu olmadığını kontrol edin. Ancak Solidity'nin hızlı bir sürüm döngüsü ve derleyici hataları geçmişi vardır, bu nedenle dağıtım için en son sürümü önermiyoruz (bkz. Slither'ın [solc sürüm önerisi](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Satır içi assembly kullanmayın.** Assembly, EVM uzmanlığı gerektirir. Yellow Paper'da _uzmanlaşmadıysanız_ EVM kodu yazmayın.

## Dağıtım yönergeleri {#deployment-guidelines}

Sözleşme geliştirilip dağıtıldıktan sonra:

- **Sözleşmelerinizi izleyin.** Günlükleri izleyin ve bir sözleşme veya cüzdan güvenliğinin ihlal edilmesi durumunda tepki vermeye hazır olun.
- **İletişim bilgilerinizi [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) listesine ekleyin.** Bu liste, bir güvenlik açığı keşfedildiğinde üçüncü tarafların sizinle iletişime geçmesine yardımcı olur.
- **Ayrıcalıklı kullanıcıların cüzdanlarını güvenceye alın.** Anahtarları donanım cüzdanlarında saklıyorsanız, [en iyi uygulamalarımızı](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) takip edin.
- **Bir olaya müdahale planınız olsun.** Akıllı sözleşmelerinizin güvenliğinin ihlal edilebileceğini göz önünde bulundurun. Sözleşmeleriniz hata içermese bile bir saldırgan, sözleşme sahibinin anahtarlarının kontrolünü ele geçirebilir.
