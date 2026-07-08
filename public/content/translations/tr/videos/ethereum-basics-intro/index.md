---
title: "Ethereum temelleri: giriş"
description: "Ethereum'un ne olduğu, Bitcoin'den nasıl farklılaştığı ve Ethereum ağının temelini oluşturan ana kavramları kapsayan, Ethereum temelleri üzerine giriş niteliğinde bir ders."
lang: tr
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Ethereum Temelleri"
---

**Quezar** tarafından verilen, blokzincirlerinin ne olduğu, arka planda nasıl çalıştıkları ve Ethereum ağını oluşturan temel bileşenler dahil olmak üzere Ethereum'un temellerini kapsayan giriş niteliğinde bir ders.

*Bu transkript, Quezar tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=j78ZcIIpi0Q) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Hoş geldiniz ve seriye genel bakış (0:03) {#welcome-and-series-overview-003}

Ethereum serisinin başka bir bölümüne tekrar hoş geldiniz. Ethereum'un arka planda nasıl çalıştığını anlamak için iyi bir kaynak arıyorsanız, doğru yerdesiniz. Önceki bölümümüzde temel Solidity sözleşmelerinin nasıl okunup yazılacağını ele aldık ve Ethereum ağının çeşitli bileşenleri hakkında kısaca birkaç şeyden bahsettik. Bu bölümde Ethereum'un mimarisini derinlemesine inceleyecek ve her bir bileşeni çok daha ayrıntılı olarak tartışacağız. Yakında çok daha fazla videomuz gelecek, bu yüzden bu tür içerikleri seviyorsanız beğen butonuna basın ve yeni video yayına girdiğinde haberdar olmak için abone olun.

#### Hedefler ve ön koşullar (0:40) {#goals-and-prerequisites-040}

Serinin bu bölümünün amacı, size bir hafta içinde Ethereum'un mimarisi hakkında iyi bir anlayış kazandırmaktır. Önceki bölümde olduğu gibi, bunu yedi gün içinde, birisi Ethereum ağında bir etkinlik gerçekleştirdiğinde olan biten her şeye çok daha hakim olacağınız şekilde yapılandırdım.

Ön koşullardan bahsetmek gerekirse — halihazırda bilmeniz gereken belirli bir şey yok. Bu videoyu izliyorsanız, büyük ihtimalle bu bölümün ilgilendiği kadarıyla Ethereum ağı hakkında yeterince bilgi sahibisinizdir. Ancak serinin önceki bölümü olan Solidity Temelleri'ni tamamlamanızı tavsiye ederim çünkü o bölüm doğası gereği çok daha uygulamalıdır. Remix IDE üzerinde kod çalıştırabilir ve Ethereum ağında işlerin gerçekte nasıl yürüdüğünü görebilirsiniz. Bu bölüm çoğunlukla teorik tarafta olacak ve önceki bölümü zaten bitirdiyseniz, bu bölümü anlamayı çok daha kolay bulacaksınız.

#### Neleri ele alacağız (1:41) {#what-well-cover-141}

Bu bölümde blokzincirlerinin ne olduğunu ele alacak ve arka planda nasıl çalıştıklarını göreceğiz. Ayrıca Ethereum ağını hangi bileşenlerin oluşturduğunu görecek ve ardından ilerleyerek her bir bileşeni çok daha ayrıntılı olarak tartışacağız.

Bu bölüm için resmi Ethereum belgelerini temel aldım. Bu bölümü bitirdiğinizde, bu belgelerin temel konularını büyük ölçüde kavramış olacaksınız. Belgeleri okurken çok daha rahat edeceksiniz. Açıkçası her şey videolarda yok, ancak her şeyi daha üst düzeyde ele almaya çalıştım. Bu bölümü, çok daha derinlemesine olan belgelere bir hazırlık olarak düşünebilirsiniz.

#### Araçlar ve yaklaşım (2:30) {#tools-and-approach-230}

Ayrıca her bir bileşenin gerçek zamanlı olarak nasıl çalıştığını görmek için Etherscan'i kullanacağız. Her şeyi tek seferde anlayamazsanız endişelenmeyin — istediğiniz zaman belirli konuları tekrar gözden geçirebilirsiniz. Konuları daha iyi sindirebilmeniz için her konudan sonra kısa molalar vermenizi tavsiye ederim. O halde blokzincirlerinin ne olduğunu anlayarak başlayalım.