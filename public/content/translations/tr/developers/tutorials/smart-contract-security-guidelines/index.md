---
title: "Akıllı sözleşme güvenlik yönergeleri"
description: "Dapp'inizi oluştururken göz önünde bulundurmanız gereken güvenlik yönergelerinin bir kontrol listesi"
author: "Trailofbits"
tags: ["Solidity", "akıllı sözleşmeler", "güvenlik"]
skill: intermediate
breadcrumb: "Güvenlik yönergeleri"
lang: tr
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Daha güvenli akıllı sözleşmeler oluşturmak için bu üst düzey önerileri izleyin.

## Tasarım yönergeleri {#design-guidelines}

Sözleşmenin tasarımı, herhangi bir kod satırı yazılmadan önce önceden tartışılmalıdır.

### Belgelendirme ve spesifikasyonlar {#documentation-and-specifications}

Belgelendirme farklı seviyelerde yazılabilir ve sözleşmeler uygulanırken güncellenmelidir:

- **Sistemin sade bir dille açıklaması**, sözleşmelerin ne yaptığını ve kod tabanındaki varsayımları açıklamalıdır.
- **Şema ve mimari diyagramlar**, sözleşme etkileşimlerini ve sistemin durum (state) makinesini içermelidir. [Slither yazıcıları](https://github.com/crytic/slither/wiki/Printer-documentation) bu şemaları oluşturmaya yardımcı olabilir.
- **Kapsamlı kod belgelendirmesi**, Solidity için [NatSpec formatı](https://docs.soliditylang.org/en/develop/natspec-format.html) kullanılabilir.

### Zincir içi ve zincir dışı hesaplama {#onchain-vs-offchain-computation}

- **Mümkün olduğunca çok kodu zincir dışı tutun.** Zincir içi katmanı küçük tutun. Verileri zincir dışı kodla, zincir içi doğrulamanın basit olacağı şekilde önceden işleyin. Sıralı bir listeye mi ihtiyacınız var? Listeyi zincir dışı sıralayın, ardından zincir içinde yalnızca sırasını kontrol edin.

### Yükseltilebilirlik {#upgradeability}

Farklı yükseltilebilirlik çözümlerini [blog yazımızda](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) tartıştık. Herhangi bir kod yazmadan önce yükseltilebilirliği destekleyip desteklememe konusunda bilinçli bir seçim yapın. Bu karar, kodunuzu nasıl yapılandıracağınızı etkileyecektir. Genel olarak şunları öneriyoruz:

- **Yükseltilebilirlik yerine [sözleşme taşıma (migration)](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) işlemini tercih edin.** Taşıma sistemleri, yükseltilebilir sistemlerle aynı avantajların çoğuna sahiptir, ancak onların dezavantajlarını barındırmaz.
- **delegatecallproxy yerine veri ayırma (data separation) modelini kullanın.** Projenizin net bir soyutlama ayrımı varsa, veri ayırma kullanarak yükseltilebilirlik yalnızca birkaç ayarlama gerektirecektir. delegatecallproxy, EVM uzmanlığı gerektirir ve hataya oldukça açıktır.
- **Dağıtımdan önce taşıma/yükseltme prosedürünü belgeleyin.** Herhangi bir yönerge olmadan stres altında tepki vermek zorunda kalırsanız hata yaparsınız. İzlenecek prosedürü önceden yazın. Şunları içermelidir:
  - Yeni sözleşmeleri başlatan çağrılar
  - Anahtarların nerede saklandığı ve onlara nasıl erişileceği
  - Dağıtımın nasıl kontrol edileceği! Dağıtım sonrası bir betik geliştirin ve test edin.

## Uygulama yönergeleri {#implementation-guidelines}

**Basitlik için çabalayın.** Her zaman amacınıza uyan en basit çözümü kullanın. Ekibinizin herhangi bir üyesi çözümünüzü anlayabilmelidir.

### İşlev kompozisyonu {#function-composition}

Kod tabanınızın mimarisi, kodunuzun incelenmesini kolaylaştırmalıdır. Doğruluğu hakkında akıl yürütme yeteneğini azaltan mimari seçimlerden kaçının.

- **Sisteminizin mantığını bölün**, bunu ya birden fazla sözleşme aracılığıyla ya da benzer işlevleri bir araya gruplayarak (örneğin; kimlik doğrulama, aritmetik, ...) yapın.
- **Net bir amacı olan küçük işlevler yazın.** Bu, incelemeyi kolaylaştıracak ve bireysel bileşenlerin test edilmesine olanak tanıyacaktır.

### Kalıtım {#inheritance}

- **Kalıtımı yönetilebilir tutun.** Kalıtım mantığı bölmek için kullanılmalıdır, ancak projeniz kalıtım ağacının derinliğini ve genişliğini en aza indirmeyi hedeflemelidir.
- **Sözleşmelerin hiyerarşisini kontrol etmek için Slither'ın [kalıtım yazıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) kullanın.** Kalıtım yazıcısı, hiyerarşinin boyutunu incelemenize yardımcı olacaktır.

### Olaylar {#events}

- **Tüm önemli işlemleri günlüğe kaydedin.** Olaylar, geliştirme sırasında sözleşmede hata ayıklamaya ve dağıtımdan sonra onu izlemeye yardımcı olacaktır.

### Bilinen tuzaklardan kaçının {#avoid-known-pitfalls}

- **En yaygın güvenlik sorunlarının farkında olun.** Yaygın sorunlar hakkında bilgi edinmek için [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) veya [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/) gibi birçok çevrim içi kaynak bulunmaktadır.
- **[Solidity belgelendirmesindeki](https://docs.soliditylang.org/en/latest/) uyarı bölümlerinin farkında olun.** Uyarı bölümleri, dilin belirgin olmayan davranışları hakkında sizi bilgilendirecektir.

### Bağımlılıklar {#dependencies}

- **İyi test edilmiş kütüphaneler kullanın.** İyi test edilmiş kütüphanelerden kod içe aktarmak, hatalı kod yazma olasılığınızı azaltacaktır. Bir ERC-20 sözleşmesi yazmak istiyorsanız [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) kullanın.
- **Bir bağımlılık yöneticisi kullanın; kodu kopyalayıp yapıştırmaktan kaçının.** Harici bir kaynağa güveniyorsanız, onu orijinal kaynakla güncel tutmalısınız.

### Test ve doğrulama {#testing-and-verification}

- **Kapsamlı birim testleri yazın.** Yüksek kaliteli yazılım oluşturmak için geniş çaplı bir test paketi çok önemlidir.
- **[Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://github.com/trailofbits/manticore) özel kontrolleri ve özellikleri yazın.** Otomatik araçlar, sözleşmenizin güvenli olmasını sağlamaya yardımcı olacaktır. Verimli kontrollerin ve özelliklerin nasıl yazılacağını öğrenmek için bu kılavuzun geri kalanını inceleyin.
- **[crytic.io](https://crytic.io/) kullanın.** Crytic, GitHub ile entegre çalışır, özel Slither dedektörlerine erişim sağlar ve Echidna'dan özel özellik kontrolleri çalıştırır.

### Solidity {#solidity}

- **Solidity 0.5'i 0.4 ve 0.6'ya tercih edin.** Bize göre Solidity 0.5, 0.4'ten daha güvenlidir ve daha iyi yerleşik uygulamalara sahiptir. Solidity 0.6'nın üretim için çok kararsız olduğu kanıtlanmıştır ve olgunlaşması için zamana ihtiyacı vardır.
- **Derlemek için kararlı bir sürüm kullanın; uyarıları kontrol etmek için en son sürümü kullanın.** Kodunuzun en son derleyici sürümüyle bildirilen hiçbir sorunu olmadığını kontrol edin. Ancak Solidity'nin hızlı bir sürüm döngüsü ve derleyici hataları geçmişi vardır, bu nedenle dağıtım için en son sürümü önermiyoruz (Slither'ın [solc sürüm önerisine](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) bakın).
- **Satır içi (inline) assembly kullanmayın.** Assembly, EVM uzmanlığı gerektirir. Sarı Bülten'e (Yellow Paper) _tam anlamıyla hakim_ değilseniz EVM kodu yazmayın.

## Dağıtım yönergeleri {#deployment-guidelines}

Sözleşme geliştirilip dağıtıldıktan sonra:

- **Sözleşmelerinizi izleyin.** Günlükleri takip edin ve sözleşme veya cüzdanın ele geçirilmesi durumunda tepki vermeye hazır olun.
- **İletişim bilgilerinizi [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) listesine ekleyin.** Bu liste, bir güvenlik açığı keşfedildiğinde üçüncü tarafların sizinle iletişime geçmesine yardımcı olur.
- **Ayrıcalıklı kullanıcıların cüzdanlarını güvence altına alın.** Anahtarları donanım cüzdanlarında saklıyorsanız [en iyi uygulamalarımızı](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) izleyin.
- **Bir olay müdahale planınız olsun.** Akıllı sözleşmelerinizin ele geçirilebileceğini göz önünde bulundurun. Sözleşmeleriniz hatasız olsa bile, bir saldırgan sözleşme sahibinin anahtarlarının kontrolünü ele geçirebilir.