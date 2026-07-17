---
title: Katman 2'leri ekleme
description: ethereum.org'a bir katman 2 eklerken kullandığımız politika
lang: tr
---

Kullanıcıların katman 2 alanında güvenli ve kendinden emin bir şekilde gezinebilmeleri için mümkün olan en iyi kaynakları listelediğimizden emin olmak istiyoruz.

Herkes ethereum.org'a bir katman 2 eklenmesini önermekte özgürdür. Gözden kaçırdığımız bir katman 2 varsa, **[lütfen önerin](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

Şu anda L2'leri aşağıdaki sayfalarda listeliyoruz:

- [İyimser rolluplar](/developers/docs/scaling/optimistic-rollups/)
- [Sıfır bilgi toplamaları](/developers/docs/scaling/zk-rollups/)
- [Katman 2](/layer-2/)

Katman 2, Ethereum için nispeten yeni ve heyecan verici bir paradigmadır. ethereum.org'da değerlendirme için adil bir çerçeve oluşturmaya çalıştık ancak listeleme kriterleri zamanla değişecek ve gelişecektir.

## Karar çerçevesi {#decision-framework}

### Dahil edilme kriterleri: olmazsa olmazlar {#criteria-for-inclusion-the-must-haves}

**L2BEAT üzerinde listelenme**

- Değerlendirmeye alınabilmesi için bu projenin [L2BEAT](https://l2beat.com) üzerinde listelenmiş olması gerekir. L2BEAT, L2 projelerini değerlendirirken dayandığımız, katman 2 projelerinin sağlam bir risk değerlendirmesini sunar. **Proje L2BEAT'te yer almıyorsa, onu ethereum.org'da bir L2 olarak listelemeyeceğiz.**
- [L2 projenizi L2BEAT'e nasıl ekleyeceğinizi öğrenin](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**Açık kaynak**

- Kodunuz erişilebilir olmalı ve daha geniş topluluktan gelen PR'ları kabul etmelisiniz.

**Katman 2 kategorisi**

Şu anda aşağıdakileri katman 2 çözümleri olarak değerlendiriyoruz:

- İyimser rollup
- Sıfır bilgi toplaması

_Veri kullanılabilirliği veya güvenlik için Ethereum'u kullanmayan diğer ölçeklendirme çözümlerini katman 2 olarak değerlendirmiyoruz._

**Veri kullanılabilirliği için Ethereum**

- Veri kullanılabilirliği, diğer ölçeklendirme çözümleri ile katman 2 arasında önemli bir ayırt edici faktördür. Bir projenin listelenmek üzere değerlendirilebilmesi için veri kullanılabilirliği amacıyla Ethereum Ana Ağı'nı kullanması **gerekir**.

**Köprüler**

- Kullanıcılar katman 2'ye nasıl katılabiliyor?

**Projenin yayına girdiği tarih**

- Ana Ağ üzerinde 6 aydan uzun süredir "yayında" olan bir katman 2

- Kullanıcılar tarafından henüz savaş testinden geçmemiş daha yeni projelerin listelenme olasılığı daha düşüktür.

**Harici güvenlik denetimi**

- İster denetim, ister dahili bir güvenlik ekibi veya başka bir yöntemle olsun, ürününüzün güvenliği güvenilir bir şekilde test edilmelidir. Bu, kullanıcılarımıza yönelik riski azaltır ve güvenliği ciddiye aldığınızı bize gösterir.

**Sürdürülebilir kullanıcı tabanı**

- Kilitlenmiş toplam değer (TVL) geçmişi, işlem istatistikleri ve bilinen şirketler veya projeler tarafından kullanılıp kullanılmadığı gibi metrikleri dikkate alacağız.

**Aktif geliştirme ekibi**

- Proje üzerinde çalışan aktif bir ekibi olmayan bir katman 2'yi listelemeyeceğiz.

**Blok gezgini**

- Listelenen projeler, kullanıcıların Zincir üzerinde kolayca gezinmesini sağlamak için çalışan bir blok gezgini gerektirir.

### Diğer kriterler: olsa iyi olurlar {#nice-to-haves}

**Proje için borsa desteği**

- Kullanıcılar doğrudan bir borsadan para yatırabiliyor ve/veya çekebiliyor mu?

**Katman 2 ekosistemindeki merkeziyetsiz uygulamalara (dapp'lere) bağlantılar**

- Kullanıcıların bu katman 2 üzerinde neler yapmayı bekleyebilecekleri hakkında bilgi sağlayabilmek istiyoruz. (örn. https://portal.arbitrum.io/, https://www.optimism.io/apps)

**Token Sözleşmesi listeleri**

- Varlıkların katman 2 üzerinde yeni bir Adresi olacağından, mevcut bir Token listesi kaynağı varsa lütfen paylaşın.

**Yerel Cüzdan desteği**

- Herhangi bir Cüzdan L2'yi yerel olarak destekliyor mu?

## Katman 2'nizi ekleyin {#add-exchange}

ethereum.org'a bir katman 2 eklemek istiyorsanız, GitHub'da bir issue oluşturun.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  Bir issue oluşturun
</ButtonLink>