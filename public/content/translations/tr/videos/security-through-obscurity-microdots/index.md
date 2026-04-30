---
title: "Gizlilik yoluyla güvenlik: sırları saklamak için mikro noktaları kullanmak"
description: "Çıplak gözle görülemeyen basılı görüntülerde kurtarma ifadelerini gizleyerek, fiziksel mikro nokta teknolojisini kullanan anahtar saklamaya yönelik alışılmadık bir yaklaşım sunuluyor."
lang: tr
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privacy-and-security"
  - "privacy"
  - "authentication"
format: presentation
author: Ethereum Foundation
breadcrumb: "Mikro Nokta Güvenliği"
---

Devcon SEA'de **jseam** tarafından yapılan ve tarihsel olarak casuslukta kullanılan fiziksel mikro nokta teknolojisini kullanarak, çıplak gözle neredeyse hiç görünmeyen basılı görüntülerdeki kurtarma ifadelerini gizleyen, anahtar saklamaya yönelik alışılmadık bir yaklaşımı inceleyen kısa bir konuşma.

*Bu transkript, Ethereum Vakfı tarafından yayımlanan [orijinal video transkriptinin](https://www.youtube.com/watch?v=k9Dfg19JPEw) erişilebilir bir kopyasıdır. Okunabilirliği artırmak için üzerinde ufak düzenlemeler yapılmıştır.*

#### Neden mikro noktalar? (0:00) {#why-microdots-000}

Merhaba arkadaşlar, Tayland'a hoş geldiniz. Konuşmamda mikro noktalardan bahsedeceğim; tam olarak ne olduklarından, neden onlara ihtiyaç duyabileceğinizden ve onları gerçekte nasıl yapabileceğinizden. Elimde bazı örnekler var, bu yüzden konuşmadan sonra onlara göz atabilirsiniz.

Operasyonel güvenlik (OpSec) ve kurtarma ifadelerini nasıl gizleyebileceğiniz hakkında pek çok soru var. Mevcut süreçlerin çoğu tamamen dijital. Peki ya fiziksel süreçler varsa? Ya bir şeyleri gizleyebilirseniz? Anahtar saklama büyük bir sorun olmaya devam ediyor. Gizli paylaşımımız, sosyal kurtarmamız var; ancak birçok kripto insanının biraz asosyal olduğunu biliyorum, bu yüzden sosyal kurtarma zor olabilir.

Şu grafiğe bakın: şu anda bir yalnızlık salgını yaşıyoruz. Bu yüzden anahtar saklama ve sosyal kurtarma çok büyük sorunlar olacak. Peki ya bilgiyi gizlemek için fiziksel yaklaşımlar varsa?

#### Mikro nokta steganografisinin tarihi (2:00) {#the-history-of-microdot-steganography-200}

Bu, mikro noktalar adı verilen bir steganografi tekniğidir. Bunu bugün göstermemin nedeni, tarihsel olarak casuslukta kullanılmış olmasıdır. Amaç temel olarak mesajları herkesin gözü önünde gizlemektir.

Bununla ilgili tüm belgeler çok sınırlı. Muhtemelen Claude'a soruyorsunuz ve o da "Üzgünüm, sizin için bilgi yok" diyor. Bu bilgiyi kendim tersine mühendislikle çözüyordum. Slaytlar her şeyi belgeliyor. Her ayrıntıyı ele alamayacağım ama ilginç kısımların üzerinden geçeceğim. Ayrıca süreçleri belgeleyen bir GitHub deposu da oluşturdum.

#### Güvenlik için analog fotoğrafçılık (3:30) {#analog-photography-for-security-330}

Bu kullanım durumu için analog fotoğrafçılığı canlandıracağız. Neden analog? Birinin analog bir kamerayı sizden fiziksel olarak çalmadığı sürece hackleme şansı temel olarak yoktur.

Analog fotoğrafçılıktaki temel sorunlardan biri ISO'dur. Dijital bir kamerada bu büyük bir sorun değildir; onu ayarlayabilirsiniz. Ancak filmde ISO, film grenlerinin bir fonksiyonudur. Görüntüyü küçültmek istediğinizde bu bir sorun haline gelir. Genel olarak ISO ne kadar küçükse, grenler de o kadar küçük olur.

İki aşama vardır. İlk olarak, bir fotoğraf çekersiniz, banyo edersiniz ve sabitlersiniz. İkinci aşamada ise görüntüyü büyütmek yerine tam tersini yaparız; onu mikroskobik ölçeğe küçültürüz.

#### İngiliz süreci (5:00) {#the-british-process-500}

İşte şöyle yapıyorsunuz. Kurtarma ifadenizi yazıyorsunuz. Normalde bir MetaMask eğitimi sizden kurtarma ifadesini yazmanızı ister; ama sonra onu nereye koyacaksınız? Bu bir yoldur: kurtarma ifadesinin bir fotoğrafını çekersiniz, filmi sararsınız, filmi banyo edersiniz. İlginç olan şey; bunların hepsi ağır metaller, gümüş metallerdir. Onları tuvaletinize dökmemelisiniz. Ben yanlışlıkla birazını tuvaletime döktüm, bu yüzden bazı çevre suçları işlemiş olabilirim. En kötü ihtimalle muhtemelen borularımı aşındıracaktır.

Fotoğrafı tekrar çekiyorsunuz ve ta-da; bu küçücük noktaya sahipsiniz. Buna İngiliz süreci denir.

#### Dikromat süreci (7:00) {#the-dichromated-process-700}

Bir sonraki, daha da uç olan süreç dikromat sürecidir. 1000x gibi mikroskobik büyütmeleri bu şekilde elde edebilirsiniz. Amaç bunun için kimyasal bir substrat bulmaktır ve işte burada benim "Yasak Portakal Suyu" dediğim şey devreye giriyor: amonyum dikromat. Çok zehirlidir. Birazını döktüm ve tozunu soluduğumda neredeyse ölüyordum. Muhtemelen bundan sonra kanser taramasına gitmem gerekecek.

Görüntüyü yansıtıyorsunuz ve bir kağıt parçasının üzerinde bu küçücük noktaları elde ediyorsunuz. Noktalar o kadar küçük ki kesinlikle bir mikroskoba ihtiyacınız var. İngiliz süreci kullanılarak yapılanı çıplak gözle görebilirsiniz, ancak dikromat süreci gerçekten çok küçük bir şey üretir; mikroskop olmadan bunun gerçek bir görüntü olup olmadığından bile emin değilim.

#### Soru-Cevap (8:00) {#qa-800}

Mikro noktalar ne kadar küçük? İngiliz süreci kullanılarak yapılanı çıplak gözle görebilirsiniz, ancak dikromat süreci gerçekten çok küçük bir şey üretir; kesinlikle bir mikroskoba ihtiyacınız var. Mikroskop olmadan bunun gerçek bir görüntü olup olmadığını söylemek bile zordur.

**Soru:** Ne kadar dayanıyor? Bir yarı ömrü var mı?

**jseam:** Radyoaktif değil. 20 yıl içinde öğreneceğiz.

**Soru:** Süreci tersine çevirdiniz mi; kurtarıp kurtaramayacağınızı görmek için kodlayıp ardından kodunu çözdünüz mü?

**jseam:** Bence yapabilirsiniz. Muhtemelen bir tür optik projeksiyon kurulumuna ihtiyacınız olacaktır.

Çok teşekkür ederim. Eğer örnekleri görmek isterseniz, buralarda bir yerde olacağım. Zaman ayırdığınız için teşekkürler arkadaşlar.