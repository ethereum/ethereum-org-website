---
title: Ethereum İyileştirme Önerileri (EIP'ler)
description: EIP'leri anlamak için ihtiyacınız olan temel bilgiler
lang: tr
---

# Ethereum İyileştirme Önerilerine (EIP'ler) Giriş {#introduction-to-ethereum-improvement-proposals}

## EIP'ler nedir? {#what-are-eips}

[Ethereum İyileştirme Önerileri (EIP'ler)](https://eips.ethereum.org/), Ethereum için potansiyel yeni özellikleri veya süreçleri belirleyen standartlardır. EIP'ler, önerilen değişiklikler için teknik özellikler içerir ve topluluk için "gerçeğin kaynağı" görevi görür. Ethereum için ağ yükseltmeleri ve uygulama standartları, EIP süreci aracılığıyla tartışılır ve geliştirilir.

Ethereum topluluğu içindeki herkes bir EIP oluşturma kabiliyetine sahiptir. EIP'leri yazma yönergeleri, [EIP 1](https://eips.ethereum.org/EIPS/eip-1) içerisinde yer almaktadır. Bir EIP öncelikle az bir motivasyonla birlikte kısa bir şekilde teknik özellikleri aktarmalıdır. EIP yazarı, topluluk içinde konsensüs oluşturmaktan ve alternatif görüşleri belgelemekten sorumludur. İyi biçimlendirilmiş bir EIP göndermek için gerekli yüksek teknik beceri göz önüne alındığında, tarihsel olarak çoğu EIP yazarı uygulama veya protokol geliştiricileri olmuştur.

## EIP'ler neden önemlidir? {#why-do-eips-matter}

EIP'ler, değişikliklerin nasıl gerçekleştiği konusunda merkezi bir rol oynar ve Ethereum'da belgelenir. İnsanların değişiklikleri önerme, tartışma ve benimseme yollarıdır. Mutabakatı etkileyen ve ağ yükseltmesi gerektiren düşük düzeyli protokol değişiklikleri için temel EIP'ler, örneğin [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) ve uygulama standartları için ERCler, örneğin [EIP-20](https://eips.ethereum.org/EIPS/eip-20) ve [EIP-721](https://eips.ethereum.org/EIPS/eip-721) gibi [farklı EIP türleri](https://eips.ethereum.org/EIPS/eip-1#eip-types) bulunmaktadır.

Her ağ yükseltmesi, ağdaki her [Ethereum istemcisi](/learn/#clients-and-nodes) tarafından uygulanması gereken bir dizi EIP'lerden oluşur. Bu, istemci geliştiricilerinin Ethereum ana ağındaki diğer istemcilerle mutabık olmak için gerekli EIP'leri uyguladıklarından emin olmaları gerektiği anlamına gelir.

Değişiklikler için teknik bir şartname sağlamanın yanı sıra EIP'ler, Ethereum'da yönetişimin gerçekleştiği birimdir: herkes bir teklif sunmakta özgürdür ve ardından topluluktaki çeşitli hisse sahipleri bunun standart olarak mı benimsenmesi, yoksa bir ağ yükseltmesine dahil edilmesi mi gerektiğine karar vermek için tartışacaktır. Çekirdek olmayan EIP'lerin tüm uygulamalar tarafından benimsenmesi gerekmiyorken (örneğin, ERC-20 olmayan bir token oluşturabilirsiniz) çekirdek EIP'lerin yaygın olarak benimsenmesi gerektiği için (çünkü tüm düğümlerin aynı ağın parçası olarak kalmaları için yükseltilmesi gerekir) çekirdek EIP'ler, çekirdek olmayan EIP'lere göre topluluk içinde daha yaygın bir mutabakat gerektirir.

## EIP'lerin Tarihçesi {#history-of-eips}

[Ethereum İyileştirme Önerileri (EIP'ler) Github deposu](https://github.com/ethereum/EIPs) Ekim 2015'te oluşturuldu. EIP işlemi, [Bitcoin İyileştirme Önerileri (BIP'ler)](https://github.com/bitcoin/bips) sürecini; bu süreç de [Python Geliştirme Önerileri (PEP'ler)](https://www.python.org/dev/peps/) sürecini temel alır.

EIP editörleri; teknik sağlamlık, yazım/dil bilgisi kontrolü, format ve de kod stili için EIP'leri gözden geçirmekle görevlidir. Martin Becze, Vitalik Buterin, Gavin Wood ve diğerleri, 2015'ten 2016'nın sonlarına kadar ilk EIP editörleriydi.

Mevcut EIP editörleri şunlardır:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Emeritus EIP editörleri şunlardır:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Eğer sen de EIP editörü olmak istiyorsan, lütfen [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)'a göz at.

EIP editörleri bir önerinin ne zaman EIP olmaya hazır olduğuna karar verir ve EIP yazarlarının önerilerini ileriye taşımalarına yardım eder. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) (Ethereum Kedi Çobanları), EIP editörleri ve topluluk arasında toplantılar düzenlemeye yardımcı olur (bkz. [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Tabloyla birlikte tam standardizasyon süreci [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'de açıklanmıştır

## Daha fazla bilgi edinin {#learn-more}

EIP'ler ile alakalı daha fazlasını okumayayla ilgiliyseniz [EIP'ler web sitesini](https://eips.ethereum.org/) ve [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'i ziyaret edin. İşte bazı yararlı bağlantılar:

- [Tüm Ethereum İyileştirme Önerilerinin Listesi](https://eips.ethereum.org/all)
- [Tüm EIP türlerinin açıklaması](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Tüm EIP durumlarının açıklaması](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Topluluk eğitim projeleri {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP Ethereum İyileştirme Önerileri (EIP'ler) ve gelecek yükseltmelerdeki anahtar özelliklerin ele alındığı, eğitici bir video serisidir.*
- [Meraklılar için EIP'ler](https://ethereum2077.substack.com/t/eip-research) — *Meraklılar için EIP'ler, okuyucuları eğitmek ve Ethereum protokolünde önerilen değişiklikler etrafında mutabakat oluşturmak için temel EIP'ler ve uygulama/altyapı katmanı EIP'leri (ERC'ler) de dahil olmak üzere çeşitli Ethereum İyileştirme Önerilerine (EIP'ler) kapsamlı, ELI5 tarzı genel bakışlar sunar.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf, Ethereum İyileştirme Önerilerine (EIP'ler) dair durumlarını, uygulanma detaylarını, ilgili çekme isteklerini ve topluluk geribildirimlerini içeren ekstra bilgiler sunar.*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun, Ethereum İyileştirme Önerilerine (EIP'ler) dair son haberleri, EIP toplantılarına dair güncellemeleri ve daha fazlasını okuyuculara sunar.*
- [EIP'lere İlişkin Ayrıntılı Bilgiler](https://eipsinsight.com/) — *EIP'lere İlişkin Ayrıntılı Bilgiler, Ethereum İyileştirme Önerilerinin (EIP'ler) süreçlerinin son durumlarını ve ilgili istatistikleri, farklı kaynaklardan toplayarak okuyuculara sunar.*

## Katılın {#participate}

Herkes bir EIP oluşturabilir. Bir öneri kaydetmeden önce kişi, EIP sürecini ve nasıl EIP yazılacağını anlatan [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'i okumalı, bir taslak kaydedilmeden önce önerilerin ilk kez tartışıldığı [Ethereum Sihirbazları](https://ethereum-magicians.org/)'nda geri bildirim istemelidir.

## Referanslar {#references}

<cite class="citation">

Sayfa içeriğinin bir kısmı Hudson Jameson'ın [Ethereum Protokol Geliştirme Yönetimi ve Ağ Yükseltme Koordinasyonu](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) gönderisinden sağlanmıştır

</cite>
