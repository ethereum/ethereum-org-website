---
title: Çevirme yöntemi
lang: tr
description: Ethererum.org çevirisinde Crowdin kullanım talimatları
---

# Çevirme yöntemi {#how-to-translate}

## Görsel rehber {#visual-guide}

Görsel olarak daha kolay öğrenenler için Luka'nın Crowdin'in kurulumunu anlatışını izleyin. Alternatif olarak, bir sonraki bölümde aynı adımları yazılı olarak da bulabilirsiniz.

<YouTube id="Ii7bYhanLs4" />

## Yazılı rehber {#written-guide}

### Crowdin'deki projemize katılın {#join-project}

Crowdin hesabınızda oturum açmanız veya henüz hesabınız yoksa Crowdin hesabı oluşturmanız gerekecektir. Kaydolmak için gerekli olan tek şey bir e-posta hesabı ve şifredir.

<ButtonLink to="https://crowdin.com/project/ethereum-org/">
  Projeye katılın
</ButtonLink>

### Dilinizi açın {#open-language}

Crowdin'e giriş yaptıktan sonra bir proje açıklaması ile kullanılabilir tüm dillerin bir listesini göreceksiniz. Her dil ayrıca toplam çevrilebilir kelime sayısı hakkında bilgi ve ilgili dilde ne kadar içeriğin çevrildiğine ve onaylandığına dair bir genel görünüm içerir.

Çevrilmeye hazır dosyaların listesini görmek için çevirmek istediğiniz dili açın.

![Crowdin'deki diller listesi](./list-of-languages.png)

### Üzerinde çalışmak istediğiniz bir belge bulun {#find-document}

Web site içeriği, çok sayıda belge ve içerik gruplarına bölünmüştür. Her belgenin ilerleme durumunu sağ taraftan kontrol edebilirsiniz; çevirinin ilerleme durumu %100'ün altındaysa lütfen katkıda bulunun!

Dilinizi listede göremiyor musunuz? [Bir konu açın](https://github.com/ethereum/ethereum-org-website/issues/new/choose) veya [Discord'da](/discord/) sorun

![Crowdin'de çevrilmiş ve çevrilmemiş dosyalar](./crowdin-files.png)

İçerik grupları hakkında bir not: En yüksek öncelikli içeriğin önce yayımlanmasını sağlamak için Crowdin içinde "içerik grupları" kullanıyoruz. Bir dili kontrol ettiğinizde, örneğin [Filipince](https://crowdin.com/project/ethereum-org/fil#), içerik grubu klasörlerini görürsünüz ("1. Anasayfa", "2. Esaslar", "3. Keşfetme", vs).

En yüksek etkiye sahip sayfaların önce çevrilmesini sağlamak için şu sayısal sıralamayla (1 → 2 → 3 → ⋯) çeviri yapmanızı öneririz.

[Ethereum.org içerik grupları hakkında daha fazla bilgi edinin](/contributing/translation-program/content-buckets/)

### Çevirin {#translate}

Çevirmek istediğiniz dosyayı seçtiğinizde, bu dosya çevrimiçi düzenleyicide açılacaktır. Crowdin'i daha önce hiç kullanmadıysanız, temel bilgileri gözden geçirmek için bu hızlı rehberi kullanabilirsiniz.

![Crowdin çevrimiçi düzenleyicisi](./online-editor.png)

**_1 – Sol panel_**

- Çevrilmemiş (kırmızı) – henüz üzerinde çalışılmamış metin. Bunlar, çevirmeniz gereken dizelerdir.
- Çevrilmiş (yeşil) – daha önce çevrilmiş ancak henüz gözden geçirilmemiş metin. Alternatif çeviriler önerebilir veya düzenleyicideki ''+'' ve ''-'' düğmelerini kullanarak mevcut çevirilere oy verebilirsiniz.
- Onaylanmış (onay işareti) – daha önce gözden geçirilmiş ve şu anda web sitesinde yayında olan metin.

Belirli dizeleri aramak, durumlarına göre filtrelemek veya görünümü değiştirmek için üstteki düğmeleri de kullanabilirsiniz.

**_2 – Düzenleyici alanı_**

Ana çeviri alanı – kaynak metin, varsa ek bağlam ve ekran görüntüleri ile birlikte en üstte görüntülenir. Yeni bir çeviri önermek için çevirinizi "Çeviriyi buraya yazın" alanına girin ve Kaydet'e tıklayın.

Ayrıca bu bölümde dizenin mevcut çevirilerini ve diğer dillere çevrilmiş halini, ayrıca çeviri belleği eşleşmelerini ve makine çevirisi önerilerini bulabilirsiniz.

**_3 – Sağ panel_**

Burada yorumları, çeviri belleği girdilerini ve sözlük girdilerini bulabilirsiniz. Varsayılan görünüm, yorumları gösterir ve çevirmenlerin iletişim kurmasına, sorunları dile getirmesine veya yanlış çevirileri bildirmesine olanak tanır.

Üstteki düğmeleri kullanarak mevcut çevirileri arayabileceğiniz Çeviri Belleğine veya anahtar terimlerin açıklamalarını ve standart çevirilerini içeren Sözlüğe de geçiş yapabilirsiniz.

Daha fazlasını mı öğrenmek istiyorsunuz? [Crowdin çevrimiçi düzenleyiciyi kullanımıyla ilgili dokümanlara](https://support.crowdin.com/online-editor/) göz atmaktan çekinmeyin

### Gözden geçirme süreci {#review-process}

Çeviriyi tamamladığınızda (yani, içerik grubundaki tüm dosyalar 100% olarak göründüğünde) profesyonel çeviri hizmeti aldığımız kurum içeriği gözden geçirecektir (ve potansiyel olarak düzeltecektir). Gözden geçirme tamamlandıktan sonra (yani gözden geçirmenin ilerleme durumu %100 olduğunda) çevirileri web sitesine ekleriz.

<InfoBanner shouldCenter emoji=":warning:">
  Lütfen projeyi makine çevirisi kullanarak çevirmeyin. Tüm çeviriler web sitesine eklenmeden önce gözden geçirilecektir. Önerdiğiniz çevirilerin makine çevirisi olduğu tespit edilirse, çeviriler reddedilir ve makine çevirisini kullanarak katkıda bulunanlar sıklıkla projeden çıkarılır.
</InfoBanner>

### İletişime geçin {#get-in-touch}

Sormak istediğiniz bir şey mi var? Ekibimizle ve diğer çevirmenlerle iş birliği yapmak mı istiyorsunuz? Lütfen [ethereum.org Discord sunucumuzun](/discord/) #translations kanalına yazın

Ayrıca bize translations@ethereum.org adresinden de ulaşabilirsiniz

Ethereum.org Çeviri Programına katıldığınız için teşekkür ederiz!
