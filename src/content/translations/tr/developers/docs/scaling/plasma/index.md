---
title: Plazma zincirleri
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak plazma zincirlerine giriş.
lang: tr
incomplete: true
sidebarDepth: 3
---

Plazma zinciri, ana Ethereum zincirine bağlı olan ve anlaşmazlıkları tahkim etmek için dolandırıcılık kanıtlarını ([iyimser toplamalar](/developers/docs/scaling/optimistic-rollups/) gibi) kullanan ayrı bir blok zinciridir. Bu zincirler, esasen Ethereum Mainnet'in daha küçük kopyaları oldukları için bazen "alt" zincirler olarak adlandırılır. Merkle ağaçları, üst zincirlerdeki bant genişliği yükünü (Mainnet dâhil) boşaltmak için çalışabilen bu zincirlerin, sınırsız bir yığınının oluşturulmasını sağlar. Bunlar, güvenliklerini [dolandırıcılık kanıtları](/glossary/#fraud-proof) yoluyla sağlar ve her alt zincirin blok doğrulama için kendi mekanizması vardır.

## Ön koşullar {#prerequisites}

Temeli oluşturan tüm konuları iyi anlamalı ve [Ethereum ölçeklendirilmesi](/developers/docs/scaling/) konusunda ileri düzeyde bilgiye sahip olmalısınız. Plazma gibi ölçeklendirme çözümlerini uygulamak, teknoloji henüz pek kullanılmadığı için ve araştırılmaya ve geliştirilmeye devam edildiğinden ileri seviye bilgi gerektirir.

## Artıları ve eksileri {#pros-and-cons}

| Artıları                                                                                                                               | Eksileri                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Yüksek verim, işlem başına düşük maliyet.                                                                                              | Genel hesaplamayı desteklemez. Yüklem mantığı aracılığıyla yalnızca temel token aktarımları, takaslar ve diğer birkaç işlem türü desteklenir.                                                                      |
| Rastgele kullanıcılar arasındaki işlemler için iyi (her ikisi de plazma zincirinde kuruluysa, kullanıcı çifti başına ek yük bulunmaz). | Fonlarınızın güvenliğini sağlamak için ağı periyodik olarak izlemeniz (canlılık gereksinimi) veya bu sorumluluğu başka birine devretme ihtiyacı.                                                                   |
|                                                                                                                                        | Verileri depolamak ve talep üzerine sunmak için bir veya daha fazla operatöre ihtiyaç duyar.                                                                                                                       |
|                                                                                                                                        | Zorluklara izin vermek için para çekme işlemleri birkaç gün ertelenir. Değiştirilebilir varlıklar için bu, likidite sağlayıcıları tarafından hafifletilebilir, ancak bununla ilişkili bir sermaye maliyeti vardır. |

### Plazma kullanın {#use-plasma}

Birden çok proje, dapp'lerinize entegre edebileceğiniz Plazma uygulamaları sağlar:

- [OMG Network](https://omg.network/)
- [Polygon](https://polygon.technology/) (eskiden Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Daha fazla bilgi {#further-reading}

- [EthHub'un Plazma hakkındaki içerikleri](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Plazmayı öğrenin](https://www.learnplasma.org/en/)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
