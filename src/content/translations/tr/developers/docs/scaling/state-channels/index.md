---
title: Durum Kanalları
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak durum kanallarına ve ödeme kanallarına giriş.
lang: tr
incomplete: true
sidebarDepth: 3
---

Durum kanalları, katılımcıların Ethereum ağına yalnızca iki zincir üstü işlem gönderirken zincir dışı `x` sayıda işlem yapmasına izin verir. Bu, son derece yüksek işlem hacmine izin verir.

## Ön koşullar {#prerequisites}

Temeli oluşturan tüm konuları iyi anlamalı ve [Ethereum ölçeklendirilmesi](/developers/docs/scaling/) konusunda ileri düzeyde bilgiye sahip olmalısınız. Kanallar gibi ölçeklendirme çözümlerini uygulamak, teknoloji henüz pek kullanılmadığı için ve araştırılmaya ve geliştirilmeye devam edildiğinden ileri seviye bilgi gerektirir.

## Kanallar {#channels}

Katılımcılar, Ethereum'un durumunun bir kısmını, bir ETH yatırma işlemi gibi, çok imzalı bir sözleşmeye kilitlemelidir. Çoklu imza sözleşmesi, yürütülmesi için birden çok özel anahtarın imzasını (ve dolayısıyla anlaşmasını) gerektiren bir sözleşme türüdür.

Durumu bu şekilde kilitlemek ilk işlemdir ve kanalı açar. Katılımcılar daha sonra zincir dışı hızlı ve özgürce işlem yapabilirler. Etkileşim bittiğinde, durumun kilidini açan son bir zincir üstü işlem gönderilir.

**Şunlar için kullanışlıdır**:

- birçok durum güncellemesi
- katılımcı sayısı önceden bilindiğinde
- katılımcılar her zaman müsait olduğunda

Şu anda iki tür kanal var: durum kanalları ve ödeme kanalları.

## Durum kanalları {#state-channels}

Durum kanalı en iyi şekilde "tic tac toe" oyunu gibi bir örnekle açıklanabilir:

1. Ethereum ana zincirinde "tic-tac-toe" kurallarını anlayan ve Alice ile Bob'u oyunumuzdaki iki oyuncu olarak tanımlayabilen çok imzalı bir akıllı sözleşme "Judge"ı oluşturun. Bu sözleşme, 1ETH ödülüne sahiptir.

2. Ardından Alice ve Bob, oyunu oynamaya başlayarak durum kanalını açarlar. Her hareket, bir "nonce" içeren zincir dışı bir işlem oluşturur; bu, hareketlerin hangi sırayla gerçekleştiğini daha sonra her zaman anlayabileceğimiz anlamına gelir.

3. Bir kazanan olduğunda, yalnızca tek bir işlem ücreti ödeyerek nihai durumu (örneğin bir işlem listesi) Judge sözleşmesine göndererek kanalı kapatırlar. Judge, bu "nihai durumun" her iki tarafça da imzalanmasını sağlar ve kimsenin sonuca meşru bir şekilde itiraz edememesini sağlamak için bir süre bekler ve ardından 1ETH ödülünü Alice'e öder.

## Ödeme kanalları {#payment-channels}

Yalnızca ödemelerle ilgilenen basitleştirilmiş durum kanalları (ör. ETH transferleri). Transferlerinin net toplamı yatırılan token'ları aşmadığı sürece, iki katılımcı arasında zincir dışı transferlere izin verirler.

## Artıları ve eksileri {#channels-pros-and-cons}

| Artıları                                                                                       | Eksileri                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet'te anında para çekme/kararlaştırma (bir kanaldaki her iki taraf da iş birliği yaparsa) | Bir kanalı kurmak ve kapatmak için gereken zaman ve maliyet: Rastgele kullanıcılar arasında ara sıra yapılan tek seferlik işlemler için pek uygun değil. |
| Son derece yüksek verim mümkündür                                                              | Fonlarınızın güvenliğini sağlamak için ağı periyodik olarak izlemeniz (canlılık gereksinimi) veya bu sorumluluğu başka birine devretme ihtiyacı.         |
| İşlem başına en düşük maliyet: Mikro ödeme akışı için iyi                                      | Açık ödeme kanallarında fonları kilitlemek zorunlu                                                                                                       |
|                                                                                                | Açık katılım desteklenmiyor                                                                                                                              |

## Durum kanallarını kullanın {#use-state-channels}

Birden çok proje, dapp'lerinize entegre edebileceğiniz durum kanallarının uygulamalarını sağlar:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Daha fazla okuma {#further-reading}

**Durum kanalları**

- [EthHub'un durum kanalları hakkındaki içerikleri](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Ethereum'un Katman 2 Ölçeklendirme Çözümlerini Anlama: Durum Kanalları, Plazma ve Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 Şubat 2018_
- [Durum Kanalları - bir açıklama](https://www.jeffcoleman.ca/state-channels/) _6 Kasım 2015 - Jeff Coleman_
- [Durum Kanallarının Temelleri](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Ödeme kanalları**

- [EthHub'un ödeme kanalları hakkındaki içerikleri](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_
