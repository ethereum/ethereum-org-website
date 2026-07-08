---
title: Nasıl çeviri yapılır
lang: tr
description: ethereum.org'u çevirmek için Crowdin kullanım talimatları
---

## Görsel rehber {#visual-guide}

Daha görsel öğrenenler için, Luka'nın Crowdin kurulumunu adım adım anlattığı videoyu izleyin. Alternatif olarak, aynı adımları bir sonraki bölümde yazılı formatta bulabilirsiniz.

<VideoWatch slug="crowdin-translation-guide" />

## Yazılı rehber {#written-guide}

### Crowdin'deki projemize katılın {#join-project}

Crowdin hesabınıza giriş yapmanız veya henüz bir hesabınız yoksa kaydolmanız gerekecektir. Kaydolmak için tek gereken bir e-posta hesabı ve şifredir.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Projeye katıl
</ButtonLink>

### Dilinizi açın {#open-language}

Crowdin'e giriş yaptıktan sonra, bir proje açıklaması ve mevcut tüm dillerin bir listesini göreceksiniz.
Her dil ayrıca çevrilebilir kelimelerin toplam miktarı hakkında bilgi ve belirli bir dilde ne kadar içeriğin çevrildiği ve onaylandığına dair bir genel bakış içerir.

Çeviri için mevcut dosyaların listesini görmek üzere çeviri yapmak istediğiniz dili açın.

![List of languages in Crowdin](./list-of-languages.png)

### Üzerinde çalışılacak bir belge bulun {#find-document}

Web sitesi içeriği bir dizi belgeye ve içerik grubuna ayrılmıştır. Her belgenin ilerlemesini sağ taraftan kontrol edebilirsiniz – eğer çeviri ilerlemesi %100'ün altındaysa, lütfen katkıda bulunun!

Dilinizin listelendiğini göremiyor musunuz? [Bir sorun (issue) açın](https://github.com/ethereum/ethereum-org-website/issues/new/choose) veya [Discord](https://discord.gg/ethereum-org) sunucumuzda sorun

![Translated and untranslated files in Crowdin](./crowdin-files.png)

İçerik grupları hakkında bir not: En yüksek öncelikli içeriğin ilk olarak yayınlanmasını sağlamak için Crowdin içinde 'içerik grupları' (content buckets) kullanıyoruz. Bir dili, örneğin [Filipince](https://crowdin.com/project/ethereum-org/fil#)'yi incelediğinizde, içerik grupları için klasörler göreceksiniz ("1. Homepage", "2. Essentials", "3. Exploring", vb.).

En yüksek etkiye sahip sayfaların ilk olarak çevrildiğinden emin olmak için bu sayısal sırayla (1 → 2 → 3 → ⋯) çeviri yapmanızı teşvik ediyoruz.

### Çeviri yapın {#translate}

Çevirmek istediğiniz dosyayı seçtikten sonra, çevrimiçi düzenleyicide açılacaktır. Crowdin'i daha önce hiç kullanmadıysanız, temelleri gözden geçirmek için bu hızlı rehberi kullanabilirsiniz.

![Crowdin online editor](./online-editor.png)

**_1 – Sol kenar çubuğu_**

- Çevrilmemiş (kırmızı) – henüz üzerinde çalışılmamış metin. Bunlar çevirmeniz gereken dizelerdir.
- Çevrilmiş (yeşil) – halihazırda çevrilmiş, ancak henüz incelenmemiş metin. Alternatif çeviriler önerebilir veya düzenleyicideki ‘’+’’ ve ‘’-‘‘ düğmelerini kullanarak mevcut olanlara oy verebilirsiniz.
- Onaylanmış (onay işareti) – halihazırda incelenmiş ve şu anda web sitesinde yayında olan metin.

Belirli dizeleri aramak, durumlarına göre filtrelemek veya görünümü değiştirmek için üstteki düğmeleri de kullanabilirsiniz.

**_2 – Düzenleyici alanı_**

Ana çeviri alanı – kaynak metin üstte görüntülenir, varsa ek bağlam ve ekran görüntüleri ile birlikte.
Yeni bir çeviri önermek için, çevirinizi ‘’Enter translation here’’ (Çeviriyi buraya girin) alanına girin ve Kaydet'e tıklayın.

Bu bölümde ayrıca dizenin mevcut çevirilerini ve diğer dillere çevirilerini, çeviri belleği eşleşmelerini ve makine çevirisi önerilerini de bulabilirsiniz.

**_3 – Sağ kenar çubuğu_**

Burası yorumları, çeviri belleği girdilerini ve sözlük girdilerini bulabileceğiniz yerdir. Varsayılan görünüm yorumları gösterir ve çevirmenlerin iletişim kurmasına, sorunları dile getirmesine veya yanlış çevirileri bildirmesine olanak tanır.

Üstteki düğmeleri kullanarak, mevcut çevirileri arayabileceğiniz Çeviri Belleğine (Translation Memory) veya anahtar terimlerin açıklamalarını ve standart çevirilerini içeren Sözlüğe (Glossary) de geçiş yapabilirsiniz.

Daha fazlasını öğrenmek ister misiniz? [Crowdin çevrimiçi düzenleyicisinin kullanımı hakkındaki belgelere](https://support.crowdin.com/online-editor/) göz atmaktan çekinmeyin.

### İnceleme süreci {#review-process}

Çeviriyi tamamladığınızda (yani, bir içerik grubu için tüm dosyalar %100 gösterdiğinde), profesyonel çeviri hizmetimiz içeriği inceleyecek (ve potansiyel olarak düzenleyecektir). İnceleme tamamlandığında (yani, inceleme ilerlemesi %100 olduğunda), bunu web sitesine ekleyeceğiz.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Lütfen projeyi çevirmek için makine çevirisi kullanmayın. Tüm çeviriler web sitesine eklenmeden önce incelenecektir. Önerdiğiniz çevirilerin makine çevirisi olduğu tespit edilirse reddedilecek ve sıklıkla makine çevirisi kullanan katkıda bulunanlar projeden çıkarılacaktır.
</AlertContent>
</Alert>

### İletişime geçin {#get-in-touch}

Herhangi bir sorunuz mu var? Veya ekibimizle ve diğer çevirmenlerle işbirliği yapmak mı istiyorsunuz? Lütfen [ethereum.org Discord sunucumuzun](https://discord.gg/ethereum-org) #translations kanalında paylaşım yapın.

Bize translations@ethereum.org adresinden de ulaşabilirsiniz.

ethereum.org Çeviri Programına katılımınız için teşekkür ederiz!