---
title: "Ethereum İyileştirme Önerileri (EIP'ler)"
description: "EIP'leri anlamak için ihtiyacınız olan temel bilgiler"
lang: tr
---

# Ethereum İyileştirme Önerilerine (EIP'ler) Giriş {#introduction-to-ethereum-improvement-proposals}

## EIP'ler nedir? {#what-are-eips}

[Ethereum İyileştirme Önerileri (EIP'ler)](https://eips.ethereum.org/), Ethereum için potansiyel yeni özellikleri veya süreçleri belirleyen standartlardır. EIP'ler, önerilen değişiklikler için teknik özellikler içerir ve topluluk için "gerçeğin kaynağı" görevi görür. Ethereum için ağ yükseltmeleri ve uygulama standartları, EIP süreci aracılığıyla tartışılır ve geliştirilir.

Ethereum topluluğu içindeki herkes bir EIP oluşturma kabiliyetine sahiptir. EIP yazma yönergeleri [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'de yer almaktadır. Bir EIP öncelikle az bir motivasyonla birlikte kısa bir şekilde teknik özellikleri aktarmalıdır. EIP yazarı, topluluk içinde konsensüs oluşturmaktan ve alternatif görüşleri belgelemekten sorumludur. İyi biçimlendirilmiş bir EIP göndermek için gerekli yüksek teknik beceri göz önüne alındığında, tarihsel olarak çoğu EIP yazarı uygulama veya protokol geliştiricileri olmuştur.

## EIP'ler neden önemlidir? {#why-do-eips-matter}

EIP'ler, değişikliklerin nasıl gerçekleştiği konusunda merkezi bir rol oynar ve Ethereum'da belgelenir. İnsanların değişiklikleri önerme, tartışma ve benimseme yoludur. [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) gibi mutabakatı etkileyen ve bir ağ yükseltmesi gerektiren düşük seviyeli protokol değişiklikleri için çekirdek EIP'ler ve [EIP-20](https://eips.ethereum.org/EIPS/eip-20) ile [EIP-721](https://eips.ethereum.org/EIPS/eip-721) gibi uygulama standartları için ERC'ler de dahil olmak üzere [farklı EIP türleri](https://eips.ethereum.org/EIPS/eip-1#eip-types) vardır.

Her ağ yükseltmesi, ağdaki her bir [Ethereum istemcisi](/learn/#clients-and-nodes) tarafından uygulanması gereken bir dizi EIP'den oluşur. Bu, istemci geliştiricilerinin Ethereum ana ağındaki diğer istemcilerle mutabık olmak için gerekli EIP'leri uyguladıklarından emin olmaları gerektiği anlamına gelir.

EIP'ler, değişiklikler için teknik bir şartname sağlamanın yanı sıra Ethereum'da yönetişimin gerçekleştiği birimdir: Herkes bir tane önermekte serbesttir ve ardından topluluktaki çeşitli paydaşlar, standart olarak benimsenmesi veya bir ağ yükseltmesine dahil edilmesi gerekip gerekmediğini belirlemek için tartışır. Çekirdek olmayan EIP'lerin tüm uygulamalar tarafından benimsenmesi gerekmiyorken (örneğin, ERC-20 olmayan bir token oluşturabilirsiniz) çekirdek EIP'lerin yaygın olarak benimsenmesi gerektiği için (çünkü tüm düğümlerin aynı ağın parçası olarak kalmaları için yükseltilmesi gerekir) çekirdek EIP'ler, çekirdek olmayan EIP'lere göre topluluk içinde daha yaygın bir mutabakat gerektirir.

## EIP'lerin Tarihçesi {#history-of-eips}

[Ethereum İyileştirme Önerileri (EIP'ler) GitHub deposu](https://github.com/ethereum/EIPs) Ekim 2015'te oluşturuldu. EIP süreci, [Bitcoin İyileştirme Önerileri (BIP'ler)](https://github.com/bitcoin/bips) sürecini; bu süreç de [Python Geliştirme Önerileri (PEP'ler)](https://www.python.org/dev/peps/) sürecini temel alır.

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

Bir EIP editörü olmak isterseniz, lütfen [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)'u inceleyin.

EIP editörleri bir önerinin ne zaman EIP olmaya hazır olduğuna karar verir ve EIP yazarlarının önerilerini ileriye taşımalarına yardım eder. [Ethereum Cat Herders](https://www.ethereumcatherders.com/), EIP editörleri ile topluluk arasındaki toplantıları organize etmeye yardımcı olur (bkz. [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Tabloyla birlikte tam standardizasyon süreci [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'de açıklanmıştır.

## Daha fazla bilgi edinin {#learn-more}

EIP'ler hakkında daha fazla bilgi edinmek isterseniz [EIP'ler web sitesine](https://eips.ethereum.org/) ve [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'e göz atın. İşte bazı yararlı bağlantılar:

- [Tüm Ethereum İyileştirme Önerilerinin Listesi](https://eips.ethereum.org/all)
- [Tüm EIP türlerinin açıklaması](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Tüm EIP durumlarının açıklaması](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Topluluk eğitim projeleri {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP, Ethereum İyileştirme Önerileri'ni (EIP'ler) ve yaklaşan yükseltmelerin temel özelliklerini ele alan eğitici bir video serisidir._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf, Ethereum İyileştirme Önerileri (EIP'ler) için durumları, uygulama ayrıntıları, ilgili çekme istekleri ve topluluk geri bildirimleri dahil olmak üzere ek bilgiler sağlar._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun, Ethereum İyileştirme Önerileri (EIP'ler) hakkındaki en son haberleri, EIP toplantılarındaki güncellemeleri ve daha fazlasını sunar._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight, farklı kaynaklardan toplanan bilgilere dayanarak Ethereum İyileştirme Önerileri (EIP'ler) sürecinin ve istatistiklerinin durumunu gösterir._

## Katılın {#participate}

Herkes bir EIP oluşturabilir. Bir öneri göndermeden önce, EIP sürecini ve EIP'nin nasıl yazılacağını özetleyen [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'i okumalı ve taslak gönderilmeden önce önerilerin toplulukla ilk kez tartışıldığı [Ethereum Magicians](https://ethereum-magicians.org/) forumundan geri bildirim almalısınız.

## Kaynaklar {#references}

<cite class="citation">

Sayfa içeriğinin bir kısmı Hudson Jameson'ın [Ethereum Protokol Geliştirme Yönetimi ve Ağ Yükseltme Koordinasyonu](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) gönderisinden sağlanmıştır

</cite>
