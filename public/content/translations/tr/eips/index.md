---
title: Ethereum Geliştirme Tekliflerine (EIP'ler) Giriş
metaTitle: Ethereum Geliştirme Teklifleri (EIP'ler)
description: EIP'leri anlamak için ihtiyacınız olan temel bilgiler
lang: tr
---

## EIP'ler nedir? {#what-are-eips}

[Ethereum Geliştirme Teklifleri (EIP'ler)](https://eips.ethereum.org/), Ethereum için potansiyel yeni özellikleri veya süreçleri belirleyen standartlardır. EIP'ler, önerilen değişiklikler için teknik spesifikasyonlar içerir ve topluluk için "doğruluk kaynağı" görevi görür. [Ethereum](/) için ağ yükseltmeleri ve uygulama standartları, EIP süreci aracılığıyla tartışılır ve geliştirilir.

Ethereum topluluğundaki herkes bir EIP oluşturma yeteneğine sahiptir. EIP yazma yönergeleri [EIP-1](https://eips.ethereum.org/EIPS/eip-1) içinde yer almaktadır. Bir EIP, temel olarak kısa bir teknik spesifikasyon ve az miktarda motivasyon sağlamalıdır. EIP yazarı, topluluk içinde mutabakat sağlamaktan ve alternatif görüşleri belgelendirmekten sorumludur. İyi biçimlendirilmiş bir EIP sunmanın önündeki yüksek teknik engel göz önüne alındığında, tarihsel olarak çoğu EIP yazarı genellikle uygulama veya protokol geliştiricileridir.

## EIP'ler neden önemlidir? {#why-do-eips-matter}

EIP'ler, Ethereum'da değişikliklerin nasıl gerçekleştiği ve belgelendiği konusunda merkezi bir rol oynar. İnsanların değişiklikleri önerme, tartışma ve benimseme yoludur. Mutabakatı etkileyen ve [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) gibi bir ağ yükseltmesi gerektiren düşük seviyeli protokol değişiklikleri için çekirdek EIP'ler ve [EIP-20](https://eips.ethereum.org/EIPS/eip-20) ile [EIP-721](https://eips.ethereum.org/EIPS/eip-721) gibi uygulama standartları için ERC'ler dahil olmak üzere [farklı EIP türleri](https://eips.ethereum.org/EIPS/eip-1#eip-types) vardır.

Her ağ yükseltmesi, ağdaki her [Ethereum istemcisi](/learn/#clients-and-nodes) tarafından uygulanması gereken bir dizi EIP'den oluşur. Bu, Ethereum Ana Ağı üzerindeki diğer istemcilerle mutabakat içinde kalmak için istemci geliştiricilerinin gerekli tüm EIP'leri uyguladıklarından emin olmaları gerektiği anlamına gelir.

Değişiklikler için teknik bir spesifikasyon sağlamanın yanı sıra EIP'ler, Ethereum'da yönetişimin etrafında şekillendiği birimdir: herkes bir tane önermekte özgürdür ve ardından topluluktaki çeşitli paydaşlar, bunun bir standart olarak benimsenip benimsenmeyeceğini veya bir ağ yükseltmesine dahil edilip edilmeyeceğini belirlemek için tartışırlar. Çekirdek olmayan EIP'lerin tüm uygulamalar tarafından benimsenmesi gerekmediğinden (örneğin, EIP-20 uygulamayan bir misli token oluşturmak mümkündür), ancak çekirdek EIP'lerin yaygın olarak benimsenmesi gerektiğinden (çünkü tüm düğümler aynı ağın parçası olarak kalmak için yükseltme yapmalıdır), çekirdek EIP'ler topluluk içinde çekirdek olmayan EIP'lere göre daha geniş bir mutabakat gerektirir.

## EIP'lerin Tarihçesi {#history-of-eips}

[Ethereum Geliştirme Teklifleri (EIP'ler) GitHub deposu](https://github.com/ethereum/EIPs) Ekim 2015'te oluşturuldu. EIP süreci, kendisi de [Python Geliştirme Teklifleri (PEP'ler)](https://www.python.org/dev/peps/) sürecine dayanan [Bitcoin Geliştirme Teklifleri (BIP'ler)](https://github.com/bitcoin/bips) sürecine dayanmaktadır.

EIP editörleri, EIP'leri teknik sağlamlık, biçimlendirme sorunları açısından inceleme ve yazım, dilbilgisi ve kod stilini düzeltme süreciyle görevlendirilmiştir. Martin Becze, Vitalik Buterin, Gavin Wood ve diğer birkaç kişi, 2015'ten 2016'nın sonlarına kadar ilk EIP editörleriydi.

Mevcut EIP editörleri şunlardır:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Onursal (Emeritus) EIP editörleri şunlardır:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Eğer bir EIP editörü olmak isterseniz, lütfen [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)'u inceleyin.

EIP editörleri, bir teklifin ne zaman bir EIP olmaya hazır olduğuna karar verir ve EIP yazarlarının tekliflerini ilerletmelerine yardımcı olur. [Ethereum Cat Herders](https://www.ethereumcatherders.com/), EIP editörleri ile topluluk arasındaki toplantıları organize etmeye yardımcı olur (bkz. [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Şemayla birlikte tam standardizasyon süreci [EIP-1](https://eips.ethereum.org/EIPS/eip-1) içinde açıklanmıştır.

## Daha fazla bilgi edinin {#learn-more}

EIP'ler hakkında daha fazla bilgi edinmek isterseniz, [EIP'ler web sitesine](https://eips.ethereum.org/) ve [EIP-1](https://eips.ethereum.org/EIPS/eip-1)'e göz atın. İşte bazı faydalı bağlantılar:

- [Tüm Ethereum Geliştirme Tekliflerinin bir listesi](https://eips.ethereum.org/all)
- [Tüm EIP türlerinin bir açıklaması](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Tüm EIP durumlarının bir açıklaması](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Topluluk eğitim projeleri {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP, Ethereum Geliştirme Tekliflerini (EIP'ler) ve yaklaşan yükseltmelerin temel özelliklerini tartışan eğitici bir video serisidir.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf, Ethereum Geliştirme Teklifleri (EIP'ler) için durumları, uygulama ayrıntıları, ilgili çekme istekleri (pull requests) ve topluluk geri bildirimleri dahil olmak üzere ekstra bilgiler sağlar.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun, Ethereum Geliştirme Teklifleri (EIP'ler) hakkındaki en son haberleri, EIP toplantılarıyla ilgili güncellemeleri ve daha fazlasını sunar.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight, farklı kaynaklardan toplanan bilgilere göre Ethereum Geliştirme Teklifleri (EIP'ler) sürecinin durumunun ve istatistiklerinin bir temsilidir.*

## Katılın {#participate}

Herkes bir EIP oluşturabilir. Bir teklif sunmadan önce, EIP sürecini ve bir EIP'nin nasıl yazılacağını özetleyen [EIP-1](https://eips.ethereum.org/EIPS/eip-1) okunmalı ve bir taslak sunulmadan önce tekliflerin toplulukla ilk kez tartışıldığı [Ethereum Magicians](https://ethereum-magicians.org/) üzerinde geri bildirim istenmelidir.

## Referanslar {#references}

<cite class="citation">

Sayfa içeriği kısmen Hudson Jameson'ın [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) adlı eserinden sağlanmıştır

</cite>